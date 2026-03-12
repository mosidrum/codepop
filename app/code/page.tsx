"use client";

import React, { useState } from "react";

import { Button, Logo } from "../components";

type Mode = "explain" | "debug" | "generate";

const modes = [
  { value: "explain" as Mode, label: "Explain Code", icon: "💡" },
  { value: "debug" as Mode, label: "Debug Code", icon: "🐛" },
  { value: "generate" as Mode, label: "Generate Code", icon: "⚡" }
];

export default function AppPage() {
  const [mode, setMode] = useState<Mode>("explain");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedMode = modes.find((m) => m.value === mode)!;

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const endpoint = `/api/${mode}`;
      const body =
        mode === "generate"
          ? { description: input, language: "JavaScript" }
          : mode === "debug"
          ? { code: input, error: "" }
          : { code: input };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (data.error) {
        setResult(`Error: ${data.error}`);
      } else {
        // Simulate streaming effect
        const text = data.data;
        let index = 0;
        const interval = setInterval(() => {
          if (index < text.length) {
            setResult(text.slice(0, index + 1));
            index++;
          } else {
            clearInterval(interval);
          }
        }, 10);
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#7c3aed_0%,#1e3a8a_33%,#000000_66%,#064e3b_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.2),transparent,transparent)]" />
      <div className="absolute inset-0 backdrop-blur-3xl bg-black/30" />

      <div className="relative z-10 min-h-screen flex flex-col">
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
              <div className="mb-6 relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Mode
                </label>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full sm:w-64 flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>{selectedMode.icon}</span>
                    <span>{selectedMode.label}</span>
                  </span>
                  <span className="text-gray-400">▼</span>
                </button>
                {showDropdown && (
                  <div className="absolute top-full mt-2 w-full sm:w-64 rounded-lg bg-black/90 backdrop-blur-sm border border-white/10 overflow-hidden z-20">
                    {modes.map((m) => (
                      <button
                        key={m.value}
                        onClick={() => {
                          setMode(m.value);
                          setShowDropdown(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-left text-white hover:bg-white/10 transition-colors"
                      >
                        <span>{m.icon}</span>
                        <span>{m.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {mode === "generate" ? "Describe what you want to build" : "Paste your code"}
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

              <div className="mb-8">
                <Button onClick={handleSubmit} className="w-full sm:w-auto" disabled={loading}>
                  {loading ? "Processing..." : `${selectedMode.label}`}
                </Button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Results</h3>
                <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 min-h-[300px]">
                  {result ? (
                    <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
                      {result}
                    </pre>
                  ) : (
                    <p className="text-gray-400 text-center py-12">
                      Your results will appear here...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
