"use client";

import { MagneticElement } from "./MagneticElement";

export default function MagneticElementDemo() {
  return (
    <div className="min-h-[32rem] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Magnetic Elements
        </h2>
        <p className="text-gray-600">
          Move your cursor near anything below — it gets pulled toward you and
          springs back when you leave
        </p>
      </div>

      <div className="flex flex-col items-center gap-14">
        {/* Magnetic letters */}
        <div>
          <p className="text-sm text-gray-500 text-center mb-3">Letters</p>
          <div className="flex">
            {"MAGNETIC".split("").map((letter, i) => (
              <MagneticElement key={i} strength={0.5} className="p-2">
                <span className="text-5xl md:text-6xl font-black text-gray-900">
                  {letter}
                </span>
              </MagneticElement>
            ))}
          </div>
        </div>

        {/* Magnetic icons */}
        <div>
          <p className="text-sm text-gray-500 text-center mb-3">Icons</p>
          <div className="flex gap-4">
            {["⭐", "❤️", "🚀", "⚡", "🧲"].map((icon, i) => (
              <MagneticElement key={i} strength={0.6} className="p-4">
                <span className="text-4xl inline-block">{icon}</span>
              </MagneticElement>
            ))}
          </div>
        </div>

        {/* Magnetic buttons */}
        <div>
          <p className="text-sm text-gray-500 text-center mb-3">Buttons</p>
          <div className="flex flex-wrap justify-center gap-8">
            <MagneticElement strength={0.35} className="p-6">
              <button className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 active:scale-95 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                Hover Me 🧲
              </button>
            </MagneticElement>

            <MagneticElement strength={0.35} className="p-6">
              <button className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-500 active:scale-95 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                Me Too ✨
              </button>
            </MagneticElement>
          </div>
        </div>
      </div>
    </div>
  );
}
