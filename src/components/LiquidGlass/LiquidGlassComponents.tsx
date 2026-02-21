import React from "react";
import { useLiquidGlass } from "../../hooks/useLiquidGlass";
import { clsx } from "clsx";

// Enhanced Card with Liquid Glass effects
interface LiquidGlassCardProps {
  children: React.ReactNode;
  variant?: "navigation" | "card" | "modal" | "button" | "panel";
  blur?: "subtle" | "medium" | "strong" | "ultra";
  alpha?: number;
  edgeLight?: "soft" | "medium" | "strong";
  reflection?: "subtle" | "medium" | "strong";
  floating?: boolean;
  pulse?: boolean;
  layer?: "background" | "glass" | "solid" | "dynamic" | "modal" | "toast";
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  variant = "card",
  blur = "medium",
  alpha = 0.75,
  edgeLight,
  reflection,
  floating = false,
  pulse = false,
  layer = "glass",
  className,
  style,
  onClick,
}) => {
  const { elementRef, glassClasses } = useLiquidGlass<HTMLDivElement>({
    variant,
    blur,
    alpha,
    edgeLight,
    reflection,
    floating,
    pulse,
    layer,
  });

  return (
    <div
      ref={elementRef}
      className={clsx(glassClasses, className)}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Enhanced Button with Liquid Glass effects
interface LiquidGlassButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  blur?: "subtle" | "medium" | "strong";
  alpha?: number;
  edgeLight?: "soft" | "medium";
  reflection?: "subtle";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  blur = "subtle",
  alpha = 0.65,
  edgeLight = "soft",
  reflection = "subtle",
  disabled = false,
  loading = false,
  onClick,
  className,
}) => {
  const { elementRef, glassClasses } = useLiquidGlass<HTMLButtonElement>({
    variant: "button",
    blur,
    alpha,
    edgeLight,
    reflection,
    layer: "solid",
  });

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    primary: {
      background: "var(--glass-bg-light-tertiary)",
      color: "var(--color-text-primary)",
      border: "1px solid var(--glass-border-light)",
    },
    secondary: {
      background: "var(--glass-bg-light-secondary)",
      color: "var(--color-text-primary)",
      border: "1px solid var(--glass-border-light-subtle)",
    },
    ghost: {
      background: "var(--glass-bg-light-subtle)",
      color: "var(--color-text-primary)",
      border: "1px solid transparent",
    },
  };

  return (
    <button
      ref={elementRef}
      className={clsx(
        glassClasses,
        sizeClasses[size],
        "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
        disabled && "opacity-50 cursor-not-allowed",
        loading && "cursor-wait",
        className,
      )}
      style={variantStyles[variant]}
      disabled={disabled || loading}
      onClick={onClick}
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
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

// Enhanced Modal with Liquid Glass effects
interface LiquidGlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  blur?: "strong" | "ultra";
  alpha?: number;
  edgeLight?: "medium" | "strong";
  reflection?: "medium" | "strong";
  className?: string;
}

export const LiquidGlassModal: React.FC<LiquidGlassModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  blur = "strong",
  alpha = 0.95,
  edgeLight = "medium",
  reflection = "medium",
  className,
}) => {
  const { elementRef, glassClasses } = useLiquidGlass<HTMLDivElement>({
    variant: "modal",
    blur,
    alpha,
    edgeLight,
    reflection,
    layer: "modal",
  });

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={elementRef}
        className={clsx(
          glassClasses,
          sizeClasses[size],
          "relative w-full mx-4 max-h-[90vh] overflow-auto rounded-2xl p-6",
          className,
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="text-white">{children}</div>
      </div>
    </div>
  );
};

// Enhanced Navigation Bar with Liquid Glass effects
interface LiquidGlassNavProps {
  children: React.ReactNode;
  blur?: "medium" | "strong";
  alpha?: number;
  edgeLight?: "soft" | "medium";
  reflection?: "subtle" | "medium";
  floating?: boolean;
  className?: string;
  sticky?: boolean;
}

export const LiquidGlassNav: React.FC<LiquidGlassNavProps> = ({
  children,
  blur = "medium",
  alpha = 0.85,
  edgeLight = "soft",
  reflection = "subtle",
  floating = true,
  className,
  sticky = true,
}) => {
  const { elementRef, glassClasses } = useLiquidGlass<HTMLDivElement>({
    variant: "navigation",
    blur,
    alpha,
    edgeLight,
    reflection,
    floating,
    layer: "glass",
  });

  return (
    <nav
      ref={elementRef}
      className={clsx(
        glassClasses,
        "top-0 left-0 right-0 z-40 px-6 py-4",
        sticky && "sticky",
        className,
      )}
    >
      <div className="flex items-center justify-between">{children}</div>
    </nav>
  );
};
