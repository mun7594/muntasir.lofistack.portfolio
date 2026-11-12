"use client";

import { useState } from "react";
import { TextScramble } from "./TextScramble";

export default function TextScrambleDemo() {
  // Changing the key remounts the components, replaying every animation
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div className="min-h-[30rem] bg-gray-950 rounded-lg p-8 overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-12 py-8">
        {/* Hero example */}
        <div className="text-center" key={`hero-${replayKey}`}>
          <TextScramble
            text="TEXT SCRAMBLE"
            duration={1600}
            className="text-4xl md:text-5xl font-bold text-emerald-400 tracking-wider"
          />
          <p className="text-gray-400 mt-4">
            Hover (or Tab to focus) any text to replay its scramble
          </p>
        </div>

        {/* Variations */}
        <div
          className="flex flex-col items-center gap-6 text-center"
          key={`variants-${replayKey}`}
        >
          <TextScramble
            text="Fast decode effect"
            duration={700}
            className="text-xl text-white"
          />

          <TextScramble
            text="Binary glyphs only"
            duration={1500}
            scrambleChars="01"
            className="text-xl text-cyan-400"
          />

          <TextScramble
            text="Slow dramatic reveal..."
            duration={2600}
            className="text-xl text-purple-400"
          />
        </div>

        {/* Replay all */}
        <button
          onClick={() => setReplayKey((k) => k + 1)}
          className="px-6 py-3 bg-emerald-500 text-gray-950 font-semibold rounded-full hover:bg-emerald-400 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-emerald-400"
        >
          ↻ Replay All
        </button>
      </div>
    </div>
  );
}
