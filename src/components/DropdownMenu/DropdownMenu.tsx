import React, { useEffect, useRef, useState } from "react";
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
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
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

  return (
    <div ref={rootRef} className={clsx("pw-dropdown", className)}>
      <button
        type="button"
        className="pw-dropdown__trigger"
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {label}
      </button>
      {open &&
        createPortal(
          <div
            className={clsx("pw-dropdown__menu", `pw-dropdown__menu--${align}`)}
            style={{ position: "fixed", top: menuPos.top, left: menuPos.left, right: menuPos.right }}
          >
            {items.map((item, index) => (
              <button
                key={index}
                type="button"
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
