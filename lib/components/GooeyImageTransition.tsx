"use client";

import { useEffect, useId, useRef, useState } from "react";

interface GooeyImageTransitionProps {
  images: string[]; // 2+ images to cycle through
  alts?: string[]; // descriptions matching images
  width?: number;
  height?: number;
  duration?: number; // transition time in ms
  intensity?: number; // max displacement (how violently it melts)
}

export function GooeyImageTransition({
  images,
  alts = [],
  width = 480,
  height = 320,
  duration = 1400,
  intensity = 120,
}: GooeyImageTransitionProps) {
  const [current, setCurrent] = useState(0);
  const animatingRef = useRef(false);
  const rafRef = useRef(0);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const imgARef = useRef<SVGImageElement>(null);
  const imgBRef = useRef<SVGImageElement>(null);
  // useId can contain ":" which breaks url(#...) — strip to safe chars
  const filterId = `gooey-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const next = (current + 1) % images.length;

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const melt = () => {
    if (animatingRef.current || images.length < 2) return;
    const disp = dispRef.current;
    const imgA = imgARef.current;
    const imgB = imgBRef.current;
    if (!disp || !imgA || !imgB) return;

    const target = (current + 1) % images.length;

    // Reduced motion: instant swap, no melting
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(target);
      return;
    }

    animatingRef.current = true;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = p * p * (3 - 2 * p); // smoothstep crossfade

      // Displacement rises to max mid-transition, then settles back to 0 —
      // this is what makes the image stretch and melt instead of just fading
      disp.setAttribute("scale", String(intensity * Math.sin(Math.PI * p)));
      imgB.setAttribute("opacity", String(eased));
      imgA.setAttribute("opacity", String(1 - eased));

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Settle: layer A takes over the new image, layer B hides again
        imgA.setAttribute("href", images[target]);
        imgA.setAttribute("opacity", "1");
        imgB.setAttribute("opacity", "0");
        disp.setAttribute("scale", "0");
        animatingRef.current = false;
        setCurrent(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      melt();
    }
  };

  const label = alts[current] ?? `Image ${current + 1} of ${images.length}`;

  return (
    <div
      className="relative inline-block cursor-pointer select-none overflow-hidden rounded-xl shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-pink-500"
      style={{ width, height }}
      onClick={melt}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${label} — press to melt into the next image`}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden="true"
      >
        <defs>
          {/* Fractal noise drives the displacement — the melt pattern */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.028"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <g filter={`url(#${filterId})`}>
          <image
            ref={imgARef}
            href={images[current]}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
            opacity="1"
          />
          <image
            ref={imgBRef}
            href={images[next]}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
            opacity="0"
          />
        </g>
      </svg>
    </div>
  );
}
