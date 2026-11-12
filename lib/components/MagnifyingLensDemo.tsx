"use client";

import { MagnifyingLens } from "./MagnifyingLens";

export default function MagnifyingLensDemo() {
  return (
    <div className="min-h-[36rem] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Magnifying Lens
        </h2>
        <p className="text-gray-600">
          Your cursor becomes a magnifying glass — works on images AND text.
          Keyboard: Tab to focus, arrow keys to move the lens, Esc to hide.
        </p>
      </div>

      <div className="flex flex-col items-center gap-12">
        {/* Image magnifier */}
        <div className="w-full max-w-xl">
          <p className="text-sm text-gray-500 text-center mb-3">
            Image — inspect the roof details (2.5x zoom)
          </p>
          <MagnifyingLens zoom={2.5} lensSize={170}>
            <img
              src="/Demo/roof-after.jpg"
              alt="Finished roof ready for close inspection"
              className="w-full rounded-lg block"
            />
          </MagnifyingLens>
        </div>

        {/* Fine-print text magnifier */}
        <div className="w-full max-w-xl">
          <p className="text-sm text-gray-500 text-center mb-3">
            Text — read the fine print (3x zoom)
          </p>
          <MagnifyingLens zoom={3} lensSize={160}>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Terms &amp; Conditions
              </h3>
              <p className="text-[7px] leading-relaxed text-gray-500">
                By hovering over this document you agree to inspect all pixels
                carefully. Clause 1: The magnifying lens component renders a
                scaled clone of this exact content inside a clipped circle.
                Clause 2: The clone is translated so the point under your
                cursor always sits at the lens center. Clause 3: No canvas, no
                screenshots, no external libraries were used in the making of
                this effect. Clause 4: Keyboard users may operate this lens
                with arrow keys after focusing the area, because accessibility
                is not optional. Clause 5: Congratulations — you found the
                hidden fine print. This is exactly the kind of text nobody
                reads without a magnifying glass. 🔍
              </p>
            </div>
          </MagnifyingLens>
        </div>
      </div>
    </div>
  );
}
