"use client";

import { StarRating } from "./StarRating";

export default function StarRatingDemo() {
  return (
    <div className="flex flex-col gap-12 items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      {/* Small */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Small Size
        </h3>
        <StarRating size="sm" />
      </div>

      {/* Medium (Default) */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Medium Size (Default)
        </h3>
        <StarRating size="md" />
      </div>

      {/* Large */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Large Size
        </h3>
        <StarRating size="lg" />
      </div>
    </div>
  );
}
