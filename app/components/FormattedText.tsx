"use client";

import React from "react";

interface FormattedTextProps {
  content: string;
}

export const FormattedText = ({ content }: FormattedTextProps) => (
  <div className="px-6 py-4">
    <div className="prose prose-invert max-w-none">
      {content.split("\n\n").map((paragraph, i) => {
        if (
          paragraph.trim().startsWith("- ") ||
          paragraph.trim().startsWith("* ")
        ) {
          const items = paragraph.split("\n").filter((line) => line.trim());
          return (
            <ul
              key={i}
              className="list-disc list-inside space-y-1 text-gray-300 mb-4"
            >
              {items.map((item, j) => (
                <li key={j}>{item.replace(/^[-*]\s*/, "")}</li>
              ))}
            </ul>
          );
        }
        if (/^\d+\.\s/.test(paragraph.trim())) {
          const items = paragraph.split("\n").filter((line) => line.trim());
          return (
            <ol
              key={i}
              className="list-decimal list-inside space-y-1 text-gray-300 mb-4"
            >
              {items.map((item, j) => (
                <li key={j}>{item.replace(/^\d+\.\s*/, "")}</li>
              ))}
            </ol>
          );
        }
        if (paragraph.trim().startsWith("#")) {
          const level = paragraph.match(/^#+/)?.[0].length || 1;
          const text = paragraph.replace(/^#+\s*/, "");
          const Tag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
          return (
            <Tag key={i} className="text-white font-semibold mb-3 mt-6">
              {text}
            </Tag>
          );
        }
        return paragraph.trim() ? (
          <p key={i} className="text-gray-300 mb-4 leading-relaxed">
            {paragraph}
          </p>
        ) : null;
      })}
    </div>
  </div>
);
