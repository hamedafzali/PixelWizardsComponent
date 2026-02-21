import React, { useEffect, useRef } from "react";
import { ModalProps } from "./Modal.types";
import { useTheme } from "../../themes";
import { clsx } from "clsx";

/**
 * Accessible, styled Modal/Dialog component.
 * - Trap focus, restore on close.
 * - ESC/backdrop closes unless disabled.
 * - Light/dark theme with CSS vars.
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  title,
  header,
  footer,
  disableClose,
  className,
  ...props
}) => {
  const { theme } = useTheme ? useTheme() : { theme: {} };
  const dialogRef = useRef<HTMLDivElement>(null);

  // Trap focus when open
  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const prev = document.activeElement as HTMLElement;
    dialogRef.current.focus();
    const handleFocus = (e: FocusEvent) => {
      if (!dialogRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        dialogRef.current?.focus();
      }
    };
    document.addEventListener("focus", handleFocus, true);
    return () => {
      document.removeEventListener("focus", handleFocus, true);
      if (prev) prev.focus();
    };
  }, [open]);

  // ESC key closes
  useEffect(() => {
    if (!open || disableClose) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, disableClose, onClose]);

  if (!open) return null;

  // Backdrop click closes
  const handleBackdrop = (e: React.MouseEvent) => {
    if (!disableClose && e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={clsx("pw-modal-backdrop", { "pw-modal-open": open })}
      style={{
        position: "fixed",
        zIndex: 1000,
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      tabIndex={-1}
      aria-hidden={!open}
      onMouseDown={handleBackdrop}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "pw-modal-title" : undefined}
        className={clsx("pw-modal", className)}
        style={{
          minWidth: 320,
          maxWidth: 540,
          width: "100%",
          background: "var(--modal-bg, #fff)",
          color: "var(--modal-color, #111)",
          borderRadius: "var(--radius-lg, 16px)",
          boxShadow:
            (theme as any)?.shadows?.xl || "0 8px 32px rgba(0,0,0,0.15)",
          padding: 24,
          outline: "none",
          ...props.style,
        }}
        tabIndex={0}
        {...props}
      >
        {header || title ? (
          <div className="pw-modal__header">
            {title ? (
              <div
                id="pw-modal-title"
                style={{
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  marginBottom: 8,
                }}
              >
                {title}
              </div>
            ) : null}
            {header}
          </div>
        ) : null}
        <div className="pw-modal__body">{children}</div>
        {footer && <div className="pw-modal__footer">{footer}</div>}
        {!disableClose && (
          <button
            aria-label="Close dialog"
            className="pw-modal__close"
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
