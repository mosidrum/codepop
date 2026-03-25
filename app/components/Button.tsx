import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  disabled = false,
}: ButtonProps) => {
  const baseStyles =
    "rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold hover:shadow-lg hover:shadow-cyan-500/30 disabled:hover:shadow-none",
    secondary:
      "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm sm:text-base",
    md: "px-6 py-2.5 text-sm sm:text-base",
    lg: "px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg hover:scale-105",
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};
