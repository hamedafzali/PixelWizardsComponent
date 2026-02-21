import React from "react";
import { AlertProps, AlertStatus } from "./Alert.types";
import { clsx } from "clsx";

const statusIcon: Record<AlertStatus, JSX.Element> = {
  info: (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="#2563eb" strokeWidth="2" />
      <rect x="9" y="7" width="2" height="2" rx="1" fill="#2563eb" />
      <rect x="9" y="10" width="2" height="5" rx="1" fill="#2563eb" />
    </svg>
  ),
  success: (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="#22c55e" strokeWidth="2" />
      <polyline
        points="6 11 9 14 15 8"
        fill="none"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  warning: (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="#fbbf24" strokeWidth="2" />
      <rect x="9" y="6" width="2" height="6" rx="1" fill="#fbbf24" />
      <rect x="9" y="14" width="2" height="2" rx="1" fill="#fbbf24" />
    </svg>
  ),
  error: (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="2" />
      <rect x="9" y="7" width="2" height="6" rx="1" fill="#ef4444" />
      <rect x="9" y="14" width="2" height="2" rx="1" fill="#ef4444" />
    </svg>
  ),
};

export const Alert: React.FC<AlertProps> = ({
  status = "info",
  title,
  children,
  icon,
  dismissable = false,
  onClose,
  className,
  toast = false,
  ...props
}) => {
  return (
    <div
      role="alert"
      className={clsx("pw-alert", className, `pw-alert--${status}`, {
        "pw-alert--toast": toast,
      })}
      style={{
        position: toast ? "fixed" : undefined,
        top: toast ? 24 : undefined,
        right: toast ? 24 : undefined,
        minWidth: toast ? 260 : undefined,
        maxWidth: 400,
        zIndex: toast ? 2000 : undefined,
        ...props.style,
      }}
      {...props}
    >
      <span
        style={{ fontSize: 22, marginTop: 1 }}
        className="pw-alert__icon"
        aria-hidden="true"
      >
        {icon ?? statusIcon[status]}
      </span>
      <div className="pw-alert__content" style={{ flex: 1 }}>
        {title && (
          <div
            className="pw-alert__title"
            style={{ fontWeight: 600, marginBottom: 2 }}
          >
            {title}
          </div>
        )}
        <div className="pw-alert__desc" style={{ fontSize: 15 }}>
          {children}
        </div>
      </div>
      {dismissable && (
        <button
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
