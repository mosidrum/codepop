"use client";

type Mode = "explain" | "debug" | "generate";

interface ModeSelectorProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  disabled?: boolean;
}

const modes = [
  { value: "explain" as Mode, label: "Explain Code", icon: "💡" },
  { value: "debug" as Mode, label: "Debug Code", icon: "🐛" },
  { value: "generate" as Mode, label: "Solve Challenge", icon: "⚡" },
];

export const ModeSelector = ({
  mode,
  onModeChange,
  disabled,
}: ModeSelectorProps) => (
    <div className="mb-6 flex border-b border-white/10">
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => onModeChange(m.value)}
          disabled={disabled}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px disabled:opacity-50 disabled:cursor-not-allowed ${
            mode === m.value
              ? "border-cyan-400 text-cyan-400"
              : "border-transparent text-gray-500 hover:text-gray-200 hover:border-white/20"
          }`}
        >
          <span>{m.icon}</span>
          <span>{m.label}</span>
        </button>
      ))}
    </div>
  );
