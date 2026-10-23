"use client";

import { useEffect, useState } from "react";

interface ProgressIndicatorProps {
  percentage?: number;
  label?: string;
  showPercentage?: boolean;
  animated?: boolean;
  variant?: "default" | "success" | "warning" | "danger";
  height?: "sm" | "md" | "lg";
}

export function ProgressIndicator({
  percentage = 0,
  label,
  showPercentage = true,
  animated = true,
  variant = "default",
  height = "md",
}: ProgressIndicatorProps) {
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    if (!animated) {
      setDisplayPercentage(percentage);
      return;
    }

    const interval = setInterval(() => {
      setDisplayPercentage((prev) => {
        if (prev >= percentage) {
          clearInterval(interval);
          return percentage;
        }
        return prev + Math.max(1, (percentage - prev) / 10);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [percentage, animated]);

  const heightClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const variantClasses = {
    default: "bg-gradient-to-r from-blue-500 to-blue-600",
    success: "bg-gradient-to-r from-green-500 to-green-600",
    warning: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    danger: "bg-gradient-to-r from-red-500 to-red-600",
  };

  const clampedPercentage = Math.min(100, Math.max(0, displayPercentage));

  return (
    <div className="w-full max-w-md">
      {/* Label */}
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-600">
              {Math.round(clampedPercentage)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Bar Background */}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClasses[height]}`}>
        {/* Progress Bar Fill */}
        <div
          className={`${variantClasses[variant]} ${heightClasses[height]} rounded-full transition-all duration-300 ease-out shadow-lg`}
          style={{ width: `${clampedPercentage}%` }}
        >
          {/* Shimmer Effect */}
          {animated && clampedPercentage > 0 && clampedPercentage < 100 && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div
                className="h-full w-1/3 bg-white/30 animate-pulse"
                style={{
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </div>
  );
}
