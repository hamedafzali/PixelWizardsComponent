import React, { useEffect, useRef } from "react";
import { clsx } from "clsx";
import { DrawerProps } from "./Drawer.types";

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  children,
  position = "right",
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="pw-drawer__backdrop" onMouseDown={onClose} aria-hidden={!open}>
      <div
        ref={drawerRef}
        className={clsx("pw-drawer", `pw-drawer--${position}`)}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : "Drawer"}
        tabIndex={-1}
      >
        <div className="pw-drawer__header">
          <div className="pw-drawer__title">{title}</div>
          <button ref={closeRef} className="pw-drawer__close" onClick={onClose} type="button">
            ×
          </button>
        </div>
        <div className="pw-drawer__body">{children}</div>
      </div>
    </div>
  );
};
