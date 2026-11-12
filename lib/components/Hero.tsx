"use client";

import { PixelExplodeImage } from "./PixelExplodeImage";

export default function Hero() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Muntasir Hasan
            </h1>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Building beautiful, functional UI components and intelligent AI
              agents.
            </p>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              A curated collection of React components and AI solutions created
              to solve real problems and showcase modern development practices.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap">
              <a
                href="#components"
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                View Components
              </a>
              <a
                href="#agents"
                className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
              >
                View Agents
              </a>
            </div>
          </div>

          {/* Right Side - Profile Image (hover to explode into pixels) */}
          <div className="flex justify-center">
            <PixelExplodeImage
              src="/profile.jpg"
              alt="Muntasir Hasan"
              width={288}
              height={384}
              grid={12}
              spread={450}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
