"use client";

import React from "react";

interface LanguageSelectorProps {
  language: string;
  onLanguageChange: (language: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const languages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
];

export const LanguageSelector = ({
  language,
  onLanguageChange,
  isOpen,
  onToggle,
  disabled,
}: LanguageSelectorProps) => (
  <div className="mb-6 relative">
    <label className="block text-sm font-medium text-gray-300 mb-2">
      Select Language
    </label>
    <button
      onClick={onToggle}
      disabled={disabled}
      className="w-full sm:w-64 flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>{language}</span>
      <span className="text-gray-400">▼</span>
    </button>
    {isOpen && (
      <div className="absolute top-full mt-2 w-full sm:w-64 rounded-lg bg-black/90 backdrop-blur-sm border border-white/10 overflow-hidden z-20 max-h-64 overflow-y-auto">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => {
              onLanguageChange(lang);
              onToggle();
            }}
            className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors"
          >
            {lang}
          </button>
        ))}
      </div>
    )}
  </div>
);
