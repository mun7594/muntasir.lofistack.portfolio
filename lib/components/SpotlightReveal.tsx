"use client";

import { useRef, ReactNode } from "react";

interface SpotlightRevealProps {
  children: ReactNode; // the hidden content revealed by the flashlight
  hint?: string; // dim text shown while nothing is revealed
  radius?: number; // flashlight radius in px
  className?: string; // container sizing (height etc.)
}

export function SpotlightReveal({
  children,
  hint = "🔦 Move your cursor to explore the dark…",
  radius = 130,
  className = "",
}: SpotlightRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const setSpot = (x: number, y: number, r: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--spot-x", `${x}px`);
    el.style.setProperty("--spot-y", `${y}px`);
    el.style.setProperty("--spot-r", `${r}px`);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot(e.clientX - rect.left, e.clientY - rect.top, radius);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || e.touches.length === 0) return;
    const t = e.touches[0];
    setSpot(t.clientX - rect.left, t.clientY - rect.top, radius);
  };

  const hide = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--spot-r", "0px");
  };

  // Keyboard users can't aim a cursor — focus reveals everything
  const revealAll = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--spot-x", "50%");
    el.style.setProperty("--spot-y", "50%");
    el.style.setProperty("--spot-r", "2000px");
  };

  const maskStyle = {
    WebkitMaskImage:
      "radial-gradient(circle var(--spot-r, 0px) at var(--spot-x, 50%) var(--spot-y, 50%), black 40%, transparent 100%)",
    maskImage:
      "radial-gradient(circle var(--spot-r, 0px) at var(--spot-x, 50%) var(--spot-y, 50%), black 40%, transparent 100%)",
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl bg-gray-950 cursor-none select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={hide}
      onTouchMove={handleTouchMove}
      onTouchEnd={hide}
      onFocus={revealAll}
      onBlur={hide}
      tabIndex={0}
      role="group"
      aria-label="Spotlight reveal area — focus to reveal the hidden content"
    >
      {/* Dim hint layer — what you see in the dark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-gray-600 text-sm md:text-base">{hint}</p>
      </div>

      {/* Hidden layer — only visible inside the flashlight circle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={maskStyle}
      >
        {children}
      </div>

      {/* Soft flashlight glow following the cursor */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle calc(var(--spot-r, 0px) * 1.2) at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255, 240, 180, 0.12), transparent 70%)",
        }}
      />
    </div>
  );
}
