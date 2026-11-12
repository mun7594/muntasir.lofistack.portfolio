"use client";

import { CrumpledPaper } from "./CrumpledPaper";

export default function CrumpledPaperDemo() {
  return (
    <div className="min-h-[30rem] bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Crumpled Paper
        </h2>
        <p className="text-gray-600">
          Click (or press Enter) to crumple the photo into a paper ball — click
          again to smooth it back out
        </p>
      </div>

      <div className="flex justify-center py-6">
        <CrumpledPaper
          src="/Demo/roof-after.jpg"
          alt="Finished roof photo"
          width={420}
          height={280}
          grid={10}
        />
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Watch closely: the edges fold in first, just like real paper 📄
      </p>
    </div>
  );
}
