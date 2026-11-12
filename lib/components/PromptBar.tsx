"use client";

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
    <div className={`w-full flex flex-col items-center gap-4 ${classes.container}`}>
      {/* Input Container */}
      <div className="w-full">
        <div className="relative flex items-center gap-2 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2">
          {/* Input Field */}
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
            className={`flex-1 bg-transparent outline-none ${classes.input} placeholder-gray-400 text-gray-900`}
          />

          {/* Submit Button */}
          <button
            onClick={() => handleSubmit(input)}
            disabled={!input.trim()}
            className={`mr-2 flex items-center justify-center rounded-full transition-all duration-200 ${
              input.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer active:scale-95"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            } ${classes.button}`}
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

      {/* Suggestions Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className={`group text-left bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 ${classes.suggestionPadding}`}
            aria-label={`Suggestion: ${suggestion}`}
          >
            <div className="flex items-start gap-2">
              <svg
                className={`flex-shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors ${classes.icon}`}
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
              <span className={`${classes.suggestionText} text-gray-700 group-hover:text-gray-900 leading-snug`}>
                {suggestion}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Suggestion Feedback */}
      {selectedSuggestion && (
        <div className="text-xs text-gray-500 animate-pulse">
          Processing: "{selectedSuggestion}"
        </div>
      )}
    </div>
  );
}
