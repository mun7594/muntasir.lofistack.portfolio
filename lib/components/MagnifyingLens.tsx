"use client";

import { useRef, ReactNode } from "react";

interface MagnifyingLensProps {
  children: ReactNode; // content to magnify (text, images, anything)
  zoom?: number; // magnification factor
  lensSize?: number; // lens diameter in px
  className?: string;
}

export function MagnifyingLens({
  children,
  zoom = 2,
  lensSize = 160,
  className = "",
}: MagnifyingLensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  // Place the lens at local coordinates (x, y) inside the container.
  // The clone is translated so the magnified point sits at the lens center.
  const place = (x: number, y: number) => {
    const container = containerRef.current;
    const lens = lensRef.current;
    const clone = cloneRef.current;
    if (!container || !lens || !clone) return;

    const rect = container.getBoundingClientRect();
    const cx = Math.max(0, Math.min(rect.width, x));
    const cy = Math.max(0, Math.min(rect.height, y));
    posRef.current = { x: cx, y: cy };
    const r = lensSize / 2;

    lens.style.left = `${cx - r}px`;
    lens.style.top = `${cy - r}px`;
    lens.style.opacity = "1";

    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.transform = `translate(${r - cx * zoom}px, ${r - cy * zoom}px) scale(${zoom})`;
  };

  const hide = () => {
    const lens = lensRef.current;
    if (lens) lens.style.opacity = "0";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    place(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || e.touches.length === 0) return;
    const t = e.touches[0];
    place(t.clientX - rect.left, t.clientY - rect.top);
  };

  // Keyboard users move the lens with arrow keys after focusing
  const handleFocus = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    place(rect.width / 2, rect.height / 2);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 20;
    let { x, y } = posRef.current;

    if (e.key === "ArrowLeft") x -= step;
    else if (e.key === "ArrowRight") x += step;
    else if (e.key === "ArrowUp") y -= step;
    else if (e.key === "ArrowDown") y += step;
    else if (e.key === "Escape") {
      hide();
      return;
    } else return;

    e.preventDefault();
    place(x, y);
  };

  return (
    <div
      ref={containerRef}
      className={`relative cursor-none select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-lg ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={hide}
      onTouchMove={handleTouchMove}
      onTouchEnd={hide}
      onFocus={handleFocus}
      onBlur={hide}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="group"
      aria-label="Magnifier area — focus and use arrow keys to move the lens, Escape to hide it"
    >
      {/* The original content */}
      {children}

      {/* The lens: a clipped circle containing a scaled clone of the content */}
      <div
        ref={lensRef}
        className="absolute rounded-full overflow-hidden border-[3px] border-white bg-white shadow-2xl ring-1 ring-black/20 pointer-events-none opacity-0 transition-opacity duration-200 z-10"
        style={{ width: lensSize, height: lensSize }}
        aria-hidden="true"
      >
        <div ref={cloneRef} className="absolute top-0 left-0 origin-top-left">
          {children}
        </div>
      </div>
    </div>
  );
}
