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
    ref,
  ) => {
    const { isLiquidGlass } = useMultiTheme();

    const classes = clsx(
      "pw-button",
      `pw-button--${variant}`,
      `pw-button--${size}`,
      {
        "pw-button--loading": loading,
      },
      isLiquidGlass && [
        "liquid-glass",
        "liquid-glass--panel",
        "liquid-glass--blur-subtle",
        "liquid-glass--edge-light-soft",
        "liquid-glass--reflection-subtle",
        "liquid-glass--interactive",
      ],
      className,
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={classes}
        onClick={onClick}
        style={
          isLiquidGlass
            ? {
                ["--lg-alpha" as string]: variant === "ghost" ? "0.5" : "0.66",
              }
            : undefined
        }
        {...props}
      >
        {loading && <span className="pw-button__loader" aria-hidden="true" />}
        {children}
      </button>
    );
  },
);

LiquidGlassButton.displayName = "LiquidGlassButton";
