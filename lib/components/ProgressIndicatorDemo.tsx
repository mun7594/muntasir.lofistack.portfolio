"use client";

import { useState } from "react";
import { ProgressIndicator } from "./ProgressIndicator";

export default function ProgressIndicatorDemo() {
  const [percentage, setPercentage] = useState(0);

  const handleIncrement = () => {
    setPercentage((prev) => Math.min(100, prev + 10));
  };

  const handleReset = () => {
    setPercentage(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Progress Indicator
          </h2>
          <p className="text-gray-600 mb-8">
            Interactive demo with different variants and sizes
          </p>

          {/* Variants */}
          <div className="space-y-8 mb-12">
            {/* Default */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Default
              </h3>
              <ProgressIndicator
                percentage={percentage}
                label="Download Progress"
                variant="default"
              />
            </div>

            {/* Success */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Success
              </h3>
              <ProgressIndicator
                percentage={75}
                label="Upload Complete"
                variant="success"
              />
            </div>

            {/* Warning */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Warning
              </h3>
              <ProgressIndicator
                percentage={50}
                label="Storage Usage"
                variant="warning"
              />
            </div>

            {/* Danger */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Danger
              </h3>
              <ProgressIndicator
                percentage={25}
                label="Battery Level"
                variant="danger"
              />
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Sizes
            </h3>
            <div className="space-y-6">
              <ProgressIndicator
                percentage={60}
                label="Small"
                height="sm"
                animated={false}
              />
              <ProgressIndicator
                percentage={60}
                label="Medium (Default)"
                height="md"
                animated={false}
              />
              <ProgressIndicator
                percentage={60}
                label="Large"
                height="lg"
                animated={false}
              />
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Interactive Demo
            </h3>
            <div className="mb-6">
              <ProgressIndicator
                percentage={percentage}
                label="Test Progress"
                variant="default"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleIncrement}
                disabled={percentage >= 100}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Increment (+10%)
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
