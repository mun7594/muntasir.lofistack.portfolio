"use client";

import { useState } from "react";

interface StarRatingProps {
  maxStars?: number;
  onRatingChange?: (rating: number) => void;
  initialRating?: number;
  size?: "sm" | "md" | "lg";
}

export function StarRating({
  maxStars = 5,
  onRatingChange,
  initialRating = 0,
  size = "md",
}: StarRatingProps) {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const handleStarClick = (value: number) => {
    setRating(value);
    onRatingChange?.(value);
  };

  const handleStarHover = (value: number) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let newRating = rating;

    if (e.key === "ArrowRight") {
      newRating = Math.min(maxStars, rating + 1);
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      newRating = Math.max(0, rating - 1);
      e.preventDefault();
    } else if (e.key === "Home") {
      newRating = 0;
      e.preventDefault();
    } else if (e.key === "End") {
      newRating = maxStars;
      e.preventDefault();
    }

    if (newRating !== rating) {
      setRating(newRating);
      onRatingChange?.(newRating);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Stars Container */}
      <div
        className="flex gap-2 cursor-pointer outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 rounded-lg p-2"
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        role="radiogroup"
        aria-label="Star rating (use arrow keys to rate, Home for 0, End for max)"
        tabIndex={0}
        aria-valuenow={rating}
        aria-valuemin={0}
        aria-valuemax={maxStars}
      >
        {Array.from({ length: maxStars }).map((_, index) => {
          const starValue = index + 1;
          const isFilled =
            starValue <= (hoverRating || rating);

          return (
            <button
              key={index}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
              className={`transition-all duration-200 transform ${
                isFilled ? "scale-110" : "scale-100"
              } ${sizeClasses[size]} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 rounded-full`}
              aria-label={`${starValue} star${starValue !== 1 ? "s" : ""} ${rating === starValue ? "(selected)" : ""}`}
              aria-pressed={rating === starValue}
              type="button"
            >
              <svg
                className={`w-full h-full transition-all duration-200 ${
                  isFilled
                    ? "fill-yellow-400 drop-shadow-lg"
                    : "fill-gray-300 hover:fill-yellow-200"
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Rating Display */}
      {rating > 0 && (
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-500">{rating}</div>
          <div className="text-sm text-gray-600">
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent"}
          </div>
        </div>
      )}

      {/* Reset Button */}
      {rating > 0 && (
        <button
          onClick={() => {
            setRating(0);
            onRatingChange?.(0);
          }}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Clear Rating
        </button>
      )}
    </div>
  );
}
