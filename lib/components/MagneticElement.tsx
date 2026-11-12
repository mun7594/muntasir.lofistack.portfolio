"use client";

import { useRef, ReactNode } from "react";

interface MagneticElementProps {
  children: ReactNode; // anything: buttons, icons, letters
  strength?: number; // 0–1, how strongly it follows the cursor
  className?: string; // extra classes on the hover zone (e.g. padding)
}

export function MagneticElement({
  children,
  strength = 0.4,
  className = "",
}: MagneticElementProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    // Respect users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = wrap.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    // Short transition while following smooths out pointer jitter
    inner.style.transition = "transform 0.15s ease-out";
    inner.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const handleMouseLeave = () => {
    const inner = innerRef.current;
    if (!inner) return;

    // Springy elastic snap back to center
    inner.style.transition =
      "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
    inner.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={wrapRef}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} className="inline-block will-change-transform">
        {children}
      </div>
    </div>
  );
}
