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
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-4 border-b border-white/5 bg-[#0d1117]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/">
            <Logo />
          </a>
          <Button size="sm">Sign In</Button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex flex-col flex-1 overflow-hidden px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
            <ModeSelector
              mode={mode}
              onModeChange={setMode}
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

            <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden pb-4 sm:pb-6 lg:pb-8">
              {/* Input panel */}
              <div className="flex-1 flex flex-col min-h-0">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {mode === "generate"
                    ? "Describe the challenge"
                    : "Paste your code"}
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 p-4 rounded-lg bg-[#161b22] border border-white/10 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none font-mono text-sm"
                  placeholder={
                    mode === "generate"
                      ? "Describe the challenge or problem to solve..."
                      : "// Paste your code here..."
                  }
                />
                <div className="mt-4 flex gap-3 shrink-0">
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
                          : "Solve It"}
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
              </div>

              {/* Results panel */}
              <div className="flex-1 flex flex-col min-h-0">
                <ResultsPanel
                  result={result}
                  resultRef={resultRef}
                  onScroll={handleScroll}
                  onCopy={copyToClipboard}
                  isCopied={isCopied}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
