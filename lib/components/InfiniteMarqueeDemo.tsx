"use client";

import { InfiniteMarquee } from "./InfiniteMarquee";

export default function InfiniteMarqueeDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Infinite Marquee
          </h1>
          <p className="text-lg text-gray-600">
            Smooth scrolling text animation with customizable speed and direction
          </p>
        </div>

        {/* Speeds */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Speeds</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Slow</h3>
              <InfiniteMarquee
                text="✨ Slow Marquee Text • Smooth Animation • Perfect Scrolling"
                speed="slow"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Normal</h3>
              <InfiniteMarquee
                text="⚡ Normal Marquee Text • Smooth Animation • Perfect Scrolling"
                speed="normal"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Fast</h3>
              <InfiniteMarquee
                text="🚀 Fast Marquee Text • Smooth Animation • Perfect Scrolling"
                speed="fast"
              />
            </div>
          </div>
        </div>

        {/* Directions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Directions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Left to Right (Default)</h3>
              <InfiniteMarquee
                text="→ Scrolling Left to Right Direction"
                direction="left"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Right to Left</h3>
              <InfiniteMarquee
                text="← Scrolling Right to Left Direction"
                direction="right"
              />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Sizes</h2>

          <div className="space-y-4">
            <InfiniteMarquee
              text="Small Marquee Text"
              size="sm"
              backgroundColor="bg-blue-500"
            />
            <InfiniteMarquee
              text="Medium Marquee Text (Default)"
              size="md"
              backgroundColor="bg-purple-500"
            />
            <InfiniteMarquee
              text="Large Marquee Text"
              size="lg"
              backgroundColor="bg-indigo-500"
            />
          </div>
        </div>

        {/* Color Variants */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Color Variants</h2>

          <div className="space-y-4">
            <InfiniteMarquee
              text="🎨 Colorful Marquee Text with Beautiful Design"
              backgroundColor="bg-gradient-to-r from-pink-500 to-red-500"
              textColor="text-white"
            />
            <InfiniteMarquee
              text="🌟 Green Theme Marquee Text Scrolling Smoothly"
              backgroundColor="bg-gradient-to-r from-green-500 to-emerald-500"
              textColor="text-white"
            />
            <InfiniteMarquee
              text="💙 Blue Theme Marquee Text with Smooth Animation"
              backgroundColor="bg-gradient-to-r from-blue-600 to-cyan-500"
              textColor="text-white"
            />
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Features</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Infinite smooth scrolling animation</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Three speed options (slow, normal, fast)</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Bidirectional scrolling (left/right)</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Pause on hover for better UX</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Three size options (small, medium, large)</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Customizable colors and backgrounds</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Perfect for announcements and highlights</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
