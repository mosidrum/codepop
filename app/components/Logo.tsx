import React from "react";

interface LogoProps {
  size?: "sm" | "md";
}

export const Logo = ({ size = "sm" }: LogoProps) => {
  const iconSize = size === "sm" ? "w-8 h-8 text-lg" : "w-10 h-10 text-xl";
  const textSize = size === "sm" ? "text-lg" : "text-xl";

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${iconSize} rounded-lg bg-linear-to-br from-purple-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30`}
      >
        <span className={textSize}>🔥</span>
      </div>
      <span
        className={`${textSize} font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent`}
      >
        Code Pop
      </span>
    </div>
  );
};
