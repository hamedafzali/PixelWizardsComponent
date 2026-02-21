import React, { forwardRef, isValidElement } from "react";
import { clsx } from "clsx";
import { ButtonProps } from "./Button.types";

// Default theme tokens for the button
const buttonTheme = {
  // Base styles
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "var(--radius-md, 0.375rem)",
    fontWeight: 500,
    transition: "all 0.2s ease",
    cursor: "pointer",
    border: "1px solid transparent",
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
    "&:hover:not(:disabled)": {
      transform: "translateY(-1px)",
      boxShadow: "var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))",
    },
    "&:active:not(:disabled)": {
      transform: "translateY(0)",
    },
  },

  // Variants
  variants: {
    primary: {
      backgroundColor: "var(--color-primary, #3b82f6)",
      color: "white",
      border: "none",
      "&:hover:not(:disabled)": {
        backgroundColor: "var(--color-primary-dark, #2563eb)",
      },
    },
    secondary: {
      backgroundColor: "var(--color-bg-secondary, #f3f4f6)",
      color: "var(--color-text-primary, #111827)",
      border: "1px solid var(--color-border, #e5e7eb)",
      "&:hover:not(:disabled)": {
        backgroundColor: "var(--color-bg-elevated, #e5e7eb)",
      },
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--color-primary, #3b82f6)",
      "&:hover:not(:disabled)": {
        backgroundColor: "var(--color-bg-secondary, #f3f4f6)",
      },
    },
    outline: {
      backgroundColor: "transparent",
      color: "var(--color-primary, #3b82f6)",
      border: "1px solid var(--color-primary, #3b82f6)",
      "&:hover:not(:disabled)": {
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
    },
    danger: {
      backgroundColor: "var(--color-error, #ef4444)",
      color: "white",
      border: "none",
      "&:hover:not(:disabled)": {
        backgroundColor: "var(--color-error-dark, #dc2626)",
      },
    },
  },

  // Sizes
  sizes: {
    sm: {
      fontSize: "0.75rem",
      padding: "0.25rem 0.75rem",
      height: "2rem",
      gap: "0.375rem",
    },
    md: {
      fontSize: "0.875rem",
      padding: "0.5rem 1rem",
      height: "2.5rem",
      gap: "0.5rem",
    },
    lg: {
      fontSize: "1rem",
      padding: "0.75rem 1.5rem",
      height: "3rem",
      gap: "0.75rem",
    },
    xl: {
      fontSize: "1.125rem",
      padding: "1rem 2rem",
      height: "3.5rem",
      gap: "1rem",
    },
  },
};

// Helper component to render the icon with proper typing
const IconWrapper = ({
  icon,
  size = 20,
  className = "",
}: {
  icon: ButtonProps["icon"];
  size?: number;
  className?: string;
}) => {
  if (!icon) return null;

  // If it's a function component
  if (typeof icon === "function") {
    const IconComponent = icon as React.ComponentType<{
      size?: number;
      className?: string;
    }>;
    return (
      <IconComponent
        size={size}
        className={clsx("pw-button__icon-svg", className)}
      />
    );
  }

  // If it's a React element
  if (isValidElement(icon)) {
    return icon;
  }

  // If it's a string (emoji or text)
  if (typeof icon === "string") {
    return (
      <span className={clsx("pw-button__icon-text", className)}>{icon}</span>
    );
  }

  return null;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    // Get the base styles and variant-specific styles
    const baseStyles = buttonTheme.base;
    const variantStyles = buttonTheme.variants[variant] || {};
    const sizeStyles = buttonTheme.sizes[size] || {};
    // Merge styles with proper precedence
    const buttonStyle = {
      ...baseStyles,
      ...variantStyles,
      ...sizeStyles,
      ...(fullWidth && { width: "100%" }),
      ...(disabled && { opacity: 0.6, cursor: "not-allowed" }),
      ...(loading && { pointerEvents: "none" }),
      ...style,
    } as React.CSSProperties;

    // Generate class names with clsx
    const classes = clsx(
      "pw-button",
      `pw-button--${variant}`,
      `pw-button--${size}`,
      {
        "pw-button--disabled": disabled,
        "pw-button--loading": loading,
        "pw-button--full-width": fullWidth,
        "pw-button--icon-only": !children && icon,
        "pw-button--with-icon": icon,
        [`pw-button--icon-${iconPosition}`]: icon,
      },
      className,
    );

    // Get the appropriate icon size based on button size
    const getIconSize = () => {
      switch (size) {
        case "sm":
          return 16;
        case "lg":
          return 20;
        case "xl":
          return 24;
        default:
          return 18; // md
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        role="button"
        style={buttonStyle}
        {...props}
      >
        {loading && (
          <span className="pw-button__loader">
            <svg
              className="pw-button__spinner"
              viewBox="0 0 50 50"
              style={{
                width: "1.25em",
                height: "1.25em",
                animation: "spin 1s linear infinite",
              }}
              aria-hidden="true"
            >
              <circle
                className="pw-button__spinner-path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="31.415, 31.415"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </span>
        )}
        {!loading && icon && iconPosition === "left" && (
          <span
            className="pw-button__icon pw-button__icon--left"
            aria-hidden="true"
          >
            <IconWrapper
              icon={icon}
              size={getIconSize()}
              className={children ? "pw-button__icon--with-text" : ""}
            />
          </span>
        )}
        {children && <span className="pw-button__content">{children}</span>}
        {!loading && icon && iconPosition === "right" && (
          <span
            className="pw-button__icon pw-button__icon--right"
            aria-hidden="true"
          >
            <IconWrapper
              icon={icon}
              size={getIconSize()}
              className={children ? "pw-button__icon--with-text" : ""}
            />
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
