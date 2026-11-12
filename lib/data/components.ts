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
  {
    id: "10",
    slug: "prompt-bar",
    name: "Prompt Bar",
    type: "input",
    description: "ChatGPT-style prompt input bar with suggestion prompts",
    longDescription:
      "A modern, interactive prompt input component inspired by ChatGPT's interface. Features a rounded input field with a submit button and a grid of 7 suggestion prompts below. Supports three responsive sizes (small, medium, large) with smooth animations and hover effects. Perfect for AI chat interfaces, search bars, or prompt-based applications. Includes keyboard support (Enter to submit), focus ring styling, and full accessibility features.",
    thumbnail: "",
    createdDate: "2026-10-14",
    week: 3,
    componentNumber: 5,
    category: "Input",
    tags: ["Input", "Prompt", "ChatGPT-style", "Suggestions", "Interactive"],
    dependencies: "React 18+",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    files: [
      {
        name: "PromptBar.tsx",
        language: "typescript",
        content: `"use client";

import { useState } from "react";

interface PromptBarProps {
  onSubmit?: (prompt: string) => void;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
}

const suggestions = [
  "Explain quantum computing",
  "Write a Python function",
  "Design a database schema",
  "Create a marketing plan",
  "Build a REST API",
  "Write a product brief",
  "Explain React hooks",
];

export function PromptBar({
  onSubmit,
  size = "md",
  placeholder = "Ask anything...",
}: PromptBarProps) {
  const [input, setInput] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(
    null
  );

  const sizeClasses = {
    sm: {
      container: "max-w-md",
      input: "text-sm py-2 px-3",
      button: "w-8 h-8",
      icon: "w-4 h-4",
      suggestionText: "text-xs",
      suggestionPadding: "px-2 py-1",
    },
    md: {
      container: "max-w-2xl",
      input: "text-base py-3 px-4",
      button: "w-10 h-10",
      icon: "w-5 h-5",
      suggestionText: "text-sm",
      suggestionPadding: "px-3 py-2",
    },
    lg: {
      container: "max-w-4xl",
      input: "text-lg py-4 px-5",
      button: "w-12 h-12",
      icon: "w-6 h-6",
      suggestionText: "text-base",
      suggestionPadding: "px-4 py-3",
    },
  };

  const classes = sizeClasses[size];

  const handleSubmit = (text: string) => {
    if (text.trim()) {
      onSubmit?.(text);
      setInput("");
      setSelectedSuggestion(null);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    handleSubmit(suggestion);
  };

  return (
    <div className={\`w-full flex flex-col items-center gap-4 \${classes.container}\`}>
      <div className="w-full">
        <div className="relative flex items-center gap-2 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(input);
              }
            }}
            placeholder={placeholder}
            className={\`flex-1 bg-transparent outline-none \${classes.input} placeholder-gray-400 text-gray-900\`}
          />

          <button
            onClick={() => handleSubmit(input)}
            disabled={!input.trim()}
            className={\`mr-2 flex items-center justify-center rounded-full transition-all duration-200 \${
              input.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer active:scale-95"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            } \${classes.button}\`}
            aria-label="Submit prompt"
          >
            <svg
              className={classes.icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className={\`group text-left bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 \${classes.suggestionPadding}\`}
            aria-label={\`Suggestion: \${suggestion}\`}
          >
            <div className="flex items-start gap-2">
              <svg
                className={\`flex-shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors \${classes.icon}\`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className={\`\${classes.suggestionText} text-gray-700 group-hover:text-gray-900 leading-snug\`}>
                {suggestion}
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedSuggestion && (
        <div className="text-xs text-gray-500 animate-pulse">
          Processing: "{selectedSuggestion}"
        </div>
      )}
    </div>
  );
}`,
      },
      {
        name: "index.ts",
        language: "typescript",
        content: `export { PromptBar } from './PromptBar'`,
      },
    ],
    prompt: `Create a ChatGPT-style prompt input bar component in React with these features:

Core Functionality:
- Text input field with placeholder text
- Submit button with send icon (↗)
- 7 suggestion prompts displayed in a grid below
- Enter key to submit (Shift+Enter for new line)
- Click suggestions to submit them

Visual Design:
- Rounded input container (border-radius: full)
- White background with light gray border
- Blue submit button (enabled only when text present)
- Shadow effects with hover state
- Suggestions as cards with icon and hover effects
- Lightning bolt icon on suggestion cards

Responsive Sizes:
- Small: max-w-md, text-sm
- Medium (default): max-w-2xl, text-base
- Large: max-w-4xl, text-lg
- Different font sizes and padding for each size

State Management:
- Track input value
- Track selected suggestion
- Disable submit button when input is empty
- Clear input after submit

Animations:
- Smooth shadow transition on hover
- Button scale down on active (active:scale-95)
- Focus ring on input (ring-2 ring-blue-400)
- Hover color change on suggestions

Accessibility:
- ARIA labels on buttons
- Focus ring visible on input
- Keyboard navigation (Enter to submit)
- Proper button disabled states
- aria-label on suggestion buttons`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink: "https://muntasir-lofistack-portfolio.vercel.app/components/prompt-bar",
    accessibility:
      "Semantic button elements with proper ARIA labels. Focus ring on input for keyboard navigation. Disabled state visual feedback. High contrast text on backgrounds. Touch-friendly buttons (40px minimum). Keyboard submit support with Enter key.",
    relatedProps: [
      {
        name: "onSubmit",
        type: "(prompt: string) => void",
        default: "undefined",
        description: "Callback function when prompt is submitted",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Component size",
      },
      {
        name: "placeholder",
        type: "string",
        default: '"Ask anything..."',
        description: "Input placeholder text",
      },
    ],
    features: [
      "ChatGPT-style rounded input design",
      "7 pre-built suggestion prompts",
      "Responsive sizes (small, medium, large)",
      "Submit button with send icon",
      "Hover and focus effects",
      "Enter key to submit",
      "Click suggestions to use them",
      "Smooth animations and transitions",
      "Fully keyboard accessible",
      "ARIA labels for screen readers",
      "TypeScript support",
      "Perfect for AI chat interfaces",
    ],
  },
  {
    id: "11",
    slug: "infinite-marquee",
    name: "Infinite Marquee",
    type: "animation",
    description: "Smooth infinite scrolling text animation with customizable speed and direction",
    longDescription:
      "A beautiful infinite marquee component that displays continuously scrolling text. Perfect for announcements, highlights, promotions, or any scrolling text needs. Features smooth animations, pause on hover, multiple speed options, bidirectional scrolling, and customizable colors. Responsive design with three size options.",
    thumbnail: "",
    createdDate: "2026-10-14",
    week: 3,
    componentNumber: 6,
    category: "Animation",
    tags: ["Animation", "Marquee", "Scrolling", "Text", "Highlight"],
    dependencies: "React 18+",
    techStack: ["React", "TypeScript", "Tailwind CSS", "CSS Animations"],
    files: [
      {
        name: "InfiniteMarquee.tsx",
        language: "typescript",
        content: `"use client";

interface InfiniteMarqueeProps {
  text: string;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  backgroundColor?: string;
  textColor?: string;
  size?: "sm" | "md" | "lg";
}

export function InfiniteMarquee({
  text,
  speed = "normal",
  direction = "left",
  backgroundColor = "bg-gray-900",
  textColor = "text-white",
  size = "md",
}: InfiniteMarqueeProps) {
  const speedMap = {
    slow: "120s",
    normal: "60s",
    fast: "30s",
  };

  const sizeClasses = {
    sm: "text-sm py-2",
    md: "text-xl py-4",
    lg: "text-3xl py-6",
  };

  const animationDirection = direction === "right" ? "reverse" : "normal";
  const animationDuration = speedMap[speed];

  return (
    <>
      <style>{\`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
        }

        .marquee-content {
          display: inline-block;
          animation: marquee \${animationDuration} linear infinite;
          animation-direction: \${animationDirection};
          padding-right: 50px;
        }

        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
      \`}</style>

      <div className={\`w-full \${backgroundColor} \${textColor} font-bold \${sizeClasses[size]} marquee-container\`}>
        <div className="marquee-content">
          {text} • {text} • {text} • {text} • {text} •
        </div>
      </div>
    </>
  );
}`,
      },
      {
        name: "index.ts",
        language: "typescript",
        content: `export { InfiniteMarquee } from './InfiniteMarquee'`,
      },
    ],
    prompt: `Create an infinite marquee scrolling text component in React with these features:

Core Functionality:
- Continuously scrolling text animation that loops infinitely
- Text repeats seamlessly for endless scrolling effect
- Pause animation on hover for better UX
- Smooth linear animation without jumpiness

Speed Options:
- Slow: 120 seconds per scroll
- Normal (default): 60 seconds per scroll
- Fast: 30 seconds per scroll

Directional Support:
- Left-to-Right (default): Text scrolls from right to left
- Right-to-Left: Text scrolls from left to right (reversed animation)

Size Options:
- Small: text-sm, py-2
- Medium (default): text-xl, py-4
- Large: text-3xl, py-6

Customization:
- Background color (accepts Tailwind classes)
- Text color (accepts Tailwind classes)
- Support for gradient backgrounds

Visual Design:
- Full width responsive container
- Overflow hidden to show smooth animation
- Proper spacing between repeated text (• separator)
- Bold font weight for emphasis

Animation Details:
- CSS keyframe animation (0% to 100% translateX)
- Linear timing function for consistent speed
- Animation direction reversal for right-to-left
- Pause on hover state for interactivity

Perfect for:
- Site announcements
- Promotional messages
- Featured highlights
- Stock tickers
- News feeds`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink: "https://muntasir-lofistack-portfolio.vercel.app/components/infinite-marquee",
    accessibility:
      "Text is readable with high contrast. Animation pauses on hover. Content is not hidden from screen readers. Multiple speed options for visibility preferences. Semantic markup with proper text alternatives.",
    relatedProps: [
      {
        name: "text",
        type: "string",
        default: "required",
        description: "Text content to scroll",
      },
      {
        name: "speed",
        type: '"slow" | "normal" | "fast"',
        default: '"normal"',
        description: "Scrolling speed",
      },
      {
        name: "direction",
        type: '"left" | "right"',
        default: '"left"',
        description: "Scroll direction",
      },
      {
        name: "backgroundColor",
        type: "string",
        default: '"bg-gray-900"',
        description: "Tailwind background color class",
      },
      {
        name: "textColor",
        type: "string",
        default: '"text-white"',
        description: "Tailwind text color class",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Text size",
      },
    ],
    features: [
      "Infinite smooth scrolling animation",
      "Three speed options (slow, normal, fast)",
      "Bidirectional scrolling (left/right)",
      "Pause on hover for better UX",
      "Three size options (small, medium, large)",
      "Customizable colors and backgrounds",
      "Seamless looping with repeating text",
      "Responsive full-width design",
      "Perfect for announcements",
      "TypeScript support",
      "No external animation libraries",
      "Lightweight and performant",
    ],
  },
  {
    id: "12",
    slug: "image-reveal-card",
    name: "Image Reveal Card",
    type: "card",
    description: "Image card with content overlay that slides up on hover or keyboard focus",
    longDescription:
      "An elegant image card component where a gradient overlay and content (title, description, action buttons) slide up smoothly on hover. The image zooms subtly for added depth. Fully keyboard accessible — the same reveal triggers on focus, so keyboard users get the identical experience. Perfect for portfolio grids, product showcases, team pages, and gallery layouts.",
    thumbnail: "",
    createdDate: "2026-11-12",
    week: 3,
    componentNumber: 7,
    category: "Card",
    tags: ["Card", "Hover Effect", "Image", "Overlay", "Animation", "Accessibility"],
    dependencies: "React 18+",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    files: [
      {
        name: "ImageRevealCard.tsx",
        language: "typescript",
        content: `"use client";

interface CardAction {
  label: string;
  onClick?: () => void;
}

interface ImageRevealCardProps {
  image: string;
  title: string;
  description?: string;
  category?: string;
  actions?: CardAction[];
}

export function ImageRevealCard({
  image,
  title,
  description,
  category,
  actions = [],
}: ImageRevealCardProps) {
  return (
    <div
      className="group relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-900"
      tabIndex={0}
      aria-label={\`\${title} card\`}
    >
      {/* Image with zoom effect */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-focus-within:scale-110 group-focus:scale-110"
      />

      {/* Gradient overlay — fades in on hover/focus */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-focus:opacity-100 transition-opacity duration-500" />

      {/* Category badge — always visible */}
      {category && (
        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold rounded-full">
          {category}
        </span>
      )}

      {/* Content — slides up on hover/focus */}
      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 group-focus:translate-y-0 transition-transform duration-500 ease-out">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

        {description && (
          <p className="text-sm text-gray-200 mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {actions.length > 0 && (
          <div className="flex gap-3">
            {actions.map((action) => (
              <button
                key={action.label}
                onClick={action.onClick}
                className="px-4 py-2 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-200 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}`,
      },
      {
        name: "index.ts",
        language: "typescript",
        content: `export { ImageRevealCard } from './ImageRevealCard'`,
      },
    ],
    prompt: `Create an image card with hover reveal component in React with these features:

Core Functionality:
- Full-bleed image fills the card (4:5 aspect ratio, rounded-2xl corners)
- On hover: gradient overlay fades in from the bottom
- On hover: content panel (title, description, action buttons) slides up from below
- On hover: image zooms in subtly (scale-110) for depth
- Optional category badge always visible at top-left
- Optional action buttons (white pills) inside the revealed panel

Keyboard Accessibility:
- Card is focusable (tabIndex=0) with a visible focus ring
- The SAME reveal animation triggers on keyboard focus (focus / focus-within),
  so keyboard users get the identical experience as mouse users
- Action buttons have their own focus rings and are reachable by Tab
- aria-label on the card, proper alt text on the image

Visual Design:
- Gradient overlay: from-black/90 via-black/40 to transparent
- White title text, light gray description with 2-line clamp
- Category badge: white semi-transparent with backdrop blur
- Action buttons: white rounded-full pills with hover and active:scale-95 states
- Smooth 500ms ease-out transitions on all animations

Props:
- image (required): image URL
- title (required): card heading
- description (optional): supporting text
- category (optional): badge label
- actions (optional): array of { label, onClick } buttons

TypeScript with full prop typing, Tailwind CSS only, no external libraries.`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink: "https://muntasir-lofistack-portfolio.vercel.app/components/image-reveal-card",
    accessibility:
      "Card is keyboard focusable (tabIndex=0) with visible focus ring, and the reveal animation triggers on focus as well as hover — keyboard users get the full experience. Proper alt text on images, aria-label on the card, focus rings on action buttons, and high-contrast white text over a dark gradient overlay.",
    relatedProps: [
      {
        name: "image",
        type: "string",
        default: "required",
        description: "URL of the card image",
      },
      {
        name: "title",
        type: "string",
        default: "required",
        description: "Card heading shown in the reveal panel",
      },
      {
        name: "description",
        type: "string",
        default: "undefined",
        description: "Supporting text (clamped to 2 lines)",
      },
      {
        name: "category",
        type: "string",
        default: "undefined",
        description: "Badge label shown at the top-left of the card",
      },
      {
        name: "actions",
        type: "{ label: string; onClick?: () => void }[]",
        default: "[]",
        description: "Action buttons rendered inside the reveal panel",
      },
    ],
    features: [
      "Content slides up smoothly on hover",
      "Identical reveal on keyboard focus (full a11y parity)",
      "Subtle image zoom effect (scale-110)",
      "Gradient overlay for text readability",
      "Optional always-visible category badge",
      "Configurable action buttons with press feedback",
      "2-line description clamp keeps layout tidy",
      "500ms ease-out transitions throughout",
      "Visible focus rings on card and buttons",
      "TypeScript support",
      "Tailwind CSS only — zero dependencies",
      "Perfect for portfolios, products, and galleries",
    ],
  },
  {
    id: "13",
    slug: "pixel-shatter-logo",
    name: "Pixel Shatter Logo",
    type: "animation",
    description: "Google logo shattered into pixels that smoothly assemble into shape on hover",
    longDescription:
      "An eye-catching animation component where the Google 'G' logo starts shattered into ~150 scattered, rotated pixels. On hover (or keyboard focus, or tap on touch devices), every pixel smoothly flies into its exact position to form the logo, each with a slightly different delay for an organic assembling effect. The G shape is generated mathematically (ring segments in the four Google colors plus the blue crossbar) — no image file needed. Scatter positions use a deterministic pseudo-random function so server and client render identically with zero hydration errors.",
    thumbnail: "",
    createdDate: "2026-11-12",
    week: 3,
    componentNumber: 8,
    category: "Animation",
    tags: ["Animation", "Pixels", "Logo", "Hover Effect", "Interactive", "Creative"],
    dependencies: "React 18+",
    techStack: ["React", "TypeScript", "Tailwind CSS", "CSS Transitions"],
    files: [
      {
        name: "PixelShatterLogo.tsx",
        language: "typescript",
        content: `"use client";

import { useMemo, useState } from "react";

interface PixelShatterLogoProps {
  size?: number; // container size in px
  spread?: number; // how far pixels scatter in px
}

const GRID = 21;

const COLORS = {
  blue: "#4285F4",
  red: "#EA4335",
  yellow: "#FBBC05",
  green: "#34A853",
};

// Deterministic pseudo-random (same result on server and client — avoids
// hydration mismatches that Math.random() would cause)
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

interface Pixel {
  col: number;
  row: number;
  color: string;
  tx: number;
  ty: number;
  rot: number;
  delay: number;
}

// Builds the Google "G" out of grid pixels: a 4-color ring with an opening
// on the upper right, plus the blue horizontal crossbar.
const buildPixels = (spread: number): Pixel[] => {
  const pixels: Pixel[] = [];
  const center = GRID / 2;
  const outer = 9.5;
  const inner = 6;
  let i = 0;

  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      const cx = col + 0.5;
      const cy = row + 0.5;
      const dx = cx - center;
      const dy = cy - center;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let color: string | null = null;

      if (dist >= inner && dist <= outer) {
        let angle = (Math.atan2(-dy, dx) * 180) / Math.PI;
        if (angle < 0) angle += 360;

        if (angle < 48) color = null; // the G's opening
        else if (angle < 135) color = COLORS.red;
        else if (angle < 225) color = COLORS.yellow;
        else if (angle < 318) color = COLORS.green;
        else color = COLORS.blue;
      }

      // Blue crossbar: from center to the right edge at middle height
      if (dx >= 0.5 && Math.abs(dy) <= 1.75 && dist <= outer) {
        color = COLORS.blue;
      }

      if (color) {
        pixels.push({
          col,
          row,
          color,
          tx: (pseudoRandom(i * 4 + 1) - 0.5) * spread * 2,
          ty: (pseudoRandom(i * 4 + 2) - 0.5) * spread * 2,
          rot: (pseudoRandom(i * 4 + 3) - 0.5) * 540,
          delay: pseudoRandom(i * 4 + 4) * 0.35,
        });
      }
      i++;
    }
  }

  return pixels;
};

export function PixelShatterLogo({
  size = 260,
  spread = 220,
}: PixelShatterLogoProps) {
  const [assembled, setAssembled] = useState(false);
  const pixels = useMemo(() => buildPixels(spread), [spread]);
  const cell = size / GRID;

  return (
    <div
      className="relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-blue-500 rounded-lg"
      style={{ width: size, height: size }}
      onMouseEnter={() => setAssembled(true)}
      onMouseLeave={() => setAssembled(false)}
      onFocus={() => setAssembled(true)}
      onBlur={() => setAssembled(false)}
      onTouchStart={() => setAssembled((a) => !a)}
      tabIndex={0}
      role="img"
      aria-label="Google logo assembling from scattered pixels on hover"
    >
      {pixels.map((p, idx) => (
        <span
          key={idx}
          className="absolute rounded-[2px]"
          style={{
            left: p.col * cell,
            top: p.row * cell,
            width: cell - 1,
            height: cell - 1,
            backgroundColor: p.color,
            transform: assembled
              ? "translate(0, 0) rotate(0deg) scale(1)"
              : \`translate(\${p.tx}px, \${p.ty}px) rotate(\${p.rot}deg) scale(0.5)\`,
            opacity: assembled ? 1 : 0.75,
            transition: \`transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) \${p.delay}s, opacity 0.8s ease \${p.delay}s\`,
          }}
        />
      ))}
    </div>
  );
}`,
      },
      {
        name: "index.ts",
        language: "typescript",
        content: `export { PixelShatterLogo } from './PixelShatterLogo'`,
      },
    ],
    prompt: `Create a pixel shatter logo animation component in React with these features:

Core Concept:
- The Google "G" logo rendered as a grid of small colored pixel squares (~150 pixels)
- Default state: pixels are SHATTERED — scattered randomly around the container
  with random offsets (translate), rotations (up to ±270°), reduced scale (0.5) and opacity (0.75)
- On hover: every pixel smoothly flies into its exact grid position to assemble the logo
- Each pixel has a slightly different transition delay (0–0.35s) for an organic,
  staggered assembling effect
- Smooth spring-like easing: cubic-bezier(0.22, 1, 0.36, 1) over 0.8s

Logo Generation (no image files):
- Generate the G shape mathematically on a 21x21 grid
- Ring: pixels between inner radius 6 and outer radius 9.5 from center
- Color ring segments by angle: red (top), yellow (left), green (bottom), blue (lower right)
- Leave a gap between 0° and 48° for the G's opening
- Add the blue horizontal crossbar from center to the right edge
- Official Google colors: #4285F4, #EA4335, #FBBC05, #34A853

Critical — SSR safety:
- Use a DETERMINISTIC pseudo-random function (sine-hash based on pixel index)
  instead of Math.random(), so the server and client render identical scatter
  positions and there are no Next.js hydration errors
- Memoize pixel generation with useMemo

Interaction & Accessibility:
- Hover to assemble, mouse leave to shatter again
- Keyboard: component is focusable (tabIndex=0); focus assembles, blur shatters
- Touch devices: tap toggles between shattered and assembled
- Visible focus ring (focus-visible:ring-2)
- role="img" with descriptive aria-label

Props:
- size (default 260): container size in px
- spread (default 220): how far pixels scatter in px

TypeScript, Tailwind CSS + inline styles for dynamic transforms, zero dependencies.`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink: "https://muntasir-lofistack-portfolio.vercel.app/components/pixel-shatter-logo",
    accessibility:
      "Fully keyboard operable: the component is focusable and the assemble animation triggers on focus, mirroring hover. Tap toggles the state on touch devices. Visible focus-visible ring, role='img' with a descriptive aria-label for screen readers. High-contrast brand colors on white background.",
    relatedProps: [
      {
        name: "size",
        type: "number",
        default: "260",
        description: "Width/height of the logo container in pixels",
      },
      {
        name: "spread",
        type: "number",
        default: "220",
        description: "Maximum distance pixels scatter from their position",
      },
    ],
    features: [
      "~150 pixels fly into place to form the Google G",
      "Staggered per-pixel delays for organic assembly",
      "Spring-like cubic-bezier easing (0.8s)",
      "Logo generated mathematically — no image files",
      "Official Google brand colors",
      "Deterministic scatter — zero hydration errors in Next.js",
      "Hover, keyboard focus, and touch tap all trigger the animation",
      "Random rotation + scale + opacity on shattered pixels",
      "Configurable size and scatter spread",
      "Visible focus ring for keyboard users",
      "TypeScript support",
      "Zero dependencies",
    ],
  },
  {
    id: "14",
    slug: "text-scramble",
    name: "Text Scramble",
    type: "animation",
    description: "Letters randomly scramble through glyphs before resolving into the original text",
    longDescription:
      "A 'hacker decode' style text animation where every letter cycles through random glyphs before resolving into the original text, left to right with organic randomness. Plays automatically on mount and replays on hover or keyboard focus. Respects prefers-reduced-motion (shows plain text instantly), keeps screen readers happy by exposing the stable text via aria-label while hiding the animated glyphs, and supports custom glyph sets (e.g. binary '01'), custom durations, and any Tailwind styling via className. Monospace font prevents layout shift while glyphs cycle.",
    thumbnail: "",
    createdDate: "2026-11-12",
    week: 3,
    componentNumber: 9,
    category: "Animation",
    tags: ["Animation", "Text Effect", "Scramble", "Decode", "Interactive", "Accessibility"],
    dependencies: "React 18+",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    files: [
      {
        name: "TextScramble.tsx",
        language: "typescript",
        content: `"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface TextScrambleProps {
  text: string;
  duration?: number; // total animation time in ms
  scrambleChars?: string; // glyph set used while scrambling
  replayOnHover?: boolean;
  className?: string;
}

const DEFAULT_GLYPHS = "!<>-_\\\\/[]{}=+*^?#@$%&";

export function TextScramble({
  text,
  duration = 1200,
  scrambleChars = DEFAULT_GLYPHS,
  replayOnHover = true,
  className = "",
}: TextScrambleProps) {
  // Initial render shows the real text — SSR-safe, scrambling starts client-side
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const stop = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const scramble = useCallback(() => {
    // Respect users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }

    stop();

    const totalFrames = Math.max(10, Math.floor(duration / 30));
    // Each letter resolves at its own frame: staggered left-to-right,
    // plus a random offset so the resolve order feels organic
    const resolveAt = text.split("").map(
      (_, i) =>
        Math.floor((i / text.length) * totalFrames * 0.6) +
        Math.floor(Math.random() * totalFrames * 0.4)
    );

    let frame = 0;
    intervalRef.current = window.setInterval(() => {
      frame++;
      const out = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (frame >= resolveAt[i]) return ch;
          return scrambleChars[
            Math.floor(Math.random() * scrambleChars.length)
          ];
        })
        .join("");

      setDisplay(out);

      if (frame >= totalFrames) {
        stop();
        setDisplay(text);
      }
    }, 30);
  }, [text, duration, scrambleChars]);

  useEffect(() => {
    scramble();
    return stop;
  }, [scramble]);

  return (
    <span
      className={\`inline-block font-mono outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 rounded \${className}\`}
      onMouseEnter={replayOnHover ? scramble : undefined}
      onFocus={replayOnHover ? scramble : undefined}
      tabIndex={replayOnHover ? 0 : undefined}
      aria-label={text}
    >
      {/* Screen readers get the stable text from aria-label above;
          the animated glyphs are hidden from them */}
      <span aria-hidden="true">{display}</span>
    </span>
  );
}`,
      },
      {
        name: "index.ts",
        language: "typescript",
        content: `export { TextScramble } from './TextScramble'`,
      },
    ],
    prompt: `Create a text scramble animation component in React with these features:

Core Effect:
- Letters randomly cycle through scramble glyphs (!<>-_/[]{}=+*^?#@$%&)
  before resolving into the original text
- Letters resolve left-to-right with a random per-letter offset so the
  decode order feels organic, not mechanical
- Runs at ~30ms per frame; total duration configurable (default 1200ms)
- Spaces are never scrambled (preserves word shape)
- Plays automatically on mount
- Replays on hover and on keyboard focus (optional via prop)

Implementation Details:
- setInterval-based frame loop stored in a ref, cleaned up on unmount
  and whenever a new scramble starts (no overlapping intervals)
- Per-letter resolve frame: (index / length) * 60% of frames + random 40%
- Initial render shows the real text so SSR output is deterministic —
  scrambling only starts client-side in useEffect (no hydration errors)
- Monospace font (font-mono) so cycling glyphs don't cause layout shift

Accessibility:
- Respects prefers-reduced-motion: shows plain text instantly, no animation
- aria-label on the wrapper exposes the stable final text to screen readers
- The animated glyph span is aria-hidden so screen readers never announce
  scramble garbage
- Focusable with a visible focus-visible ring when replay is enabled

Props:
- text (required): the text to reveal
- duration (default 1200): total animation time in ms
- scrambleChars (default glyph set): custom glyphs, e.g. "01" for binary style
- replayOnHover (default true): replay on hover/focus
- className: pass any Tailwind classes for size/color/weight

TypeScript, Tailwind CSS, zero dependencies.`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink: "https://muntasir-lofistack-portfolio.vercel.app/components/text-scramble",
    accessibility:
      "Respects prefers-reduced-motion by skipping the animation entirely. The stable final text is exposed via aria-label while the animated glyphs are aria-hidden, so screen readers never announce scramble characters. Keyboard users can Tab to the text to replay the effect, with a visible focus ring. Monospace rendering prevents layout shift.",
    relatedProps: [
      {
        name: "text",
        type: "string",
        default: "required",
        description: "The text that gets revealed",
      },
      {
        name: "duration",
        type: "number",
        default: "1200",
        description: "Total animation time in milliseconds",
      },
      {
        name: "scrambleChars",
        type: "string",
        default: '"!<>-_\\\\/[]{}=+*^?#@$%&"',
        description: "Glyph set used while scrambling (e.g. '01' for binary)",
      },
      {
        name: "replayOnHover",
        type: "boolean",
        default: "true",
        description: "Replay the animation on hover / keyboard focus",
      },
      {
        name: "className",
        type: "string",
        default: '""',
        description: "Extra Tailwind classes for size, color, and weight",
      },
    ],
    features: [
      "Hacker-style decode animation",
      "Letters resolve left-to-right with organic randomness",
      "Auto-plays on mount, replays on hover/focus",
      "Custom glyph sets (e.g. binary '01')",
      "Configurable duration",
      "Respects prefers-reduced-motion",
      "Screen-reader safe (stable aria-label, glyphs hidden)",
      "SSR-safe — no hydration errors",
      "No layout shift (monospace rendering)",
      "Clean interval cleanup on unmount",
      "Style via className — works at any size",
      "TypeScript support, zero dependencies",
    ],
  },
  {
    id: "15",
    slug: "liquid-morph",
    name: "Liquid Morph",
    type: "animation",
    description: "Text and logo glyphs melt into liquid and re-form as the next shape",
    longDescription:
      "A mesmerizing liquid morphing effect where words (or logo glyphs like ▲ ● ■ ★) melt into a gooey blob and re-form as the next item in the cycle. The magic is an SVG threshold filter (feColorMatrix alpha-contrast boost) applied over two cross-blurring text layers — instead of a plain crossfade, the blurred overlap fuses into sharp liquid goo. Runs on an infinite requestAnimationFrame loop with configurable melt and hold durations, cycles any list of words, respects prefers-reduced-motion, and announces stable text to screen readers.",
    thumbnail: "",
    createdDate: "2026-11-12",
    week: 3,
    componentNumber: 10,
    category: "Animation",
    tags: ["Animation", "Morph", "Liquid", "SVG Filter", "Text Effect", "Creative"],
    dependencies: "React 18+",
    techStack: ["React", "TypeScript", "Tailwind CSS", "SVG Filters"],
    files: [
      {
        name: "LiquidMorph.tsx",
        language: "typescript",
        content: `"use client";

import { useEffect, useId, useRef } from "react";

interface LiquidMorphProps {
  words: string[]; // texts/glyphs to morph between (cycles infinitely)
  morphTime?: number; // seconds the melt transition takes
  cooldownTime?: number; // seconds each word stays solid
  className?: string; // controls height, font size, color, weight
}

export function LiquidMorph({
  words,
  morphTime = 1,
  cooldownTime = 1.25,
  className = "",
}: LiquidMorphProps) {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  // useId can contain ":" which breaks url(#...) — strip to safe chars
  const filterId = \`liquid-\${useId().replace(/[^a-zA-Z0-9]/g, "")}\`;

  useEffect(() => {
    const t1 = text1Ref.current;
    const t2 = text2Ref.current;
    if (!t1 || !t2 || words.length === 0) return;

    // Reduced motion: show the first word statically, no melting
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      t2.textContent = words[0];
      t2.style.opacity = "100%";
      t2.style.filter = "none";
      t1.style.opacity = "0%";
      return;
    }

    let idx = 0;
    let morph = 0;
    let cooldown = cooldownTime;
    let raf = 0;
    let last = performance.now();

    t2.textContent = words[0];
    t2.style.opacity = "100%";
    t2.style.filter = "";
    t1.style.opacity = "0%";

    // The melt: outgoing text blurs away while incoming text sharpens.
    // The SVG threshold filter on the container turns the blurry overlap
    // into gooey liquid instead of a plain crossfade.
    const applyMorph = (f: number) => {
      t2.style.filter = \`blur(\${Math.min(8 / f - 8, 100)}px)\`;
      t2.style.opacity = \`\${Math.pow(f, 0.4) * 100}%\`;
      const inv = 1 - f;
      t1.style.filter = \`blur(\${Math.min(8 / inv - 8, 100)}px)\`;
      t1.style.opacity = \`\${Math.pow(inv, 0.4) * 100}%\`;
    };

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (cooldown > 0) {
        cooldown -= dt;
        if (cooldown <= 0) {
          // Start melting into the next word
          t1.textContent = words[idx % words.length];
          t2.textContent = words[(idx + 1) % words.length];
          morph = 0;
          applyMorph(0);
        } else {
          t2.style.filter = "";
          t2.style.opacity = "100%";
          t1.style.opacity = "0%";
        }
      } else {
        morph += dt;
        const f = Math.min(morph / morphTime, 1);
        applyMorph(f);
        if (f >= 1) {
          idx++;
          cooldown = cooldownTime;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [words, morphTime, cooldownTime]);

  return (
    <>
      {/* Threshold filter: boosts alpha contrast so blurred text edges
          merge into sharp liquid blobs */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={\`relative select-none \${className}\`}
        style={{ filter: \`url(#\${filterId})\` }}
        role="img"
        aria-label={\`Morphing text: \${words.join(", ")}\`}
      >
        <span
          ref={text1Ref}
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        />
        <span
          ref={text2Ref}
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          {words[0]}
        </span>
      </div>
    </>
  );
}`,
      },
      {
        name: "index.ts",
        language: "typescript",
        content: `export { LiquidMorph } from './LiquidMorph'`,
      },
    ],
    prompt: `Create a liquid morph text animation component in React with these features:

Core Effect:
- Words (or logo glyphs like ▲ ● ■ ★) MELT into a gooey liquid blob and
  re-form as the next word in the list, cycling infinitely
- NOT a plain crossfade — the outgoing and incoming text must visually fuse
  together like liquid during the transition

The Liquid Technique (no libraries):
- Two absolutely-positioned text layers stacked on top of each other
- During a morph, the outgoing layer blurs OUT (blur 0 → 100px) while the
  incoming layer blurs IN (blur 100px → 0), with opacity eased as pow(f, 0.4)
- An SVG threshold filter on the PARENT container makes the goo:
  feColorMatrix with values "1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 255 -140"
  — this boosts alpha contrast so the blurry overlap collapses into sharp
  liquid blobs instead of looking like a soft crossfade
- Blur formula per frame: blur = min(8 / fraction - 8, 100) px

Animation Loop:
- requestAnimationFrame loop with delta-time, cleaned up on unmount
- Two phases: morph (default 1s melt) and cooldown (default 1.25s solid hold)
- At the end of each cooldown, swap in the next pair of words and restart
- Direct DOM style manipulation via refs (no React re-renders per frame)

Technical Details:
- Unique SVG filter id per instance via useId (sanitize the ":" characters so
  url(#id) stays valid) — multiple instances can coexist on one page
- SSR-safe: first word rendered as static text on the server; the animation
  only starts client-side in useEffect
- Container styling (height, font size, color, weight) fully controlled via
  className prop — works for huge hero text or small accents

Accessibility:
- Respects prefers-reduced-motion: shows the first word statically
- role="img" with aria-label listing the words; animated layers aria-hidden
  so screen readers never hear mid-morph garbage
- select-none to prevent accidental text selection during animation

Props:
- words (required): string[] to cycle through
- morphTime (default 1): melt duration in seconds
- cooldownTime (default 1.25): how long each word stays solid
- className: Tailwind classes for size/color/weight

TypeScript, Tailwind CSS, zero dependencies.`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink: "https://muntasir-lofistack-portfolio.vercel.app/components/liquid-morph",
    accessibility:
      "Respects prefers-reduced-motion by rendering the first word statically with no animation. The container exposes a stable aria-label listing all words while the animated layers are aria-hidden, so screen readers never announce mid-morph characters. select-none prevents accidental selection; no interaction is required to view the effect.",
    relatedProps: [
      {
        name: "words",
        type: "string[]",
        default: "required",
        description: "Texts or glyphs to morph between (cycles infinitely)",
      },
      {
        name: "morphTime",
        type: "number",
        default: "1",
        description: "Duration of the melt transition in seconds",
      },
      {
        name: "cooldownTime",
        type: "number",
        default: "1.25",
        description: "How long each word stays solid between morphs",
      },
      {
        name: "className",
        type: "string",
        default: '""',
        description: "Tailwind classes controlling height, font size, color, weight",
      },
    ],
    features: [
      "True liquid melt — not a crossfade",
      "SVG threshold filter creates the gooey fusion",
      "Works with words AND logo glyphs (▲ ● ■ ★)",
      "Infinite cycle through any word list",
      "Configurable melt and hold durations",
      "requestAnimationFrame loop with delta-time",
      "Zero re-renders during animation (ref-driven)",
      "Multiple instances per page (unique filter ids)",
      "Respects prefers-reduced-motion",
      "Screen-reader safe (stable aria-label)",
      "SSR-safe — no hydration errors",
      "TypeScript support, zero dependencies",
    ],
  },
  {
    id: "16",
    slug: "spotlight-reveal",
    name: "Spotlight Reveal",
    type: "interaction",
    description: "Cursor acts like a flashlight that reveals hidden content in the dark",
    longDescription:
      "An interactive spotlight effect where the user's cursor becomes a flashlight sweeping across a dark area — hidden content only exists inside the light circle. Built with a CSS radial-gradient mask driven by CSS variables, updated through refs on mousemove so there are zero React re-renders while the light moves. Includes a soft warm glow that trails the cursor, touch support (drag to sweep the light), and full keyboard accessibility: focusing the area reveals everything, since keyboard users can't aim a cursor. Perfect for treasure hunts, 404 pages, easter eggs, and dramatic hero sections.",
    thumbnail: "",
    createdDate: "2026-11-13",
    week: 3,
    componentNumber: 11,
    category: "Interaction",
    tags: ["Interactive", "Spotlight", "Mask", "Hover Effect", "Creative", "Accessibility"],
    dependencies: "React 18+",
    techStack: ["React", "TypeScript", "Tailwind CSS", "CSS Masks"],
    files: [
      {
        name: "SpotlightReveal.tsx",
        language: "typescript",
        content: `"use client";

import { useRef, ReactNode } from "react";

interface SpotlightRevealProps {
  children: ReactNode; // the hidden content revealed by the flashlight
  hint?: string; // dim text shown while nothing is revealed
  radius?: number; // flashlight radius in px
  className?: string; // container sizing (height etc.)
}

export function SpotlightReveal({
  children,
  hint = "🔦 Move your cursor to explore the dark…",
  radius = 130,
  className = "",
}: SpotlightRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const setSpot = (x: number, y: number, r: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--spot-x", \`\${x}px\`);
    el.style.setProperty("--spot-y", \`\${y}px\`);
    el.style.setProperty("--spot-r", \`\${r}px\`);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot(e.clientX - rect.left, e.clientY - rect.top, radius);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || e.touches.length === 0) return;
    const t = e.touches[0];
    setSpot(t.clientX - rect.left, t.clientY - rect.top, radius);
  };

  const hide = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--spot-r", "0px");
  };

  // Keyboard users can't aim a cursor — focus reveals everything
  const revealAll = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--spot-x", "50%");
    el.style.setProperty("--spot-y", "50%");
    el.style.setProperty("--spot-r", "2000px");
  };

  const maskStyle = {
    WebkitMaskImage:
      "radial-gradient(circle var(--spot-r, 0px) at var(--spot-x, 50%) var(--spot-y, 50%), black 40%, transparent 100%)",
    maskImage:
      "radial-gradient(circle var(--spot-r, 0px) at var(--spot-x, 50%) var(--spot-y, 50%), black 40%, transparent 100%)",
  };

  return (
    <div
      ref={containerRef}
      className={\`relative overflow-hidden rounded-2xl bg-gray-950 cursor-none select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400 \${className}\`}
      onMouseMove={handleMouseMove}
      onMouseLeave={hide}
      onTouchMove={handleTouchMove}
      onTouchEnd={hide}
      onFocus={revealAll}
      onBlur={hide}
      tabIndex={0}
      role="group"
      aria-label="Spotlight reveal area — focus to reveal the hidden content"
    >
      {/* Dim hint layer — what you see in the dark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-gray-600 text-sm md:text-base">{hint}</p>
      </div>

      {/* Hidden layer — only visible inside the flashlight circle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={maskStyle}
      >
        {children}
      </div>

      {/* Soft flashlight glow following the cursor */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle calc(var(--spot-r, 0px) * 1.2) at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255, 240, 180, 0.12), transparent 70%)",
        }}
      />
    </div>
  );
}`,
      },
      {
        name: "index.ts",
        language: "typescript",
        content: `export { SpotlightReveal } from './SpotlightReveal'`,
      },
    ],
    prompt: `Create a spotlight reveal component in React where the cursor acts like a
flashlight revealing hidden content:

Core Effect:
- A dark container where hidden content is completely invisible by default
- The user's cursor becomes a flashlight: content only appears inside a
  circular spotlight that follows the mouse
- A dim hint message ("Move your cursor to explore the dark…") shows in the
  dark so users know to interact
- A soft warm glow (radial-gradient, ~rgba(255,240,180,0.12)) trails the
  cursor at 1.2x the spotlight radius for a realistic flashlight feel
- When the mouse leaves, the spotlight collapses to 0 and everything hides

The Masking Technique (no libraries):
- The hidden layer uses a CSS mask:
  mask-image: radial-gradient(circle var(--spot-r) at var(--spot-x) var(--spot-y),
  black 40%, transparent 100%) — include the -webkit- prefix
- The spotlight position/radius live in CSS variables (--spot-x, --spot-y,
  --spot-r) updated via element.style.setProperty on mousemove through a ref —
  ZERO React re-renders while the light moves
- Spotlight radius configurable via prop (default 130px)

Interaction Support:
- Mouse: spotlight follows cursor, cursor-none for immersion
- Touch: drag finger to sweep the light (touchmove), hide on touchend
- Keyboard: the container is focusable (tabIndex=0) and focusing it reveals
  the ENTIRE hidden layer (radius expands to 2000px), because keyboard users
  can't aim a cursor — blur hides it again
- Visible focus-visible ring on the container

Component API:
- children: any hidden content (full layout freedom)
- hint: customizable dim hint text
- radius: flashlight size in px
- className: container sizing

Accessibility:
- role="group" with an aria-label explaining focus reveals the content
- Focus = full reveal (keyboard parity with mouse exploration)
- select-none and pointer-events handled so layers don't trap clicks

TypeScript, Tailwind CSS, zero dependencies.`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink: "https://muntasir-lofistack-portfolio.vercel.app/components/spotlight-reveal",
    accessibility:
      "Keyboard users get full parity: focusing the container reveals the entire hidden layer (since a cursor can't be aimed by keyboard), with a visible focus ring, and blur re-hides it. Touch users sweep the light by dragging. role='group' with a descriptive aria-label explains the interaction. The hint text guides discovery for all users.",
    relatedProps: [
      {
        name: "children",
        type: "ReactNode",
        default: "required",
        description: "The hidden content revealed by the flashlight",
      },
      {
        name: "hint",
        type: "string",
        default: '"🔦 Move your cursor to explore the dark…"',
        description: "Dim text shown while nothing is revealed",
      },
      {
        name: "radius",
        type: "number",
        default: "130",
        description: "Flashlight radius in pixels",
      },
      {
        name: "className",
        type: "string",
        default: '""',
        description: "Tailwind classes for container sizing (height, width)",
      },
    ],
    features: [
      "Cursor becomes a flashlight revealing hidden content",
      "CSS radial-gradient mask — no canvas, no libraries",
      "Soft warm glow trails the cursor",
      "Zero React re-renders while the light moves (CSS vars + refs)",
      "Touch support — drag to sweep the light",
      "Keyboard focus reveals everything (full a11y parity)",
      "Customizable flashlight radius",
      "Customizable hint text",
      "Accepts any children as hidden content",
      "Spotlight collapses when the mouse leaves",
      "Perfect for easter eggs, 404 pages, hero sections",
      "TypeScript support, zero dependencies",
    ],
  },
  {
    id: "17",
    slug: "magnetic-elements",
    name: "Magnetic Elements",
    type: "interaction",
    description: "Letters, icons and buttons get pulled toward the cursor and spring back elastically",
    longDescription:
      "A reusable magnetic wrapper that makes any element — buttons, icons, even individual letters — get physically pulled toward the cursor as it moves nearby, then spring back to center with an elastic overshoot when the cursor leaves. The pull strength is configurable per element, and the hover zone can be padded so the magnetism starts before the cursor touches the element itself. Styles are driven directly through refs (zero React re-renders per mousemove), wrapped elements keep their own semantics and focus behavior, and the effect disables itself for users who prefer reduced motion.",
    thumbnail: "",
    createdDate: "2026-11-13",
    week: 3,
    componentNumber: 12,
    category: "Interaction",
    tags: ["Interactive", "Magnetic", "Hover Effect", "Micro-interaction", "Buttons", "Creative"],
    dependencies: "React 18+",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    files: [
      {
        name: "MagneticElement.tsx",
        language: "typescript",
        content: `"use client";

import { useRef, ReactNode } from "react";

interface MagneticElementProps {
  children: ReactNode; // anything: buttons, icons, letters
  strength?: number; // 0–1, how strongly it follows the cursor
  className?: string; // extra classes on the hover zone (e.g. padding)
}

export function MagneticElement({
  children,
  strength = 0.4,
  className = "",
}: MagneticElementProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    // Respect users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = wrap.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    // Short transition while following smooths out pointer jitter
    inner.style.transition = "transform 0.15s ease-out";
    inner.style.transform = \`translate(\${dx * strength}px, \${dy * strength}px)\`;
  };

  const handleMouseLeave = () => {
    const inner = innerRef.current;
    if (!inner) return;

    // Springy elastic snap back to center
    inner.style.transition =
      "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
    inner.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={wrapRef}
      className={\`inline-block \${className}\`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} className="inline-block will-change-transform">
        {children}
      </div>
    </div>
  );
}`,
      },
      {
        name: "index.ts",
        language: "typescript",
        content: `export { MagneticElement } from './MagneticElement'`,
      },
    ],
    prompt: `Create a magnetic element wrapper component in React where letters, icons
and buttons get pulled toward the cursor:

Core Effect:
- Wrap ANY element (button, icon, single letter) to make it magnetic
- As the cursor moves inside the hover zone, the element translates toward
  the cursor: offset = (cursor - element center) * strength
- Strength configurable per element (0–1, default 0.4)
- When the cursor leaves, the element springs back to center with an
  elastic overshoot: cubic-bezier(0.34, 1.56, 0.64, 1) over 0.5s
- While following, use a short 0.15s ease-out transition so pointer jitter
  is smoothed into fluid motion

Architecture:
- Two-layer structure: an outer wrapper acts as the hover/tracking zone,
  an inner layer receives the transform — padding on the wrapper (via
  className) widens the magnetic field so attraction starts BEFORE the
  cursor touches the element
- Styles driven directly via refs (element.style.transform) —
  ZERO React re-renders per mousemove
- will-change-transform for GPU compositing
- getBoundingClientRect per move for accurate centers in any layout

Composability:
- children: ReactNode — works with buttons (which keep their own focus
  rings, click handlers and semantics), emoji icons, or split text where
  every letter is wrapped individually for a magnetic headline
- className prop controls the hover zone size (e.g. p-2 for letters,
  p-6 for buttons)

Accessibility:
- Purely decorative motion: wrapped interactive elements keep full keyboard
  operability and their own focus styles
- Respects prefers-reduced-motion — the pull effect is skipped entirely

Demo should show three use cases: a headline where each letter is
individually magnetic, a row of magnetic emoji icons, and two magnetic
buttons with different colors.

TypeScript, Tailwind CSS, zero dependencies.`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink: "https://muntasir-lofistack-portfolio.vercel.app/components/magnetic-elements",
    accessibility:
      "The magnetism is purely decorative: wrapped buttons and links keep their full semantics, click handlers, keyboard operability and visible focus rings. The effect respects prefers-reduced-motion by disabling the pull entirely. No content is hidden or moved out of reach — elements always spring back to their resting position.",
    relatedProps: [
      {
        name: "children",
        type: "ReactNode",
        default: "required",
        description: "The element to make magnetic (button, icon, letter, etc.)",
      },
      {
        name: "strength",
        type: "number",
        default: "0.4",
        description: "How strongly the element follows the cursor (0–1)",
      },
      {
        name: "className",
        type: "string",
        default: '""',
        description: "Classes for the hover zone — padding widens the magnetic field",
      },
    ],
    features: [
      "Make any element magnetic — buttons, icons, letters",
      "Elements pulled toward the cursor in real time",
      "Elastic spring-back with overshoot on mouse leave",
      "Configurable pull strength per element",
      "Padded hover zones extend the magnetic field",
      "Zero React re-renders (ref-driven transforms)",
      "GPU-composited via will-change-transform",
      "Wrapped elements keep their own semantics and focus",
      "Respects prefers-reduced-motion",
      "Per-letter magnetic headlines supported",
      "TypeScript support",
      "Zero dependencies",
    ],
  },
  {
    id: "18",
    slug: "magnifying-lens",
    name: "Magnifying Lens",
    type: "interaction",
    description: "Cursor becomes a magnifying glass that zooms into text or images",
    longDescription:
      "A realistic magnifying glass effect where a circular lens follows the cursor, showing a zoomed view of whatever sits beneath it — works on images, text, or any React children. The technique: the content is rendered twice, and the second copy lives inside a clipped circle, scaled up and translated each frame so the point under the cursor lands exactly at the lens center. No canvas, no screenshots, no libraries. Includes touch support (drag to move the lens) and a full keyboard mode: focus the area and steer the lens with arrow keys, Escape hides it. All updates are ref-driven with zero React re-renders.",
    thumbnail: "",
    createdDate: "2026-11-13",
    week: 3,
    componentNumber: 13,
    category: "Interaction",
    tags: ["Interactive", "Magnifier", "Zoom", "Lens", "Hover Effect", "Accessibility"],
    dependencies: "React 18+",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    files: [
      {
        name: "MagnifyingLens.tsx",
        language: "typescript",
        content: `"use client";

import { useRef, ReactNode } from "react";

interface MagnifyingLensProps {
  children: ReactNode; // content to magnify (text, images, anything)
  zoom?: number; // magnification factor
  lensSize?: number; // lens diameter in px
  className?: string;
}

export function MagnifyingLens({
  children,
  zoom = 2,
  lensSize = 160,
  className = "",
}: MagnifyingLensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  // Place the lens at local coordinates (x, y) inside the container.
  // The clone is translated so the magnified point sits at the lens center.
  const place = (x: number, y: number) => {
    const container = containerRef.current;
    const lens = lensRef.current;
    const clone = cloneRef.current;
    if (!container || !lens || !clone) return;

    const rect = container.getBoundingClientRect();
    const cx = Math.max(0, Math.min(rect.width, x));
    const cy = Math.max(0, Math.min(rect.height, y));
    posRef.current = { x: cx, y: cy };
    const r = lensSize / 2;

    lens.style.left = \`\${cx - r}px\`;
    lens.style.top = \`\${cy - r}px\`;
    lens.style.opacity = "1";

    clone.style.width = \`\${rect.width}px\`;
    clone.style.height = \`\${rect.height}px\`;
    clone.style.transform = \`translate(\${r - cx * zoom}px, \${r - cy * zoom}px) scale(\${zoom})\`;
  };

  const hide = () => {
    const lens = lensRef.current;
    if (lens) lens.style.opacity = "0";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    place(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || e.touches.length === 0) return;
    const t = e.touches[0];
    place(t.clientX - rect.left, t.clientY - rect.top);
  };

  // Keyboard users move the lens with arrow keys after focusing
  const handleFocus = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    place(rect.width / 2, rect.height / 2);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 20;
    let { x, y } = posRef.current;

    if (e.key === "ArrowLeft") x -= step;
    else if (e.key === "ArrowRight") x += step;
    else if (e.key === "ArrowUp") y -= step;
    else if (e.key === "ArrowDown") y += step;
    else if (e.key === "Escape") {
      hide();
      return;
    } else return;

    e.preventDefault();
    place(x, y);
  };

  return (
    <div
      ref={containerRef}
      className={\`relative cursor-none select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-lg \${className}\`}
      onMouseMove={handleMouseMove}
      onMouseLeave={hide}
      onTouchMove={handleTouchMove}
      onTouchEnd={hide}
      onFocus={handleFocus}
      onBlur={hide}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="group"
      aria-label="Magnifier area — focus and use arrow keys to move the lens, Escape to hide it"
    >
      {/* The original content */}
      {children}

      {/* The lens: a clipped circle containing a scaled clone of the content */}
      <div
        ref={lensRef}
        className="absolute rounded-full overflow-hidden border-[3px] border-white bg-white shadow-2xl ring-1 ring-black/20 pointer-events-none opacity-0 transition-opacity duration-200 z-10"
        style={{ width: lensSize, height: lensSize }}
        aria-hidden="true"
      >
        <div ref={cloneRef} className="absolute top-0 left-0 origin-top-left">
          {children}
        </div>
      </div>
    </div>
  );
}`,
      },
      {
        name: "index.ts",
        language: "typescript",
        content: `export { MagnifyingLens } from './MagnifyingLens'`,
      },
    ],
    prompt: `Create a magnifying lens component in React where the cursor becomes a
magnifying glass over text or images:

Core Effect:
- A circular lens follows the cursor over the content
- Inside the lens, the content appears magnified (configurable zoom factor)
- The magnified point always matches the exact point under the cursor
- Lens fades in on enter, fades out on leave (opacity transition 200ms)
- Realistic lens styling: white border (3px), ring shadow, drop shadow

The Clone Technique (no canvas, no libraries):
- Render the children TWICE: once as the visible content, once inside the
  lens — a rounded-full, overflow-hidden circle
- The clone is sized to exactly match the container (width/height set from
  getBoundingClientRect on every move)
- The clone has transform-origin: 0 0 and per-frame transform:
  translate(lensRadius - x*zoom, lensRadius - y*zoom) scale(zoom)
  — this maps the content point (x, y) precisely to the lens center
- Lens position clamped to the container bounds
- All updates via refs and element.style — ZERO React re-renders per move

Interaction Support:
- Mouse: lens follows the cursor, cursor-none for immersion
- Touch: drag a finger to move the lens, hide on touchend
- Keyboard: focus the area → lens appears at center; arrow keys move it in
  20px steps; Escape hides it (full keyboard parity with mouse)
- Visible focus-visible ring on the container

Component API:
- children: ReactNode — anything magnifiable (images, fine-print text, cards)
- zoom (default 2): magnification factor
- lensSize (default 160): lens diameter in px
- className: container styling

Accessibility:
- role="group" with aria-label explaining keyboard controls
- The lens itself is aria-hidden (it duplicates content) and
  pointer-events-none so it never blocks interaction
- Keyboard-operable lens — arrow keys + Escape

Demo should show two use cases: an image magnifier (inspect photo details)
and a fine-print text block that needs the lens to be readable.

TypeScript, Tailwind CSS, zero dependencies.`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink: "https://muntasir-lofistack-portfolio.vercel.app/components/magnifying-lens",
    accessibility:
      "Full keyboard parity: focusing the area shows the lens at center, arrow keys steer it in 20px steps, and Escape hides it — with a visible focus ring. The duplicated lens content is aria-hidden so screen readers only encounter the content once, and the lens is pointer-events-none so it never blocks interaction. Touch users drag to move the lens.",
    relatedProps: [
      {
        name: "children",
        type: "ReactNode",
        default: "required",
        description: "The content to magnify (images, text, any JSX)",
      },
      {
        name: "zoom",
        type: "number",
        default: "2",
        description: "Magnification factor inside the lens",
      },
      {
        name: "lensSize",
        type: "number",
        default: "160",
        description: "Lens diameter in pixels",
      },
      {
        name: "className",
        type: "string",
        default: '""',
        description: "Extra Tailwind classes for the container",
      },
    ],
    features: [
      "Cursor becomes a real magnifying glass",
      "Works on images AND text — any React children",
      "Clone + transform technique, no canvas",
      "Magnified point always matches the cursor exactly",
      "Configurable zoom factor and lens size",
      "Keyboard mode: arrow keys steer the lens, Esc hides",
      "Touch support — drag to move the lens",
      "Zero React re-renders (ref-driven updates)",
      "Lens clamped to container bounds",
      "Realistic glass styling with border and shadows",
      "Screen-reader safe (clone is aria-hidden)",
      "TypeScript support, zero dependencies",
    ],
  },
  {
    id: "19",
    slug: "crumpled-paper",
    name: "Crumpled Paper",
    type: "animation",
    description: "Image folds into a crumpled paper ball on click and unfolds again",
    longDescription:
      "A playful 3D effect where an image crumples into a paper ball and smooths back out on click. The image is sliced into a grid of background-position tiles; when crumpling, every tile flies toward the center with random 3D rotations (rotate, rotateX, rotateY), shrinks, and dims with random brightness — faking the creases and shadows of real crumpled paper. Distance-based delays make the edges fold in first, just like a real sheet, and a soft shadow fades in under the ball. Toggled by click, tap, or Enter/Space with proper button semantics. All randomness is deterministic (sine-hash), so SSR output matches the client exactly.",
    thumbnail: "",
    createdDate: "2026-11-13",
    week: 7,
    componentNumber: 14,
    category: "Animation",
    tags: ["Animation", "3D", "Crumple", "Image Effect", "Interactive", "Creative"],
    dependencies: "React 18+",
    techStack: ["React", "TypeScript", "Tailwind CSS", "CSS 3D Transforms"],
    files: [
      {
        name: "CrumpledPaper.tsx",
        language: "typescript",
        content: `"use client";

import { useEffect, useMemo, useState } from "react";

interface CrumpledPaperProps {
  src: string; // image URL
  alt: string; // image description
  width?: number; // px
  height?: number; // px
  grid?: number; // tiles per side (grid x grid)
}

// Deterministic pseudo-random — identical on server and client,
// so SSR markup matches and there are no hydration errors
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

interface Tile {
  col: number;
  row: number;
  tx: number;
  ty: number;
  rot: number;
  rotX: number;
  rotY: number;
  scale: number;
  bright: number;
  delay: number;
}

const buildTiles = (grid: number, width: number, height: number): Tile[] => {
  const tiles: Tile[] = [];
  const tw = width / grid;
  const th = height / grid;
  const cx = width / 2;
  const cy = height / 2;
  const maxD = Math.hypot(cx, cy);
  const ballRadius = Math.min(width, height) * 0.18;
  let i = 0;

  for (let row = 0; row < grid; row++) {
    for (let col = 0; col < grid; col++) {
      const tileCx = col * tw + tw / 2;
      const tileCy = row * th + th / 2;
      // Each tile gets a spot inside the "paper ball" cluster at the center
      const angle = pseudoRandom(i * 7 + 1) * Math.PI * 2;
      const rad = Math.sqrt(pseudoRandom(i * 7 + 2)) * ballRadius;
      const d = Math.hypot(tileCx - cx, tileCy - cy);

      tiles.push({
        col,
        row,
        tx: cx - tileCx + Math.cos(angle) * rad,
        ty: cy - tileCy + Math.sin(angle) * rad,
        rot: (pseudoRandom(i * 7 + 3) - 0.5) * 160,
        rotX: (pseudoRandom(i * 7 + 4) - 0.5) * 140,
        rotY: (pseudoRandom(i * 7 + 5) - 0.5) * 140,
        scale: 0.25 + pseudoRandom(i * 7 + 6) * 0.2,
        // Random brightness fakes the creases and shadows of crumpled paper
        bright: 0.55 + pseudoRandom(i * 7 + 7) * 0.5,
        // Edges fold in first, center last — like a real crumple
        delay: (1 - d / maxD) * 0.25,
      });
      i++;
    }
  }

  return tiles;
};

export function CrumpledPaper({
  src,
  alt,
  width = 420,
  height = 280,
  grid = 10,
}: CrumpledPaperProps) {
  const [crumpled, setCrumpled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const tiles = useMemo(
    () => buildTiles(grid, width, height),
    [grid, width, height]
  );
  const tw = width / grid;
  const th = height / grid;

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const toggle = () => setCrumpled((c) => !c);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className="relative cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-amber-500 rounded-lg"
      style={{ width, height, perspective: 900 }}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={crumpled}
      aria-label={\`\${alt} — press to \${crumpled ? "unfold" : "crumple"} the image\`}
    >
      {/* Soft shadow under the paper ball */}
      <div
        className="absolute left-1/2 bottom-6 -translate-x-1/2 w-1/3 h-5 bg-black/30 rounded-full blur-md transition-opacity duration-700 pointer-events-none"
        style={{ opacity: crumpled ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* The image, sliced into grid x grid tiles */}
      <div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        aria-hidden="true"
      >
        {tiles.map((t, idx) => (
          <div
            key={idx}
            className="absolute"
            style={{
              left: t.col * tw,
              top: t.row * th,
              width: tw + 0.5,
              height: th + 0.5,
              backgroundImage: \`url(\${src})\`,
              backgroundSize: \`\${width}px \${height}px\`,
              backgroundPosition: \`-\${t.col * tw}px -\${t.row * th}px\`,
              borderRadius: crumpled ? "30%" : "0%",
              filter: crumpled ? \`brightness(\${t.bright})\` : "brightness(1)",
              transform: crumpled
                ? \`translate3d(\${t.tx}px, \${t.ty}px, 0) rotate(\${t.rot}deg) rotateX(\${t.rotX}deg) rotateY(\${t.rotY}deg) scale(\${t.scale})\`
                : "none",
              transition: reduceMotion
                ? "none"
                : \`transform 0.9s cubic-bezier(0.65, 0, 0.35, 1) \${t.delay}s, filter 0.9s ease \${t.delay}s, border-radius 0.9s ease \${t.delay}s\`,
            }}
          />
        ))}
      </div>
    </div>
  );
}`,
      },
      {
        name: "index.ts",
        language: "typescript",
        content: `export { CrumpledPaper } from './CrumpledPaper'`,
      },
    ],
    prompt: `Create a crumpled paper animation component in React where an image folds
into a crumpled paper ball and unfolds again:

Core Effect:
- An image that, on click, crumples into a paper ball at the center of its
  container — and smooths back out flat on the next click
- The crumple must look physical: pieces fold inward with 3D rotations,
  the ball has visible "creases", and a soft shadow appears beneath it
- Edges fold in FIRST, center last — like a real sheet of paper being
  crushed in a fist (distance-based transition delays)

The Tile Technique (no WebGL, no libraries):
- Slice the image into a grid of tiles (default 10x10 = 100 divs), each
  showing its slice via background-image + background-size (full image
  dimensions) + negative background-position
- Crumpled state per tile:
  * translate3d toward the container center, plus a random offset within a
    ball radius (~18% of the smaller dimension) — sqrt-distributed so tiles
    fill the ball evenly
  * random rotate (±80°), rotateX (±70°), rotateY (±70°) under a 900px
    perspective with preserve-3d for real 3D depth
  * scale down to 0.25–0.45
  * random brightness 0.55–1.05 — this fakes the creases and self-shadows
    of crumpled paper
  * border-radius morphs to 30% so the ball silhouette looks rounded
- Flat state: transform none, brightness 1, square corners
- Transition: 0.9s cubic-bezier(0.65, 0, 0.35, 1) with per-tile delay
  (1 - distanceFromCenter/maxDistance) * 0.25s
- A blurred shadow ellipse fades in under the ball while crumpled

SSR Safety:
- All per-tile randomness uses a DETERMINISTIC sine-hash pseudo-random
  function seeded by tile index — never Math.random() — so server and
  client markup match exactly (no Next.js hydration errors)
- Tile data memoized with useMemo

Interaction & Accessibility:
- Click or tap toggles crumple/unfold
- Keyboard: Enter and Space toggle (with preventDefault on Space),
  role="button", aria-pressed reflects the state, visible focus ring
- aria-label describes the action ("press to crumple/unfold the image")
- Tiles are aria-hidden; the accessible name carries the image description
- Respects prefers-reduced-motion: state still toggles but transitions are
  disabled (instant switch)

Props:
- src (required): image URL
- alt (required): image description for the accessible label
- width (default 420), height (default 280): container size in px
- grid (default 10): tiles per side

TypeScript, Tailwind CSS + inline styles for per-tile transforms, zero
dependencies.`,
    codeLink: "https://github.com/mun7594/muntasir.lofistack.portfolio",
    liveLink: "https://muntasir-lofistack-portfolio.vercel.app/components/crumpled-paper",
    accessibility:
      "Proper button semantics: role='button' with aria-pressed state, Enter/Space keyboard toggling, and a visible focus ring. The aria-label carries the image description and the available action. Decorative tiles are aria-hidden. Respects prefers-reduced-motion by disabling transitions — the toggle still works, it just switches instantly.",
    relatedProps: [
      {
        name: "src",
        type: "string",
        default: "required",
        description: "URL of the image to crumple",
      },
      {
        name: "alt",
        type: "string",
        default: "required",
        description: "Image description used in the accessible label",
      },
      {
        name: "width",
        type: "number",
        default: "420",
        description: "Container width in pixels",
      },
      {
        name: "height",
        type: "number",
        default: "280",
        description: "Container height in pixels",
      },
      {
        name: "grid",
        type: "number",
        default: "10",
        description: "Tiles per side (grid x grid total pieces)",
      },
    ],
    features: [
      "Image crumples into a 3D paper ball on click",
      "Unfolds back to a flat image on the next click",
      "Edges fold in first via distance-based delays",
      "Real 3D: rotateX/rotateY under perspective with preserve-3d",
      "Random brightness fakes paper creases and shadows",
      "Soft drop shadow fades in under the ball",
      "100 tiles sliced with background-position — no WebGL",
      "Deterministic randomness — zero hydration errors",
      "Click, tap, Enter and Space all toggle the effect",
      "aria-pressed button semantics + focus ring",
      "Respects prefers-reduced-motion",
      "TypeScript support, zero dependencies",
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
