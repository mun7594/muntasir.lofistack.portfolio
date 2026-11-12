"use client";

import { useEffect, useMemo, useState } from "react";

interface CrumpledPaperProps {
  src: string; // image URL
  alt: string; // image description
  width?: number; // px
  height?: number; // px
  grid?: number; // tiles per side (grid x grid)
}

// Deterministic pseudo-random — identical on server and client,
// so SSR markup matches and there are no hydration errors
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

interface Tile {
  col: number;
  row: number;
  tx: number;
  ty: number;
  rot: number;
  rotX: number;
  rotY: number;
  scale: number;
  bright: number;
  delay: number;
}

const buildTiles = (grid: number, width: number, height: number): Tile[] => {
  const tiles: Tile[] = [];
  const tw = width / grid;
  const th = height / grid;
  const cx = width / 2;
  const cy = height / 2;
  const maxD = Math.hypot(cx, cy);
  const ballRadius = Math.min(width, height) * 0.18;
  let i = 0;

  for (let row = 0; row < grid; row++) {
    for (let col = 0; col < grid; col++) {
      const tileCx = col * tw + tw / 2;
      const tileCy = row * th + th / 2;
      // Each tile gets a spot inside the "paper ball" cluster at the center
      const angle = pseudoRandom(i * 7 + 1) * Math.PI * 2;
      const rad = Math.sqrt(pseudoRandom(i * 7 + 2)) * ballRadius;
      const d = Math.hypot(tileCx - cx, tileCy - cy);

      tiles.push({
        col,
        row,
        tx: cx - tileCx + Math.cos(angle) * rad,
        ty: cy - tileCy + Math.sin(angle) * rad,
        rot: (pseudoRandom(i * 7 + 3) - 0.5) * 160,
        rotX: (pseudoRandom(i * 7 + 4) - 0.5) * 140,
        rotY: (pseudoRandom(i * 7 + 5) - 0.5) * 140,
        scale: 0.25 + pseudoRandom(i * 7 + 6) * 0.2,
        // Random brightness fakes the creases and shadows of crumpled paper
        bright: 0.55 + pseudoRandom(i * 7 + 7) * 0.5,
        // Edges fold in first, center last — like a real crumple
        delay: (1 - d / maxD) * 0.25,
      });
      i++;
    }
  }

  return tiles;
};

export function CrumpledPaper({
  src,
  alt,
  width = 420,
  height = 280,
  grid = 10,
}: CrumpledPaperProps) {
  const [crumpled, setCrumpled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const tiles = useMemo(
    () => buildTiles(grid, width, height),
    [grid, width, height]
  );
  const tw = width / grid;
  const th = height / grid;

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const toggle = () => setCrumpled((c) => !c);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className="relative cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-amber-500 rounded-lg"
      style={{ width, height, perspective: 900 }}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={crumpled}
      aria-label={`${alt} — press to ${crumpled ? "unfold" : "crumple"} the image`}
    >
      {/* Soft shadow under the paper ball */}
      <div
        className="absolute left-1/2 bottom-6 -translate-x-1/2 w-1/3 h-5 bg-black/30 rounded-full blur-md transition-opacity duration-700 pointer-events-none"
        style={{ opacity: crumpled ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* The image, sliced into grid x grid tiles */}
      <div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        aria-hidden="true"
      >
        {tiles.map((t, idx) => (
          <div
            key={idx}
            className="absolute"
            style={{
              left: t.col * tw,
              top: t.row * th,
              width: tw + 0.5,
              height: th + 0.5,
              backgroundImage: `url(${src})`,
              backgroundSize: `${width}px ${height}px`,
              backgroundPosition: `-${t.col * tw}px -${t.row * th}px`,
              borderRadius: crumpled ? "30%" : "0%",
              filter: crumpled ? `brightness(${t.bright})` : "brightness(1)",
              transform: crumpled
                ? `translate3d(${t.tx}px, ${t.ty}px, 0) rotate(${t.rot}deg) rotateX(${t.rotX}deg) rotateY(${t.rotY}deg) scale(${t.scale})`
                : "none",
              transition: reduceMotion
                ? "none"
                : `transform 0.9s cubic-bezier(0.65, 0, 0.35, 1) ${t.delay}s, filter 0.9s ease ${t.delay}s, border-radius 0.9s ease ${t.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
