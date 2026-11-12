"use client";

import { useState } from "react";
import { Component } from "@/lib/data/components";
import Link from "next/link";
import { CopyButton, CopyPromptButton } from "./CopyButton";
import { BeforeAfterSliderDemo } from "./BeforeAfterSliderDemo";
import { SubmitFormButtonDemo } from "./SubmitFormButtonDemo";
import StarRatingDemo from "./StarRatingDemo";
import ProgressIndicatorDemo from "./ProgressIndicatorDemo";
import PromptBarDemo from "./PromptBarDemo";
import InfiniteMarqueeDemo from "./InfiniteMarqueeDemo";
import ImageRevealCardDemo from "./ImageRevealCardDemo";
import PixelShatterLogoDemo from "./PixelShatterLogoDemo";
import TextScrambleDemo from "./TextScrambleDemo";
import LiquidMorphDemo from "./LiquidMorphDemo";

export function ComponentDetailClient({
  component,
  slug,
}: {
  component: Component;
  slug: string;
}) {
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  const getViewportSize = () => {
    switch (viewport) {
      case "mobile":
        return "max-w-sm";
      case "tablet":
        return "max-w-2xl";
      case "desktop":
        return "max-w-4xl";
    }
  };

  const formattedDate = new Date(component.createdDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/components" className="hover:text-gray-900">
            Components
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{component.name}</span>
        </nav>

        {/* Header Section */}
        <div className="mb-12 border-b border-gray-200 pb-8">
          <div className="mb-4">
            <p className="text-sm text-gray-500 font-medium">
              Week {component.week} · Component {component.componentNumber.toString().padStart(2, "0")}
            </p>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {component.name}
          </h1>

          <p className="text-lg text-gray-600 mb-6 max-w-3xl">
            {component.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {component.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                Category
              </p>
              <p className="text-sm text-gray-900 mt-1">{component.category}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                Added
              </p>
              <p className="text-sm text-gray-900 mt-1">{formattedDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                Files
              </p>
              <p className="text-sm text-gray-900 mt-1">
                {component.files.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                Dependencies
              </p>
              <p className="text-sm text-gray-900 mt-1">{component.dependencies}</p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3">
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {component.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-gray-900 uppercase mb-4">
            On this page
          </h2>
          <nav className="flex flex-wrap gap-4">
            <a
              href="#overview"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Overview
            </a>
            <a
              href="#preview"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Preview
            </a>
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#code"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Code
            </a>
            <a
              href="#prompt"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Prompt
            </a>
            <a
              href="#props"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Props
            </a>
            <a
              href="#accessibility"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Accessibility
            </a>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview Section */}
            <section id="overview" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Overview
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {component.longDescription}
              </p>
            </section>

            {/* Live Preview Section */}
            <section id="preview" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Live Preview
              </h2>

              {/* Viewport Toggle Buttons */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setViewport("mobile")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewport === "mobile"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  📱 Mobile
                </button>
                <button
                  onClick={() => setViewport("tablet")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewport === "tablet"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  📱 Tablet
                </button>
                <button
                  onClick={() => setViewport("desktop")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewport === "desktop"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  🖥️ Desktop
                </button>
              </div>

              {/* Preview Container */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 p-8">
                <div className={`mx-auto transition-all duration-300 ${getViewportSize()}`}>
                  {slug === "before-after-slider" ? (
                    <BeforeAfterSliderDemo />
                  ) : slug === "submit-form-button" ? (
                    <SubmitFormButtonDemo />
                  ) : slug === "star-rating" ? (
                    <StarRatingDemo />
                  ) : slug === "progress-indicator" ? (
                    <ProgressIndicatorDemo />
                  ) : slug === "prompt-bar" ? (
                    <PromptBarDemo />
                  ) : slug === "infinite-marquee" ? (
                    <InfiniteMarqueeDemo />
                  ) : slug === "image-reveal-card" ? (
                    <ImageRevealCardDemo />
                  ) : slug === "pixel-shatter-logo" ? (
                    <PixelShatterLogoDemo />
                  ) : slug === "text-scramble" ? (
                    <TextScrambleDemo />
                  ) : slug === "liquid-morph" ? (
                    <LiquidMorphDemo />
                  ) : (
                    <div className="bg-white rounded-lg p-8 h-96 flex items-center justify-center border border-gray-300">
                      <div className="text-center">
                        <svg
                          className="w-16 h-16 text-gray-400 mx-auto mb-2"
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
                        <p className="text-gray-600 text-sm">Component Preview</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Features
              </h2>
              <ul className="space-y-2">
                {component.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Code Section */}
            <section id="code" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Code</h2>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  Copy the component files below into your project.
                </p>

                {/* Files Tabs */}
                <div className="space-y-4">
                  {component.files.map((file) => (
                    <div key={file.name}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-mono text-sm font-semibold text-gray-900">
                          {file.name}
                        </h4>
                        <CopyButton text={file.content} />
                      </div>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto font-mono">
                        {file.content}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Prompt Section */}
            <section id="prompt" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prompt</h2>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <p className="text-sm text-gray-600 mb-4">
                  The AI prompt used to generate this component. Copy and paste into any AI coding assistant.
                </p>
                <div className="bg-white rounded p-4 font-mono text-sm text-gray-800 mb-4 max-h-64 overflow-y-auto whitespace-pre-wrap break-words">
                  {component.prompt}
                </div>
                <CopyPromptButton prompt={component.prompt} />
              </div>
            </section>

            {/* Props Section */}
            <section id="props" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Props</h2>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left font-semibold text-gray-900 py-3 px-3">
                        Prop
                      </th>
                      <th className="text-left font-semibold text-gray-900 py-3 px-3">
                        Type
                      </th>
                      <th className="text-left font-semibold text-gray-900 py-3 px-3">
                        Default
                      </th>
                      <th className="text-left font-semibold text-gray-900 py-3 px-3">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {component.relatedProps.map((prop) => (
                      <tr
                        key={prop.name}
                        className="border-b border-gray-200 hover:bg-white"
                      >
                        <td className="py-3 px-3 font-mono text-blue-600">
                          {prop.name}
                        </td>
                        <td className="py-3 px-3 font-mono text-gray-600 text-xs">
                          {prop.type}
                        </td>
                        <td className="py-3 px-3 font-mono text-gray-600 text-xs">
                          {prop.default}
                        </td>
                        <td className="py-3 px-3 text-gray-700">
                          {prop.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Accessibility Section */}
            <section id="accessibility" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Accessibility
              </h2>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <p className="text-gray-700 leading-relaxed">
                  {component.accessibility}
                </p>
              </div>
            </section>

            {/* Links Section */}
            <section className="mb-12">
              <div className="flex flex-col sm:flex-row gap-4">
                {component.liveLink && (
                  <a
                    href={component.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    View Live Demo
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
                <a
                  href={component.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  View on GitHub
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div>
            {/* Component Info Card */}
            <div className="sticky top-8">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Component Info</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase">
                      Type
                    </dt>
                    <dd className="text-sm text-gray-900 capitalize mt-1">
                      {component.type}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase">
                      Category
                    </dt>
                    <dd className="text-sm text-gray-900 mt-1">
                      {component.category}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase">
                      Files
                    </dt>
                    <dd className="text-sm text-gray-900 mt-1">
                      {component.files.length} files
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase">
                      Dependencies
                    </dt>
                    <dd className="text-sm text-gray-900 mt-1">
                      {component.dependencies}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
