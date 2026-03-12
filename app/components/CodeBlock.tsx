"use client";

import React from "react";

interface CodeBlockProps {
  content: string;
  language: string;
  onCopy: (text: string) => void;
  isCopied: boolean;
}

export const CodeBlock = ({
  content,
  language,
  onCopy,
  isCopied,
}: CodeBlockProps) => (
  <div className="relative group">
    <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 border-b border-white/10">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        </span>
        <span className="text-sm text-gray-300 font-medium">{language}</span>
      </div>
      <button
        onClick={() => onCopy(content)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
        title="Copy code"
      >
        {isCopied ? (
          <svg
            className="w-4 h-4 text-green-400"
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
        ) : (
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>
    </div>
    <pre className="p-4 bg-black/80 text-green-400 font-mono text-sm leading-relaxed overflow-x-auto">
      {content}
    </pre>
  </div>
);
