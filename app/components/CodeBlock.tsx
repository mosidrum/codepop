"use client";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
    <div className="flex items-center justify-between px-4 py-2 bg-[#1c2128] border-b border-white/5">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
        {language}
      </span>
      <button
        onClick={() => onCopy(content)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
        title="Copy code"
      >
        {isCopied ? (
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
    <SyntaxHighlighter
      language={language}
      style={atomOneDark}
      customStyle={{
        margin: 0,
        padding: "1rem",
        background: "#0d1117",
        fontSize: "0.875rem",
        lineHeight: "1.6",
      }}
      showLineNumbers
      lineNumberStyle={{ color: "#3d444d", minWidth: "2.5em" }}
    >
      {content}
    </SyntaxHighlighter>
  </div>
);
