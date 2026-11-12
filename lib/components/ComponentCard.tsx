import Link from "next/link";
import { Component } from "@/lib/data/components";

interface ComponentCardProps {
  component: Component;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  const formattedDate = new Date(component.createdDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <Link href={`/components/${component.slug}`}>
      <div className="group cursor-pointer h-full">
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:border-gray-400 hover:shadow-lg hover:scale-105 h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {component.slug === "before-after-slider" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">Before After</p>
                <p className="text-gray-600 text-sm">Slider</p>
              </div>
            ) : component.slug === "submit-form-button" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">Flip Animated</p>
                <p className="text-gray-600 text-sm">Button</p>
              </div>
            ) : component.slug === "star-rating" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">⭐⭐⭐⭐⭐</p>
                <p className="text-gray-600 text-sm">Star Rating</p>
              </div>
            ) : component.slug === "progress-indicator" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">Progress Bar</p>
                <p className="text-gray-600 text-sm">Indicator</p>
              </div>
            ) : component.slug === "prompt-bar" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">💬</p>
                <p className="text-gray-600 text-sm">Prompt Bar</p>
              </div>
            ) : component.slug === "infinite-marquee" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">→ → →</p>
                <p className="text-gray-600 text-sm">Marquee</p>
              </div>
            ) : component.slug === "image-reveal-card" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">🖼️</p>
                <p className="text-gray-600 text-sm">Hover Reveal Card</p>
              </div>
            ) : component.slug === "pixel-shatter-logo" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">🧩</p>
                <p className="text-gray-600 text-sm">Pixel Shatter Logo</p>
              </div>
            ) : component.slug === "text-scramble" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg font-mono">{"!<>_#&"}</p>
                <p className="text-gray-600 text-sm">Text Scramble</p>
              </div>
            ) : component.slug === "liquid-morph" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">💧</p>
                <p className="text-gray-600 text-sm">Liquid Morph</p>
              </div>
            ) : component.slug === "spotlight-reveal" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">🔦</p>
                <p className="text-gray-600 text-sm">Spotlight Reveal</p>
              </div>
            ) : component.slug === "magnetic-elements" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">🧲</p>
                <p className="text-gray-600 text-sm">Magnetic Elements</p>
              </div>
            ) : component.slug === "magnifying-lens" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">🔍</p>
                <p className="text-gray-600 text-sm">Magnifying Lens</p>
              </div>
            ) : component.slug === "crumpled-paper" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">📄</p>
                <p className="text-gray-600 text-sm">Crumpled Paper</p>
              </div>
            ) : component.slug === "gooey-image-transition" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">🫠</p>
                <p className="text-gray-600 text-sm">Gooey Transition</p>
              </div>
            ) : component.slug === "horizontal-scroll-gallery" ? (
              <div className="text-center">
                <p className="text-gray-700 font-bold text-lg">↕️→</p>
                <p className="text-gray-600 text-sm">Scroll Gallery</p>
              </div>
            ) : (
              <svg
                className="absolute inset-0 w-full h-full text-gray-300 p-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                {component.name}
              </h3>
              <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                {component.type}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4 flex-1">
              {component.description}
            </p>

            <div className="text-xs text-gray-400 pt-3 border-t border-gray-100">
              {formattedDate}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
