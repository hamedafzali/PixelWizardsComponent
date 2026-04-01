import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";
import { DropdownMenuProps } from "./DropdownMenu.types";

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  items,
  align = "left",
  className,
}) => {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left?: number; right?: number }>({ top: 0 });

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const top = rect.bottom + 8;
    if (align === "right") {
      setMenuPos({ top, right: Math.max(8, window.innerWidth - rect.right) });
    } else {
      setMenuPos({ top, left: Math.max(8, rect.left) });
    }
  }, [open, align]);

  useEffect(() => {
    if (!open) return;
    firstItemRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div ref={rootRef} className={clsx("pw-dropdown", className)}>
      <button
        type="button"
        className="pw-dropdown__trigger"
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
      >
        {label}
      </button>
      {open &&
        createPortal(
          <div
            id={menuId}
            role="menu"
            className={clsx("pw-dropdown__menu", `pw-dropdown__menu--${align}`)}
            style={{ position: "fixed", top: menuPos.top, left: menuPos.left, right: menuPos.right }}
          >
            {items.map((item, index) => (
              <button
                key={index}
                ref={index === 0 ? firstItemRef : undefined}
                type="button"
                role="menuitem"
                className={clsx("pw-dropdown__item", {
                  "pw-dropdown__item--disabled": item.disabled,
                })}
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick?.();
                    setOpen(false);
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
};
