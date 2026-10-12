import { forwardRef } from "react";
import { clsx } from "clsx";
import { BadgeProps } from "./Badge.types";

/**
 * Small label for status, counts and metadata.
 * - `dot` with children renders a status dot followed by the label, so the
 *   colour is never the only signal.
 * - `dot` without children renders a dot-only indicator (give it aria-label).
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      color = "primary",
      dot = false,
      pulse = false,
      icon,
      mono = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const dotOnly = dot && (children === undefined || children === null);

    const classes = clsx(
      "pw-badge",
      `pw-badge--${variant}`,
      `pw-badge--${color}`,
      `pw-badge--${size}`,
      {
        "pw-badge--dot": dotOnly,
        "pw-badge--with-dot": dot && !dotOnly,
        "pw-badge--mono": mono,
      },
      className,
    );

    const dotEl = (
      <span
        className={clsx("pw-badge__dot", { "pw-badge__dot--pulse": pulse })}
        aria-hidden="true"
      />
    );

    if (dotOnly) {
      return (
        <span ref={ref} className={classes} {...props}>
          {dotEl}
        </span>
      );
    }

    return (
      <span ref={ref} className={classes} {...props}>
        {dot && dotEl}
        {icon && (
          <span className="pw-badge__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="pw-badge__label">{children}</span>
      </span>
    );
  },
);

Badge.displayName = "Badge";

export { Badge };
