"use client";

import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";

interface TextScrambleProps {
  text: string;
  duration?: number; // total animation time in ms
  scrambleChars?: string; // glyph set used while scrambling
  replayOnHover?: boolean;
  className?: string;
}

const DEFAULT_GLYPHS = "!<>-_\\/[]{}=+*^?#@$%&";

export function TextScramble({
  text,
  duration = 1200,
  scrambleChars = DEFAULT_GLYPHS,
  replayOnHover = true,
  className = "",
}: TextScrambleProps) {
  // Initial render shows the real text — SSR-safe, scrambling starts client-side
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const stop = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const scramble = useCallback(() => {
    // Respect users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }

    stop();

    const totalFrames = Math.max(10, Math.floor(duration / 30));
    // Each letter resolves at its own frame: staggered left-to-right,
    // plus a random offset so the resolve order feels organic
    const resolveAt = text.split("").map(
      (_, i) =>
        Math.floor((i / text.length) * totalFrames * 0.6) +
        Math.floor(Math.random() * totalFrames * 0.4)
    );

    let frame = 0;
    intervalRef.current = window.setInterval(() => {
      frame++;
      const out = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (frame >= resolveAt[i]) return ch;
          return scrambleChars[
            Math.floor(Math.random() * scrambleChars.length)
          ];
        })
        .join("");

      setDisplay(out);

      if (frame >= totalFrames) {
        stop();
        setDisplay(text);
      }
    }, 30);
  }, [text, duration, scrambleChars]);

  useEffect(() => {
    scramble();
    return stop;
  }, [scramble]);

  return (
    <span
      className={`inline-block font-mono outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 rounded ${className}`}
      onMouseEnter={replayOnHover ? scramble : undefined}
      onFocus={replayOnHover ? scramble : undefined}
      tabIndex={replayOnHover ? 0 : undefined}
      aria-label={text}
    >
      {/* Screen readers get the stable text from aria-label above;
          the animated glyphs are hidden from them */}
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
