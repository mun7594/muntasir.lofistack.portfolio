"use client";

import { GooeyImageTransition } from "./GooeyImageTransition";

export default function GooeyImageTransitionDemo() {
  return (
    <div className="min-h-[30rem] bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Gooey Image Transition
        </h2>
        <p className="text-gray-600">
          Click the image — it stretches and melts into the next one
        </p>
      </div>

      <div className="flex justify-center py-4">
        <GooeyImageTransition
          images={["/Demo/roof-before.jpg", "/Demo/roof-after.jpg"]}
          alts={["Worn out roof before renovation", "Brand new roof after renovation"]}
          width={480}
          height={320}
          duration={1400}
          intensity={120}
        />
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Powered by an SVG feTurbulence + feDisplacementMap filter — the
        displacement ramps up mid-transition, warping the pixels like liquid 🫠
      </p>
    </div>
  );
}
