"use client";

import { LiquidMorph } from "./LiquidMorph";

export default function LiquidMorphDemo() {
  return (
    <div className="min-h-[32rem] bg-white rounded-lg border border-gray-200 p-8 overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Liquid Morph</h2>
        <p className="text-gray-600">
          Words melt into liquid and re-form as the next word — runs on a loop
        </p>
      </div>

      <div className="flex flex-col items-center gap-16 py-8">
        {/* Word morph */}
        <LiquidMorph
          words={["LIQUID", "MORPH", "MELT", "FLOW"]}
          className="h-28 w-full text-6xl md:text-7xl font-black text-gray-900"
        />

        {/* Shape/logo morph */}
        <div className="text-center w-full">
          <p className="text-sm text-gray-500 mb-2">
            Works with shapes and logo glyphs too:
          </p>
          <LiquidMorph
            words={["▲", "●", "■", "★"]}
            morphTime={1.4}
            cooldownTime={1}
            className="h-32 w-full text-8xl text-indigo-600"
          />
        </div>
      </div>
    </div>
  );
}
