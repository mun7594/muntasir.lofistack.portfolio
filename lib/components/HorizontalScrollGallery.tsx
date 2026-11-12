"use client";

import { useEffect, useRef } from "react";

export interface GalleryItem {
  title: string;
  subtitle?: string;
  gradient?: string; // Tailwind gradient classes for the card background
  image?: string; // optional image URL (overrides gradient)
}

interface HorizontalScrollGalleryProps {
  items: GalleryItem[];
  heading?: string;
}

export function HorizontalScrollGallery({
  items,
  heading = "Keep scrolling ↓ — the gallery moves sideways",
}: HorizontalScrollGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progressBar = progressRef.current;
    if (!section || !track) return;

    let raf = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      // 0 when the section top hits the viewport top, 1 when its bottom
      // reaches the viewport bottom
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

      const viewportW = track.parentElement?.clientWidth ?? 0;
      const shift = Math.max(0, track.scrollWidth - viewportW) * progress;
      track.style.transform = `translate3d(${-shift}px, 0, 0)`;

      if (progressBar) progressBar.style.width = `${progress * 100}%`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // The tall section: its extra height IS the horizontal scroll distance
    <div
      ref={sectionRef}
      style={{ height: `${100 + items.length * 60}vh` }}
      role="region"
      aria-label="Horizontal scroll gallery — scroll the page to browse"
    >
      {/* Sticky viewport: pinned while the section scrolls past */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <p className="text-center text-sm font-medium text-gray-500 mb-6">
          {heading}
        </p>

        {/* The horizontally-moving track */}
        <div ref={trackRef} className="flex gap-6 px-8 will-change-transform">
          {items.map((item, i) => (
            <div
              key={i}
              className={`relative flex-shrink-0 w-[min(70vw,24rem)] h-[55vh] rounded-3xl overflow-hidden shadow-xl flex flex-col justify-end p-8 ${
                item.image
                  ? "bg-gray-900"
                  : `bg-gradient-to-br ${item.gradient ?? "from-gray-700 to-gray-900"}`
              }`}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
              )}
              <span className="absolute top-6 left-8 text-6xl font-black text-white/25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                {item.subtitle && (
                  <p className="text-white/70 mt-1">{item.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mx-auto mt-8 w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gray-900 rounded-full"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
}
