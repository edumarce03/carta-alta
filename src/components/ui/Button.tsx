import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const variantClasses = {
    primary: "bg-red-600 hover:bg-red-700 text-white",
    secondary:
      "bg-white/10 hover:bg-white/20 text-white border border-white/20",
    danger:
      "bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30",
  };

  return (
    <button
      className={`
        px-6 py-3 rounded-lg font-semibold 
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
