import React, { useEffect } from "react";
import { clsx } from "clsx";
import { AlertStatus } from "../Alert";
import { ToastProps } from "./Toast.types";

const statusClass: Record<AlertStatus, string> = {
  info: "pw-toast--info",
  success: "pw-toast--success",
  warning: "pw-toast--warning",
  error: "pw-toast--error",
};

export const Toast: React.FC<ToastProps> = ({
  open,
  status = "info",
  title,
  description,
  duration = 4000,
  closable = true,
  position = "top-right",
  actionLabel,
  onAction,
  onClose,
  className,
  icon,
  stackIndex = 0,
  stackSpacing = 84,
  style,
}) => {
  useEffect(() => {
    if (!open || duration <= 0 || !onClose) return;
    const timer = window.setTimeout(() => onClose(), duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, onClose]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const isTop = position.startsWith("top");
  const translateY = isTop
    ? stackIndex * stackSpacing
    : stackIndex * stackSpacing * -1;

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        "pw-toast",
        statusClass[status],
        `pw-toast--${position}`,
        className,
      )}
      style={{
        ["--pw-toast-duration" as string]: `${duration}ms`,
        transform: `translateY(${translateY}px)`,
        ...style,
      }}
    >
      {icon && <span className="pw-toast__icon">{icon}</span>}
      <div className="pw-toast__content">
        {title && <div className="pw-toast__title">{title}</div>}
        {description && <div className="pw-toast__desc">{description}</div>}
      </div>
      {actionLabel && (
        <button type="button" className="pw-toast__action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
      {closable && (
        <button
          type="button"
          className="pw-toast__close"
          onClick={onClose}
          aria-label="Dismiss toast"
        >
          ×
        </button>
      )}
      {duration > 0 && <span className="pw-toast__timer" aria-hidden="true" />}
    </div>
  );
};
