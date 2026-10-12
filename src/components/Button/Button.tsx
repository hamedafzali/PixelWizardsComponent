import React, { forwardRef, isValidElement } from "react";
import { clsx } from "clsx";
import { ButtonProps } from "./Button.types";

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
    // Variant, size and state styling lives in components.css so hover,
    // focus and theme overrides work; inline styles would beat all of them.
    const buttonStyle = {
      ...(fullWidth && { width: "100%" }),
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
