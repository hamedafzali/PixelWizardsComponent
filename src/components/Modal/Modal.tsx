import React, { useEffect, useId, useRef } from "react";
import { clsx } from "clsx";
import { ModalProps } from "./Modal.types";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible, styled Modal/Dialog component.
 * - Focus moves into the dialog, Tab cycles inside it, and focus returns to
 *   the opener on close.
 * - ESC/backdrop closes unless disabled; with stacked dialogs only the
 *   innermost one reacts.
 * - Becomes a bottom sheet on narrow screens.
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  title,
  header,
  footer,
  disableClose,
  size = "md",
  className,
  ...props
}) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  const disableRef = useRef(disableClose);
  useEffect(() => {
    closeRef.current = onClose;
    disableRef.current = disableClose;
  });

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const el = dialogRef.current;
    if (el && !el.contains(document.activeElement)) {
      const first = el
        .querySelector(".pw-modal__body")
        ?.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? el).focus();
    }

    const onKey = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      if (!el || active?.closest('[role="dialog"]') !== el) return;
      if (e.key === "Escape") {
        if (!disableRef.current) closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  const handleBackdrop = (e: React.MouseEvent) => {
    if (!disableClose && e.target === e.currentTarget) onClose();
  };

  return (
    <div className="pw-modal-backdrop pw-modal-open" onMouseDown={handleBackdrop}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={clsx("pw-modal", `pw-modal--${size}`, className)}
        {...props}
      >
        {(header || title || !disableClose) && (
          <div className="pw-modal__header">
            <div className="pw-modal__heading">
              {title ? (
                <h2 id={titleId} className="pw-modal__title">
                  {title}
                </h2>
              ) : null}
              {header}
            </div>
            {!disableClose && (
              <button
                type="button"
                aria-label="Close dialog"
                className="pw-modal__close"
                onClick={onClose}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path
                    d="M18 6 6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="pw-modal__body">{children}</div>
        {footer && <div className="pw-modal__footer">{footer}</div>}
      </div>
    </div>
  );
};
