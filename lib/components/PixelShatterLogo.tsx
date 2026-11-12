"use client";

import { useMemo, useState } from "react";

interface PixelShatterLogoProps {
  size?: number; // container size in px
  spread?: number; // how far pixels scatter in px
}

const GRID = 21;

const COLORS = {
  blue: "#4285F4",
  red: "#EA4335",
  yellow: "#FBBC05",
  green: "#34A853",
};

// Deterministic pseudo-random (same result on server and client — avoids
// hydration mismatches that Math.random() would cause)
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

interface Pixel {
  col: number;
  row: number;
  color: string;
  tx: number;
  ty: number;
  rot: number;
  delay: number;
}

// Builds the Google "G" out of grid pixels: a 4-color ring with an opening
// on the upper right, plus the blue horizontal crossbar.
const buildPixels = (spread: number): Pixel[] => {
  const pixels: Pixel[] = [];
  const center = GRID / 2;
  const outer = 9.5;
  const inner = 6;
  let i = 0;

  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      const cx = col + 0.5;
      const cy = row + 0.5;
      const dx = cx - center;
      const dy = cy - center;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let color: string | null = null;

      if (dist >= inner && dist <= outer) {
        let angle = (Math.atan2(-dy, dx) * 180) / Math.PI;
        if (angle < 0) angle += 360;

        if (angle < 48) color = null; // the G's opening
        else if (angle < 135) color = COLORS.red;
        else if (angle < 225) color = COLORS.yellow;
        else if (angle < 318) color = COLORS.green;
        else color = COLORS.blue;
      }

      // Blue crossbar: from center to the right edge at middle height
      if (dx >= 0.5 && Math.abs(dy) <= 1.75 && dist <= outer) {
        color = COLORS.blue;
      }

      if (color) {
        pixels.push({
          col,
          row,
          color,
          tx: (pseudoRandom(i * 4 + 1) - 0.5) * spread * 2,
          ty: (pseudoRandom(i * 4 + 2) - 0.5) * spread * 2,
          rot: (pseudoRandom(i * 4 + 3) - 0.5) * 540,
          delay: pseudoRandom(i * 4 + 4) * 0.35,
        });
      }
      i++;
    }
  }

  return pixels;
};

export function PixelShatterLogo({
  size = 260,
  spread = 220,
}: PixelShatterLogoProps) {
  const [assembled, setAssembled] = useState(false);
  const pixels = useMemo(() => buildPixels(spread), [spread]);
  const cell = size / GRID;

  return (
    <div
      className="relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-blue-500 rounded-lg"
      style={{ width: size, height: size }}
      onMouseEnter={() => setAssembled(true)}
      onMouseLeave={() => setAssembled(false)}
      onFocus={() => setAssembled(true)}
      onBlur={() => setAssembled(false)}
      onTouchStart={() => setAssembled((a) => !a)}
      tabIndex={0}
      role="img"
      aria-label="Google logo assembling from scattered pixels on hover"
    >
      {pixels.map((p, idx) => (
        <span
          key={idx}
          className="absolute rounded-[2px]"
          style={{
            left: p.col * cell,
            top: p.row * cell,
            width: cell - 1,
            height: cell - 1,
            backgroundColor: p.color,
            transform: assembled
              ? "translate(0, 0) rotate(0deg) scale(1)"
              : `translate(${p.tx}px, ${p.ty}px) rotate(${p.rot}deg) scale(0.5)`,
            opacity: assembled ? 1 : 0.75,
            transition: `transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${p.delay}s, opacity 0.8s ease ${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
