import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";
import { DropdownMenuProps } from "./DropdownMenu.types";

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
    <circle cx="5" cy="12" r="1.75" />
    <circle cx="12" cy="12" r="1.75" />
    <circle cx="19" cy="12" r="1.75" />
  </svg>
);

/**
 * Menu of secondary actions behind a trigger button.
 * - Arrow keys, Home and End move between items; Escape and Tab close it.
 * - Rendered in a portal so it is never clipped by a card's overflow.
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  items,
  align = "left",
  triggerLabel = "More actions",
  iconTrigger,
  triggerVariant = "outline",
  className,
  triggerClassName,
}) => {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left?: number; right?: number }>({
    top: 0,
  });
  const iconOnly = iconTrigger ?? label === undefined;

  const enabledItems = () =>
    Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="menuitem"]:not([disabled])',
      ) ?? [],
    );

  const close = (restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!rootRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    // The menu is fixed-positioned, so it would drift away from its
    // trigger when the page scrolls or resizes; close it instead.
    const onMove = (e: Event) => {
      if (menuRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onMove);
    window.addEventListener("scroll", onMove, true);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onMove);
      window.removeEventListener("scroll", onMove, true);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuHeight = menuRef.current?.offsetHeight ?? 0;
    // Open upwards when there is not enough room below the trigger.
    const below = rect.bottom + 6;
    const top =
      menuHeight && below + menuHeight > window.innerHeight - 8 && rect.top > menuHeight + 8
        ? rect.top - menuHeight - 6
        : below;
    if (align === "right") {
      setMenuPos({ top, right: Math.max(8, window.innerWidth - rect.right) });
    } else {
      setMenuPos({ top, left: Math.max(8, rect.left) });
    }
    enabledItems()[0]?.focus();
  }, [open, align]);

  const onMenuKey = (e: React.KeyboardEvent) => {
    const list = enabledItems();
    const i = list.indexOf(document.activeElement as HTMLButtonElement);
    const move = (n: number) => {
      e.preventDefault();
      list[(n + list.length) % list.length]?.focus();
    };
    if (e.key === "ArrowDown") move(i + 1);
    else if (e.key === "ArrowUp") move(i - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(list.length - 1);
    else if (e.key === "Tab") close(false);
  };

  return (
    <div ref={rootRef} className={clsx("pw-dropdown", className)}>
      <button
        type="button"
        className={clsx(
          "pw-dropdown__trigger",
          {
            "pw-dropdown__trigger--icon": iconOnly,
            "pw-dropdown__trigger--primary": !iconOnly && triggerVariant === "primary",
          },
          triggerClassName,
        )}
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={iconOnly ? triggerLabel : undefined}
        title={iconOnly ? triggerLabel : undefined}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
      >
        {label ?? <MoreIcon />}
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label={triggerLabel}
            onKeyDown={onMenuKey}
            className={clsx("pw-dropdown__menu", `pw-dropdown__menu--${align}`)}
            style={{
              position: "fixed",
              top: menuPos.top,
              left: menuPos.left,
              right: menuPos.right,
            }}
          >
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.dividerAbove && index > 0 && (
                  <div role="separator" className="pw-dropdown__separator" />
                )}
                <button
                  type="button"
                  role="menuitem"
                  tabIndex={-1}
                  className={clsx("pw-dropdown__item", {
                    "pw-dropdown__item--disabled": item.disabled,
                    "pw-dropdown__item--danger": item.danger,
                  })}
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.disabled) return;
                    close(true);
                    item.onClick?.();
                  }}
                >
                  {item.icon && (
                    <span className="pw-dropdown__item-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="pw-dropdown__item-label">{item.label}</span>
                </button>
              </React.Fragment>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
};
