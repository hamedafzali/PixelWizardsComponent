import React from "react";
import { clsx } from "clsx";
import { DrawerProps } from "./Drawer.types";

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  children,
  position = "right",
}) => {
  if (!open) return null;
  return (
    <div className="pw-drawer__backdrop" onMouseDown={onClose}>
      <div
        className={clsx("pw-drawer", `pw-drawer--${position}`)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="pw-drawer__header">
          <div className="pw-drawer__title">{title}</div>
          <button className="pw-drawer__close" onClick={onClose} type="button">
            ×
          </button>
        </div>
        <div className="pw-drawer__body">{children}</div>
      </div>
    </div>
  );
};
