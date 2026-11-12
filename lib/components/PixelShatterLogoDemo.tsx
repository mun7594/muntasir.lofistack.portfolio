"use client";

import { PixelShatterLogo } from "./PixelShatterLogo";

export default function PixelShatterLogoDemo() {
  return (
    <div className="min-h-[34rem] bg-white rounded-lg border border-gray-200 p-8 overflow-hidden">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Pixel Shatter Logo
        </h2>
        <p className="text-gray-600">
          The logo starts shattered into pixels — hover it (or Tab / tap) to
          assemble it
        </p>
      </div>

      <div className="flex items-center justify-center py-16">
        <PixelShatterLogo size={260} spread={220} />
      </div>
    </div>
  );
}
