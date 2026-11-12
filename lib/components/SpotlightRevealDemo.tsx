"use client";

import { SpotlightReveal } from "./SpotlightReveal";

export default function SpotlightRevealDemo() {
  return (
    <div className="min-h-[30rem] bg-white rounded-lg border border-gray-200 p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Spotlight Reveal
        </h2>
        <p className="text-gray-600">
          Your cursor is a flashlight — sweep it across the dark area to find
          what&apos;s hidden (or Tab to focus and reveal everything)
        </p>
      </div>

      <SpotlightReveal className="h-96 w-full" radius={140}>
        {/* Hidden content revealed by the flashlight */}
        <div className="w-full h-full bg-gray-950 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="text-5xl tracking-widest">💎 🗝️ ✨ 🏆 🔮</div>

          <h3 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            YOU FOUND THE SECRET
          </h3>

          <p className="text-gray-300 max-w-md">
            This entire layer is invisible until your flashlight passes over
            it. Great for treasure hunts, 404 pages, portfolio easter eggs, and
            dramatic hero sections.
          </p>

          <div className="flex gap-3 flex-wrap justify-center">
            <span className="px-4 py-2 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 rounded-full text-sm font-semibold">
              Hidden Badge #1
            </span>
            <span className="px-4 py-2 bg-pink-400/20 border border-pink-400/40 text-pink-300 rounded-full text-sm font-semibold">
              Hidden Badge #2
            </span>
            <span className="px-4 py-2 bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 rounded-full text-sm font-semibold">
              Hidden Badge #3
            </span>
          </div>
        </div>
      </SpotlightReveal>
    </div>
  );
}
