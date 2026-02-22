import React from "react";
import { AlertProps, AlertStatus } from "./Alert.types";
import { clsx } from "clsx";

const statusIcon: Record<AlertStatus, React.JSX.Element> = {
  info: (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
      <rect x="9" y="7" width="2" height="2" rx="1" fill="currentColor" />
      <rect x="9" y="10" width="2" height="5" rx="1" fill="currentColor" />
    </svg>
  ),
  success: (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
      <polyline
        points="6 11 9 14 15 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  warning: (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
      <rect x="9" y="6" width="2" height="6" rx="1" fill="currentColor" />
      <rect x="9" y="14" width="2" height="2" rx="1" fill="currentColor" />
    </svg>
  ),
  error: (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
      <rect x="9" y="7" width="2" height="6" rx="1" fill="currentColor" />
      <rect x="9" y="14" width="2" height="2" rx="1" fill="currentColor" />
    </svg>
  ),
};

export const Alert: React.FC<AlertProps> = ({
  status = "info",
  title,
  description,
  icon,
  closable = false,
  onClose,
  className,
  variant = "subtle",
  toast = false,
}) => {
  const isAssertive = status === "error" || status === "warning";

  return (
    <div
      role={isAssertive ? "alert" : "status"}
      aria-live={isAssertive ? "assertive" : "polite"}
      className={clsx(
        "pw-alert",
        className,
        `pw-alert--${status}`,
        `pw-alert--${variant}`,
        {
          "pw-alert--toast": toast,
          "pw-alert--closable": closable,
        },
      )}
    >
      <span className="pw-alert__icon" aria-hidden="true">
        {icon ?? statusIcon[status]}
      </span>
      <div className="pw-alert__content">
        {title && (
          <div className="pw-alert__title">{title}</div>
        )}
        {description && <div className="pw-alert__desc">{description}</div>}
      </div>
      {closable && (
        <button
          type="button"
          aria-label="Dismiss alert"
          onClick={onClose}
          tabIndex={0}
          className="pw-alert__close"
        >
          ×
        </button>
      )}
    </div>
  );
};
