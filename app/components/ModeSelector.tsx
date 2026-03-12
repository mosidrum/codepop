"use client";

import React from "react";

type Mode = "explain" | "debug" | "generate";

interface ModeSelectorProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const modes = [
  { value: "explain" as Mode, label: "Explain Code", icon: "💡" },
  { value: "debug" as Mode, label: "Debug Code", icon: "🐛" },
  { value: "generate" as Mode, label: "Generate Code", icon: "⚡" },
];

export const ModeSelector = ({
  mode,
  onModeChange,
  isOpen,
  onToggle,
  disabled,
}: ModeSelectorProps) => {
  const selectedMode = modes.find((m) => m.value === mode);

  if (!selectedMode) return null;

  return (
    <div className="mb-6 relative">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Select Mode
      </label>
      <button
        onClick={onToggle}
        disabled={disabled}
        className="w-full sm:w-64 flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="flex items-center gap-2">
          <span>{selectedMode.icon}</span>
          <span>{selectedMode.label}</span>
        </span>
        <span className="text-gray-400">▼</span>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-full sm:w-64 rounded-lg bg-black/90 backdrop-blur-sm border border-white/10 overflow-hidden z-20">
          {modes.map((m) => (
            <button
              key={m.value}
              onClick={() => {
                onModeChange(m.value);
                onToggle();
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
  );
};
