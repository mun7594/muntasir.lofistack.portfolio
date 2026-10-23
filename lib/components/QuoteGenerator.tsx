"use client";

import { useState } from "react";

interface QuoteGeneratorProps {
  onQuoteChange?: (quote: string) => void;
}

export function QuoteGenerator({ onQuoteChange }: QuoteGeneratorProps) {
  const [category, setCategory] = useState<string>("motivational");
  const [quote, setQuote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const categories = [
    "motivational",
    "funny",
    "inspirational",
    "wisdom",
    "success",
  ];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });

      const data = await response.json();
      setQuote(data.quote);
      onQuoteChange?.(data.quote);
    } catch (error) {
      console.error("Error:", error);
      setQuote("Failed to generate quote. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(quote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Quote Generator
        </h2>
        <p className="text-gray-600">
          Select a category and let AI generate an inspiring quote for you
        </p>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Choose Category:
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                category === cat
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-indigo-400"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
        }`}
      >
        {loading ? "Generating..." : "Generate Quote"}
      </button>

      {/* Quote Display */}
      {quote && (
        <div className="mt-6 p-4 bg-white rounded-lg border-2 border-indigo-300">
          <p className="text-lg text-gray-800 italic mb-4">"{quote}"</p>
          <button
            onClick={handleCopy}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {copied ? "✓ Copied!" : "📋 Copy Quote"}
          </button>
        </div>
      )}
    </div>
  );
}
