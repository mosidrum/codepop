"use client";

import React, { useState, useRef, useEffect } from "react";

import {
  Button,
  ResultsPanel,
  Logo,
  LanguageSelector,
  ModeSelector,
} from "../components";
import { useApiStream } from "../hooks/useApiStream";

type Mode = "explain" | "debug" | "generate";

export default function AppPage() {
  const [mode, setMode] = useState<Mode>("explain");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const { result, isLoading, submit, stop } = useApiStream({ mode, language });

  useEffect(() => {
    if (resultRef.current && !hasUserScrolled && result) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [result, hasUserScrolled]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
    setHasUserScrolled(!isAtBottom);
  };

  const copyToClipboard = (text: string) => {
    void navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = () => {
    setHasUserScrolled(false);
    void submit(input);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/">
            <Logo />
          </a>
          <Button size="sm">Sign In</Button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <aside className="hidden lg:block w-64 border-r border-white/10 p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
            History
          </h3>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-white/10">
              <p className="text-sm text-white truncate">Fix login bug</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-white/10">
              <p className="text-sm text-white truncate">
                Generate API endpoint
              </p>
              <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            <ModeSelector
              mode={mode}
              onModeChange={setMode}
              isOpen={isDropdownOpen}
              onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={isLoading}
            />

            {mode === "generate" && (
              <LanguageSelector
                language={language}
                onLanguageChange={setLanguage}
                isOpen={isLangDropdownOpen}
                onToggle={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                disabled={isLoading}
              />
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {mode === "generate"
                  ? "Describe what you want to build"
                  : "Paste your code"}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-64 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm"
                placeholder={
                  mode === "generate"
                    ? "Describe the code you want to generate..."
                    : "// Paste your code here..."
                }
              />
            </div>

            <div className="mb-8 flex gap-3">
              <Button
                onClick={handleSubmit}
                className="w-full sm:w-auto"
                disabled={isLoading}
              >
                {isLoading
                  ? "Processing..."
                  : mode === "explain"
                    ? "Explain Code"
                    : mode === "debug"
                      ? "Debug Code"
                      : "Generate Code"}
              </Button>
              {isLoading && (
                <Button
                  onClick={stop}
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Stop
                </Button>
              )}
            </div>

            <ResultsPanel
              result={result}
              resultRef={resultRef}
              onScroll={handleScroll}
              onCopy={copyToClipboard}
              isCopied={isCopied}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
