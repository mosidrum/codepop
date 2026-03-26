"use client";

import React from "react";

import { CodeBlock } from "./CodeBlock";
import { FormattedText } from "./FormattedText";

interface ResultsPanelProps {
  result: string;
  resultRef: React.RefObject<HTMLDivElement | null>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onCopy: (text: string) => void;
  isCopied: boolean;
}

const parseContent = (content: string) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts: Array<{
    type: "text" | "code";
    content: string;
    language?: string;
  }> = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: content.slice(lastIndex, match.index),
      });
    }
    parts.push({
      type: "code",
      content: match[2],
      language: match[1] || "text",
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: "text", content: content.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: "text" as const, content }];
};

export const ResultsPanel = ({
  result,
  resultRef,
  onScroll,
  onCopy,
  isCopied,
}: ResultsPanelProps) => (
  <div className="flex flex-col flex-1 min-h-0">
    <div className="flex items-center justify-between mb-3 shrink-0">
      <h3 className="text-lg font-semibold text-white">Results</h3>
    </div>
    <div
      ref={resultRef}
      onScroll={onScroll}
      className="flex-1 rounded-lg bg-[#161b22] border border-white/10 overflow-y-auto"
    >
      {result ? (
        <div className="space-y-4">
          {parseContent(result).map((part, index) => {
            if (part.type === "code") {
              return (
                <CodeBlock
                  key={index}
                  content={part.content}
                  language={part.language || "text"}
                  onCopy={onCopy}
                  isCopied={isCopied}
                />
              );
            }
            return <FormattedText key={index} content={part.content} />;
          })}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-12">
          Your results will appear here...
        </p>
      )}
    </div>
  </div>
);
