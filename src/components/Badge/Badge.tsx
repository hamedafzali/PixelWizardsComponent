import { forwardRef } from "react";
import { clsx } from "clsx";
import { BadgeProps } from "./Badge.types";

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      color = "primary",
      dot = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const getVariantClasses = (): string => {
      const variants: Record<string, string> = {
        default: "pw-badge--default",
        solid: "pw-badge--solid",
        outline: "pw-badge--outline",
        subtle: "pw-badge--subtle",
      };
      return variants[variant];
    };

    const getColorClasses = (): string => {
      const colors: Record<string, string> = {
        primary: "pw-badge--primary",
        secondary: "pw-badge--secondary",
        success: "pw-badge--success",
        warning: "pw-badge--warning",
        error: "pw-badge--error",
        info: "pw-badge--info",
      };
      return colors[color];
    };

    const getSizeClasses = (): string => {
      const sizes: Record<string, string> = {
        sm: "pw-badge--sm",
        md: "pw-badge--md",
        lg: "pw-badge--lg",
      };
      return sizes[size];
    };

    const classes = clsx(
      "pw-badge",
      getVariantClasses(),
      getColorClasses(),
      getSizeClasses(),
      {
        "pw-badge--dot": dot,
      },
      className,
    );

    if (dot) {
      return (
        <span ref={ref} className={classes} {...props}>
          <span className="pw-badge__dot" />
        </span>
      );
    }

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

export { Badge };
