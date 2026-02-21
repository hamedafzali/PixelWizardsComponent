import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { ProgressProps } from "./Progress.types";

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      size = "md",
      variant = "default",
      color = "primary",
      showLabel = false,
      animated = true,
      className,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const getSizeClasses = (): string => {
      const sizes: Record<string, string> = {
        sm: "pw-progress--sm",
        md: "pw-progress--md",
        lg: "pw-progress--lg",
      };
      return sizes[size];
    };

    const getVariantClasses = (): string => {
      const variants: Record<string, string> = {
        default: "pw-progress--default",
        striped: "pw-progress--striped",
        gradient: "pw-progress--gradient",
      };
      return variants[variant];
    };

    const getColorClasses = (): string => {
      const colors: Record<string, string> = {
        primary: "pw-progress--primary",
        secondary: "pw-progress--secondary",
        success: "pw-progress--success",
        warning: "pw-progress--warning",
        error: "pw-progress--error",
        info: "pw-progress--info",
      };
      return colors[color];
    };

    const containerClasses = clsx(
      "pw-progress",
      getSizeClasses(),
      getVariantClasses(),
      getColorClasses(),
      {
        "pw-progress--animated": animated,
      },
      className,
    );

    const barClasses = clsx("pw-progress__bar", {
      "pw-progress__bar--animated": animated,
    });

    return (
      <div ref={ref} className={containerClasses} {...props}>
        <div
          className={barClasses}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={`Progress: ${percentage.toFixed(1)}%`}
        />
        {showLabel && (
          <span className="pw-progress__label">{percentage.toFixed(0)}%</span>
        )}
      </div>
    );
  },
);

Progress.displayName = "Progress";

export { Progress };
