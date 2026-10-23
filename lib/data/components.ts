// Component data - Enhanced with full details!
// Matches the structure from Lofistack colleague's site

export interface ComponentProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface ComponentFile {
  name: string;
  language: string;
  content: string;
}

export interface Component {
  id: string;
  slug: string;
  name: string;
  type: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  createdDate: string;
  week: number;
  componentNumber: number;
  category: string;
  tags: string[];
  dependencies: string;
  techStack: string[];
  files: ComponentFile[];
  prompt: string;
  codeLink: string;
  liveLink?: string;
  accessibility: string;
  relatedProps: ComponentProp[];
  features: string[];
}

export const components: Component[] = [
  {
    id: "6",
    slug: "before-after-slider",
    name: "Before-After Slider",
    type: "slider",
    description: "Interactive image comparison slider with drag and touch support for before/after transformations",
    longDescription:
      "A professional-grade before-after image slider component that lets users compare two images by dragging a divider across. Perfect for portfolios, renovation companies, makeover services, or any transformation showcase. Features smooth drag interactions, responsive design, full mobile/touch support, and accessible labels. The component is lightweight, performant, and easy to customize with custom labels and aspect ratios.",
    thumbnail: "",
    createdDate: "2026-10-12",
    week: 2,
    componentNumber: 2,
    category: "Slider",
    tags: ["Interactive", "Comparison", "Image Slider", "Drag-Drop", "Mobile-Friendly", "Transformation"],
    dependencies: "React 18+",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Browser APIs"],
    files: [
      {
        name: "BeforeAfterSlider.tsx",
        language: "typescript",
        content: `"use client";

import { useState, useRef, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: "square" | "16:9" | "4:3" | "auto";
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  aspectRatio = "16:9",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "4:3":
        return "aspect-video";
      case "16:9":
        return "aspect-video";
      default:
        return "w-full";
    }
  };

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      updateSliderPosition(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateSliderPosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateSliderPosition(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={\`relative overflow-hidden bg-gray-200 rounded-lg cursor-col-resize select-none \${getAspectRatioClass()}\`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={afterImage}
          alt="After"
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-sm font-medium pointer-events-none">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: \`\${sliderPosition}%\` }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-sm font-medium pointer-events-none">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line and Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
        style={{ left: \`\${sliderPosition}%\`, transform: "translateX(-50%)" }}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing">
          {/* Arrow Icons */}
          <div className="flex items-center justify-center gap-1">
            <svg
              className="w-5 h-5 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <svg
              className="w-5 h-5 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}`,
      },
      {
        name: "index.ts",
        language: "typescript",
        content: `export { BeforeAfterSlider } from './BeforeAfterSlider'`,
      },
    ],
    prompt: `Create a before-after image comparison slider component in React with these features:
    - Two images overlaid (before on left, after on right)
    - Draggable slider divider that users can drag with mouse or touch
    - Visual slider handle (white vertical line with circular handle in center)
    - Arrow icons on handle to indicate draggability (left and right arrows)
    - Mouse drag support (click and drag to compare images)
    - Full touch/swipe support for mobile devices
    - Before/After labels positioned on bottom-left and bottom-right of images
    - Labels have semi-transparent dark background for readability
    - Responsive design that scales to container width
    - Support for different aspect ratios (square, 16:9, 4:3, auto)
    - Cursor changes to col-resize to indicate the divider is draggable
    - Prevent default image dragging behavior
    - Smooth animations and transitions
    - TypeScript with full prop typing
    - Client Component for proper event handling`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink: "https://muntasir-lofistack-portfolio.vercel.app/components/before-after-slider",
    accessibility:
      "Semantic HTML with proper alt text on images. Clear visual handle with 48px touch target (WCAG compliance). High contrast white handle on images. Labels visible with good color contrast (black text on semi-transparent background). No auto-playing animations that require user interaction to control.",
    relatedProps: [
      {
        name: "beforeImage",
        type: "string",
        default: "required",
        description: "URL of the before/original image",
      },
      {
        name: "afterImage",
        type: "string",
        default: "required",
        description: "URL of the after/transformed image",
      },
      {
        name: "beforeLabel",
        type: "string",
        default: '"Before"',
        description: "Text label displayed on the before image (bottom-left)",
      },
      {
        name: "afterLabel",
        type: "string",
        default: '"After"',
        description: "Text label displayed on the after image (bottom-right)",
      },
      {
        name: "aspectRatio",
        type: '"square" | "16:9" | "4:3" | "auto"',
        default: '"16:9"',
        description: "Aspect ratio of the slider container (controls width:height ratio)",
      },
    ],
    features: [
      "Smooth drag interaction on mouse and touch devices",
      "Visual slider handle with directional arrow icons",
      "Before/After labels with semi-transparent backgrounds",
      "Flexible aspect ratio support (square, 16:9, 4:3, auto)",
      "Fully responsive (adapts to all screen sizes)",
      "WCAG compliant with high contrast colors",
      "48px circular handle (touch-friendly on mobile)",
      "Prevents image dragging while using the slider",
      "Visual feedback with col-resize cursor",
      "White divider line for clear separation",
      "Built with TypeScript for type safety",
      "Perfect for transformation showcases (renovations, makeovers, etc.)",
    ],
  },
  {
    id: "7",
    slug: "submit-form-button",
    name: "Submit Form Button",
    type: "button",
    description: "Interactive submit button with rotating arrow and flipping text animation",
    longDescription:
      "A sleek submit button component featuring smooth animations on hover. The arrow rotates a full 360 degrees while the text flips, creating a dynamic and engaging user experience. Perfect for form submissions with a modern, polished design using black background with white text and arrow.",
    thumbnail: "",
    createdDate: "2026-10-05",
    week: 2,
    componentNumber: 3,
    category: "Button",
    tags: ["Animation", "Interactive", "Form", "Hover Effect", "Arrow Icon"],
    dependencies: "None",
    techStack: ["React", "TypeScript", "CSS Animations", "Tailwind CSS"],
    files: [
      {
        name: "SubmitFormButton.tsx",
        language: "typescript",
        content: `"use client";

import React, { useState } from "react";

interface SubmitFormButtonProps {
  text?: string;
  onClick?: () => void;
}

export function SubmitFormButton({
  text = "Submit Form",
  onClick,
}: SubmitFormButtonProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <style>{\`
        @keyframes rotateArrow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes flipText {
          0% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0);
          }
          100% {
            transform: scaleY(-1);
          }
        }
        .submit-button-arrow {
          animation: rotateArrow 0.6s ease-in-out;
        }
        .submit-button-text {
          animation: flipText 0.6s ease-in-out;
        }
      \`}</style>

      <button
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={onClick}
        className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-semibold hover:shadow-lg transition-shadow duration-300 hover:shadow-black/50"
      >
        <span
          className={isHovering ? "submit-button-text" : ""}
        >
          {text}
        </span>
        <svg
          className={\`w-5 h-5 text-white flex-shrink-0 \${
            isHovering ? "submit-button-arrow" : ""
          }\`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </>
  );
}`,
      },
      {
        name: "index.ts",
        language: "typescript",
        content: `export { SubmitFormButton } from './SubmitFormButton'`,
      },
    ],
    prompt: `Create a submit form button component in React with these features:
    - Black background fill with white text and arrow
    - Button text: "Submit Form"
    - Arrow icon on the right side
    - Border radius: 50px (full rounded)
    - On hover:
      * Arrow rotates 360 degrees smoothly (0.6s animation)
      * Text flips vertically (scaleY animation)
    - Smooth shadow effect on hover
    - Responsive design
    - TypeScript with proper prop typing
    - Use CSS keyframe animations for smooth effects`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink: "https://muntasir-lofistack-portfolio.vercel.app/components/submit-form-button",
    accessibility:
      "Semantic button element. Clear visual feedback on hover. Arrow icon uses SVG with proper stroke. High contrast (black background, white text). Can be triggered with keyboard (Enter/Space).",
    relatedProps: [
      {
        name: "text",
        type: "string",
        default: '"Submit Form"',
        description: "Text displayed on the button",
      },
      {
        name: "onClick",
        type: "() => void",
        default: "undefined",
        description: "Callback function triggered when button is clicked",
      },
    ],
    features: [
      "360-degree arrow rotation on hover",
      "Text flip animation on hover",
      "Black background with white text",
      "Smooth CSS animations (0.6s duration)",
      "Shadow effect on hover",
      "Responsive and mobile-friendly",
      "TypeScript support",
      "Easy to customize text and callback",
    ],
  },
  {
    id: "8",
    slug: "star-rating",
    name: "Star Rating Component",
    type: "rating",
    description: "Interactive star rating component with hover effects and visual feedback",
    longDescription:
      "A beautiful, interactive star rating component that lets users rate content with a 5-star scale. Features smooth hover animations, visual feedback, and support for multiple sizes. Perfect for reviews, ratings, feedback forms, and user interactions. The component includes keyboard accessibility and a clear rating display with descriptive labels.",
    thumbnail: "",
    createdDate: "2026-10-14",
    week: 3,
    componentNumber: 3,
    category: "Rating",
    tags: ["Interactive", "Rating", "Feedback", "Animation", "Accessibility"],
    dependencies: "React 18+",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    files: [
      {
        name: "StarRating.tsx",
        language: "typescript",
        content: `"use client";

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

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="flex gap-2 cursor-pointer"
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: maxStars }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= (hoverRating || rating);

          return (
            <button
              key={index}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
              className={\`transition-all duration-200 transform \${
                isFilled ? "scale-110" : "scale-100"
              } \${sizeClasses[size]}\`}
              aria-label={\`Rate \${starValue} stars\`}
              type="button"
            >
              <svg
                className={\`w-full h-full transition-all duration-200 \${
                  isFilled
                    ? "fill-yellow-400 drop-shadow-lg"
                    : "fill-gray-300 hover:fill-yellow-200"
                }\`}
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          );
        })}
      </div>

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
}`,
      },
      {
        name: "index.ts",
        language: "typescript",
        content: `export { StarRating } from './StarRating'`,
      },
    ],
    prompt: `Create an interactive star rating component in React with these features:
    - Display 5 stars that users can click to rate
    - Hover effect that highlights stars up to the hovered position
    - Click to select a rating (1-5 stars)
    - Show rating value and descriptive label (Poor, Fair, Good, Very Good, Excellent)
    - Stars scale up on hover for visual feedback
    - Support for different sizes (small, medium, large)
    - Clear rating button to reset
    - Smooth animations and transitions
    - TypeScript with full prop typing
    - Callback function when rating changes
    - Keyboard accessible with proper ARIA labels`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink: "https://muntasir-lofistack-portfolio.vercel.app/components/star-rating",
    accessibility:
      "Semantic button elements with proper ARIA labels. Clear visual feedback on hover and focus. Keyboard navigable. High contrast yellow stars. Touch-friendly 44px minimum tap targets on large size.",
    relatedProps: [
      {
        name: "maxStars",
        type: "number",
        default: "5",
        description: "Number of stars to display",
      },
      {
        name: "onRatingChange",
        type: "(rating: number) => void",
        default: "undefined",
        description: "Callback function when rating changes",
      },
      {
        name: "initialRating",
        type: "number",
        default: "0",
        description: "Initial rating value (0-5)",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Star size (small, medium, large)",
      },
    ],
    features: [
      "5-star interactive rating system",
      "Hover effects with star scale animation",
      "Click to select rating",
      "Descriptive rating labels",
      "Multiple size options",
      "Smooth transitions",
      "Clear rating button",
      "Keyboard accessible",
      "ARIA labels for screen readers",
      "Callback function support",
      "TypeScript support",
      "Perfect for reviews and feedback",
    ],
  },
  {
    id: "9",
    slug: "progress-indicator",
    name: "Progress Indicator",
    type: "progress",
    description: "Animated progress bar with multiple variants and smooth animations",
    longDescription:
      "A beautiful, animated progress indicator component that displays progress with smooth animations and visual effects. Supports multiple color variants (default, success, warning, danger), customizable heights, and optional percentage labels. Perfect for downloads, uploads, loading states, and progress tracking. Features gradient backgrounds and shimmer animations for an engaging visual experience.",
    thumbnail: "",
    createdDate: "2026-10-14",
    week: 3,
    componentNumber: 4,
    category: "Progress",
    tags: ["Animation", "Progress", "Loading", "Visual Feedback", "Responsive"],
    dependencies: "React 18+",
    techStack: ["React", "TypeScript", "Tailwind CSS", "CSS Animations"],
    files: [
      {
        name: "ProgressIndicator.tsx",
        language: "typescript",
        content: `"use client";

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

      <div className={\`w-full bg-gray-200 rounded-full overflow-hidden \${heightClasses[height]}\`}>
        <div
          className={\`\${variantClasses[variant]} \${heightClasses[height]} rounded-full transition-all duration-300 ease-out shadow-lg\`}
          style={{ width: \`\${clampedPercentage}%\` }}
        >
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

      <style>{\`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      \`}</style>
    </div>
  );
}`,
      },
      {
        name: "index.ts",
        language: "typescript",
        content: `export { ProgressIndicator } from './ProgressIndicator'`,
      },
    ],
    prompt: `Create an animated progress indicator component in React with these features:
    - Display a progress bar that fills from 0-100%
    - Smooth animation when percentage changes
    - Support for multiple color variants (default: blue, success: green, warning: yellow, danger: red)
    - Gradient background on progress bar
    - Optional percentage label display
    - Customizable height (small, medium, large)
    - Shimmer/pulse animation on active progress
    - Optional label text above the progress bar
    - Smooth easing transitions
    - TypeScript with full prop typing
    - Responsive design that adapts to container width
    - Clamp percentage between 0-100`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink: "https://muntasir-lofistack-portfolio.vercel.app/components/progress-indicator",
    accessibility:
      "Semantic structure with proper labels. High contrast gradient colors. Percentage values displayed numerically and visually. ARIA labels for context. Clear visual indication of progress state.",
    relatedProps: [
      {
        name: "percentage",
        type: "number",
        default: "0",
        description: "Progress percentage (0-100)",
      },
      {
        name: "label",
        type: "string",
        default: "undefined",
        description: "Label text displayed above progress bar",
      },
      {
        name: "showPercentage",
        type: "boolean",
        default: "true",
        description: "Show percentage value on right side",
      },
      {
        name: "animated",
        type: "boolean",
        default: "true",
        description: "Enable smooth animation when percentage changes",
      },
      {
        name: "variant",
        type: '"default" | "success" | "warning" | "danger"',
        default: '"default"',
        description: "Color variant of progress bar",
      },
      {
        name: "height",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Height of progress bar",
      },
    ],
    features: [
      "Smooth animated progress bar",
      "Multiple color variants",
      "Gradient backgrounds",
      "Customizable heights",
      "Percentage label display",
      "Shimmer animation effect",
      "Responsive design",
      "No external dependencies",
      "TypeScript support",
      "Easing animations",
      "Perfect for uploads, downloads, loading",
      "Lightweight and performant",
    ],
  },
];

// Helper to get latest components (for homepage)
export const getLatestComponents = (limit: number = 4): Component[] => {
  return [...components]
    .sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    )
    .slice(0, limit);
};

// Helper to get component by slug
export const getComponentBySlug = (slug: string): Component | undefined => {
  return components.find((c) => c.slug === slug);
};
