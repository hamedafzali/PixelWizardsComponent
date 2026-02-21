import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { useTheme } from "../../themes";
import { CardProps } from "./Card.types";

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      rounded = true,
      hover = false,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const getVariantClasses = () => {
      const variants = {
        default: "pw-card--default",
        elevated: "pw-card--elevated",
        outlined: "pw-card--outlined",
        glass: "pw-card--glass",
      };
      return variants[variant];
    };

    const getPaddingClasses = () => {
      const paddings = {
        none: "pw-card--padding-none",
        sm: "pw-card--padding-sm",
        md: "pw-card--padding-md",
        lg: "pw-card--padding-lg",
        xl: "pw-card--padding-xl",
      };
      return paddings[padding];
    };

    const classes = clsx(
      "pw-card",
      getVariantClasses(),
      getPaddingClasses(),
      {
        "pw-card--rounded": rounded,
        "pw-card--hover": hover,
      },
      className,
    );

    const cardStyle = {
      ...style,
      // CSS custom properties for theming
      "--background-color": theme.colors.semantic.surface.primary,
      "--border-color": theme.colors.semantic.border.primary,
      "--text-color": theme.colors.semantic.text.primary,
      "--shadow-elevated": theme.shadows.lg,
      "--shadow-glass": theme.shadows.glass,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={classes}
        style={cardStyle}
        role={props.role || "region"}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export { Card };
