"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface PixelExplodeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  grid?: number; // number of columns (rows derived to keep tiles square)
  spread?: number; // how far pixels fly in px
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
  scale: number;
  delay: number;
}

const buildTiles = (cols: number, rows: number, spread: number): Tile[] => {
  const tiles: Tile[] = [];
  let i = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      tiles.push({
        col,
        row,
        tx: (pseudoRandom(i * 5 + 1) - 0.5) * spread * 2,
        ty: (pseudoRandom(i * 5 + 2) - 0.5) * spread * 2,
        rot: (pseudoRandom(i * 5 + 3) - 0.5) * 720,
        scale: 0.3 + pseudoRandom(i * 5 + 4) * 0.9,
        delay: pseudoRandom(i * 5 + 5) * 0.15,
      });
      i++;
    }
  }
  return tiles;
};

export function PixelExplodeImage({
  src,
  alt,
  width = 288,
  height = 384,
  grid = 12,
  spread = 450,
}: PixelExplodeImageProps) {
  const [exploded, setExploded] = useState(false);
  // settled = fully reassembled → corners can be clipped round again
  const [settled, setSettled] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  // Background geometry emulating object-fit: cover (no stretching)
  const [bg, setBg] = useState({ w: width, h: height, ox: 0, oy: 0 });
  const settleTimer = useRef<number | null>(null);

  const cols = grid;
  const tileSize = width / cols;
  const rows = Math.round(height / tileSize);
  const tiles = useMemo(
    () => buildTiles(cols, rows, spread),
    [cols, rows, spread]
  );

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    // Measure the real image and compute cover-crop geometry so the
    // photo is never squeezed or stretched
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const scale = Math.max(
        width / img.naturalWidth,
        height / img.naturalHeight
      );
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      setBg({ w, h, ox: (w - width) / 2, oy: (h - height) / 2 });
    };

    return () => {
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    };
  }, [src, width, height]);

  const explode = () => {
    if (reduceMotion) return;
    if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    setSettled(false);
    setExploded(true);
  };

  const assemble = () => {
    setExploded(false);
    if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    // Re-clip the rounded corners only after the tiles have flown home
    settleTimer.current = window.setTimeout(() => setSettled(true), 800);
  };

  return (
    <div
      className="relative outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-gray-900 rounded-2xl"
      style={{ width, height, zIndex: 30 }}
      onMouseEnter={explode}
      onMouseLeave={assemble}
      onFocus={explode}
      onBlur={assemble}
      onTouchStart={() => !reduceMotion && setExploded((e) => !e)}
      tabIndex={0}
      role="img"
      aria-label={alt}
    >
      {/* Backing shadow — fades away while the pixels are blown apart */}
      <div
        className="absolute inset-0 rounded-2xl shadow-lg transition-opacity duration-500"
        style={{ opacity: exploded ? 0 : 1 }}
        aria-hidden="true"
      />

      {/* The image, sliced into tiles. Clipped to rounded corners while
          assembled; clipping released so tiles can fly across the screen */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ overflow: settled && !exploded ? "hidden" : "visible" }}
        aria-hidden="true"
      >
        {tiles.map((t, idx) => (
          <div
            key={idx}
            className="absolute pointer-events-none"
            style={{
              left: t.col * tileSize,
              top: t.row * tileSize,
              width: tileSize + 0.5,
              height: tileSize + 0.5,
              backgroundImage: `url(${src})`,
              backgroundSize: `${bg.w}px ${bg.h}px`,
              backgroundPosition: `-${t.col * tileSize + bg.ox}px -${t.row * tileSize + bg.oy}px`,
              borderRadius: exploded ? "40%" : "0%",
              opacity: exploded ? 0.9 : 1,
              transform: exploded
                ? `translate3d(${t.tx}px, ${t.ty}px, 0) rotate(${t.rot}deg) scale(${t.scale})`
                : "none",
              transition: `transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${t.delay}s, opacity 0.7s ease ${t.delay}s, border-radius 0.7s ease ${t.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
