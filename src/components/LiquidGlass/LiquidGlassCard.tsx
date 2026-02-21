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
      edgeLight = "none",
      reflection = "none",
      floating = false,
      className,
      style,
      onClick,
      ...props
    },
    ref
  ) => {
    const { isLiquidGlass } = useMultiTheme();

    const getBlurClass = () => {
      const blurClasses = {
        light: "backdrop-blur-sm",
        medium: "backdrop-blur-md",
        strong: "backdrop-blur-lg",
        ultra: "backdrop-blur-xl",
      };
      return blurClasses[blur];
    };

    const getEdgeLightClass = () => {
      if (edgeLight === "none") return "";
      const edgeLightClasses = {
        soft: "shadow-white/10",
        medium: "shadow-white/20",
        strong: "shadow-white/30",
      };
      return edgeLightClasses[edgeLight];
    };

    const getReflectionClass = () => {
      if (reflection === "none") return "";
      return `before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none`;
    };

    const baseClasses = `
      relative rounded-xl border transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-blue-500/50
    `;

    const glassClasses = isLiquidGlass
      ? clsx(
          getBlurClass(),
          `bg-white/${Math.round(alpha * 100)}`,
          "border-white/20",
          "shadow-xl shadow-black/10",
          getEdgeLightClass(),
          floating && "transform hover:scale-105 hover:-translate-y-1",
          getReflectionClass()
        )
      : clsx("bg-gray-100", "border-gray-200", "shadow-md");

    const classes = clsx(
      baseClasses,
      glassClasses,
      onClick && "cursor-pointer hover:shadow-2xl",
      className
    );

    const glassStyle = isLiquidGlass
      ? {
          backdropFilter: `blur(${
            blur === "light"
              ? "8px"
              : blur === "medium"
              ? "16px"
              : blur === "strong"
              ? "24px"
              : "32px"
          }) saturate(${
            blur === "light"
              ? "120%"
              : blur === "medium"
              ? "150%"
              : blur === "strong"
              ? "180%"
              : "200%"
          })`,
          ...style,
        }
      : style;

    return (
      <div
        ref={ref}
        className={classes}
        style={glassStyle}
        onClick={onClick}
        {...props}
      >
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

LiquidGlassCard.displayName = "LiquidGlassCard";
