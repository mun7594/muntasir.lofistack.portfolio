"use client";

import { ImageRevealCard } from "./ImageRevealCard";

export default function ImageRevealCardDemo() {
  return (
    <div className="min-h-[32rem] bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Image Card with Hover Reveal
          </h2>
          <p className="text-gray-600">
            Hover (or Tab to focus) a card to reveal the content overlay
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <ImageRevealCard
            image="/Demo/roof-before.jpg"
            title="Roof Restoration"
            description="Complete roof inspection and restoration service for aging shingles."
            category="Before"
            actions={[
              { label: "View Project" },
              { label: "Get Quote" },
            ]}
          />

          <ImageRevealCard
            image="/Demo/roof-after.jpg"
            title="Finished Result"
            description="Brand new roofing installed with a 20-year warranty and premium materials."
            category="After"
            actions={[{ label: "See Details" }]}
          />
        </div>
      </div>
    </div>
  );
}
