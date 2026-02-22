import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { useMultiTheme } from "../../themes/MultiThemeProvider";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  blur?: "light" | "medium" | "strong" | "ultra";
  alpha?: number;
  edgeLight?: "none" | "soft" | "medium" | "strong";
  reflection?: "none" | "subtle" | "medium" | "strong";
  floating?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const LiquidGlassCard = forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  (
    {
      children,
      blur = "medium",
      alpha = 0.75,
      edgeLight = "medium",
      reflection = "subtle",
      floating = false,
      className,
      style,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { isLiquidGlass } = useMultiTheme();

    const blurClass =
      blur === "light"
        ? "liquid-glass--blur-subtle"
        : blur === "medium"
          ? "liquid-glass--blur-medium"
          : blur === "strong"
            ? "liquid-glass--blur-strong"
            : "liquid-glass--blur-ultra";

    const classes = clsx(
      "liquid-glass",
      "liquid-glass--card",
      blurClass,
      edgeLight !== "none" && `liquid-glass--edge-light-${edgeLight}`,
      reflection !== "none" && `liquid-glass--reflection-${reflection}`,
      floating && "liquid-glass--floating",
      onClick && "liquid-glass--interactive",
      className,
      !isLiquidGlass && "pw-card pw-card--default",
    );

    return (
      <div
        ref={ref}
        className={classes}
        style={{
          ["--lg-alpha" as string]: String(alpha),
          ...style,
        }}
        onClick={onClick}
        {...props}
      >
        <div className="relative" style={{ zIndex: 1 }}>
          {children}
        </div>
      </div>
    );
  },
);

LiquidGlassCard.displayName = "LiquidGlassCard";
