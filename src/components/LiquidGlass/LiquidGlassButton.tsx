import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { useMultiTheme } from "../../themes/MultiThemeProvider";

interface LiquidGlassButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const LiquidGlassButton = forwardRef<
  HTMLButtonElement,
  LiquidGlassButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      children,
      className,
      onClick,
      type = "button",
      ...props
    },
    ref
  ) => {
    const { isLiquidGlass } = useMultiTheme();

    const getSizeClasses = () => {
      const sizes = {
        sm: "text-xs px-3 py-1.5 h-8",
        md: "text-sm px-4 py-2 h-10",
        lg: "text-base px-6 py-3 h-12",
      };
      return sizes[size];
    };

    const getVariantClasses = () => {
      if (!isLiquidGlass) {
        // Fallback to regular button styles when not in liquid glass theme
        const variants = {
          primary:
            "bg-blue-600 text-white border-transparent hover:bg-blue-700",
          secondary:
            "bg-gray-200 text-gray-900 border-gray-300 hover:bg-gray-300",
          ghost:
            "bg-transparent text-blue-600 border-transparent hover:bg-gray-100",
        };
        return variants[variant];
      }

      // Liquid glass variants
      const variants = {
        primary: "text-white border-white/20 hover:border-white/30",
        secondary: "text-white/90 border-white/15 hover:border-white/25",
        ghost: "text-white/80 border-transparent hover:text-white/90",
      };
      return variants[variant];
    };

    const baseClasses = `
      inline-flex items-center justify-center
      font-medium transition-all duration-200
      rounded-lg border backdrop-blur-md
      focus:outline-none focus:ring-2 focus:ring-blue-500/50
      disabled:opacity-50 disabled:cursor-not-allowed
      transform hover:scale-105 active:scale-95
    `;

    const glassClasses = isLiquidGlass
      ? "bg-white/10 hover:bg-white/20 shadow-lg shadow-black/10"
      : "";

    const classes = clsx(
      baseClasses,
      getSizeClasses(),
      getVariantClasses(),
      glassClasses,
      loading && "cursor-wait",
      disabled && "cursor-not-allowed",
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={classes}
        onClick={onClick}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

LiquidGlassButton.displayName = "LiquidGlassButton";
