import React, { forwardRef } from "react";
import { clsx } from "clsx";

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  /** Accessible name, also shown as a native tooltip. Required. */
  label: string;
  /** Hover colour, hinting at what the action does. @default "default" */
  tone?: "default" | "primary" | "success" | "danger";
  size?: "sm" | "md";
  loading?: boolean;
  children: React.ReactNode;
}

/** Square icon-only button with a required accessible name. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      label,
      tone = "default",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={clsx(
        "pw-icon-button",
        `pw-icon-button--${tone}`,
        `pw-icon-button--${size}`,
        className,
      )}
      {...props}
    >
      {loading ? <span className="pw-icon-button__spinner" aria-hidden="true" /> : children}
    </button>
  ),
);

IconButton.displayName = "IconButton";
