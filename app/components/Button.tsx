import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
}: ButtonProps) => {
  const baseStyles = "rounded-lg font-medium transition-all duration-300";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/50",
    secondary: "bg-white/10 text-white hover:bg-white/20",
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
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
