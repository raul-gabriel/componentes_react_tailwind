import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",
    ghost: "text-gray-900 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};


