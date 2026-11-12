"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Text Logo */}
          <Link
            href="/"
            className="group flex items-baseline select-none"
            aria-label="Muntasir — home"
          >
            <span className="text-2xl font-black tracking-tighter text-gray-900 group-hover:tracking-tight transition-all duration-300">
              Muntasir
            </span>
            <span className="text-2xl font-black text-blue-600 group-hover:scale-125 transition-transform duration-300 origin-bottom-left">
              .
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#components"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Components
            </Link>
            <Link
              href="/#agents"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Agents
            </Link>
            <a
              href="mailto:contact.muntasir@gmail.com"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <Link
              href="/#components"
              className="block py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              Components
            </Link>
            <Link
              href="/#agents"
              className="block py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              Agents
            </Link>
            <a
              href="mailto:contact.muntasir@gmail.com"
              className="block py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
