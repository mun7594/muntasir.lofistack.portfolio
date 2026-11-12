"use client";

import { useEffect, useId, useRef } from "react";

interface LiquidMorphProps {
  words: string[]; // texts/glyphs to morph between (cycles infinitely)
  morphTime?: number; // seconds the melt transition takes
  cooldownTime?: number; // seconds each word stays solid
  className?: string; // controls height, font size, color, weight
}

export function LiquidMorph({
  words,
  morphTime = 1,
  cooldownTime = 1.25,
  className = "",
}: LiquidMorphProps) {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  // useId can contain ":" which breaks url(#...) — strip to safe chars
  const filterId = `liquid-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    const t1 = text1Ref.current;
    const t2 = text2Ref.current;
    if (!t1 || !t2 || words.length === 0) return;

    // Reduced motion: show the first word statically, no melting
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      t2.textContent = words[0];
      t2.style.opacity = "100%";
      t2.style.filter = "none";
      t1.style.opacity = "0%";
      return;
    }

    let idx = 0;
    let morph = 0;
    let cooldown = cooldownTime;
    let raf = 0;
    let last = performance.now();

    t2.textContent = words[0];
    t2.style.opacity = "100%";
    t2.style.filter = "";
    t1.style.opacity = "0%";

    // The melt: outgoing text blurs away while incoming text sharpens.
    // The SVG threshold filter on the container turns the blurry overlap
    // into gooey liquid instead of a plain crossfade.
    const applyMorph = (f: number) => {
      t2.style.filter = `blur(${Math.min(8 / f - 8, 100)}px)`;
      t2.style.opacity = `${Math.pow(f, 0.4) * 100}%`;
      const inv = 1 - f;
      t1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      t1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
    };

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (cooldown > 0) {
        cooldown -= dt;
        if (cooldown <= 0) {
          // Start melting into the next word
          t1.textContent = words[idx % words.length];
          t2.textContent = words[(idx + 1) % words.length];
          morph = 0;
          applyMorph(0);
        } else {
          t2.style.filter = "";
          t2.style.opacity = "100%";
          t1.style.opacity = "0%";
        }
      } else {
        morph += dt;
        const f = Math.min(morph / morphTime, 1);
        applyMorph(f);
        if (f >= 1) {
          idx++;
          cooldown = cooldownTime;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [words, morphTime, cooldownTime]);

  return (
    <>
      {/* Threshold filter: boosts alpha contrast so blurred text edges
          merge into sharp liquid blobs */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={`relative select-none ${className}`}
        style={{ filter: `url(#${filterId})` }}
        role="img"
        aria-label={`Morphing text: ${words.join(", ")}`}
      >
        <span
          ref={text1Ref}
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        />
        <span
          ref={text2Ref}
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          {words[0]}
        </span>
      </div>
    </>
  );
}
