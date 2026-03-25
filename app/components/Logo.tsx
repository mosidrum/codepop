import React from "react";

interface LogoProps {
  size?: "sm" | "md";
}

export const Logo = ({ size = "sm" }: LogoProps) => {
  const textSize = size === "sm" ? "text-lg" : "text-xl";

  return (
    <div className="flex items-center gap-2">
      <span
        className={`${textSize} font-bold bg-linear-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent`}
      >
        Code Pop
      </span>
    </div>
  );
};
