import React, { useState } from "react";
import { clsx } from "clsx";
import { ToggleGroupProps } from "./ToggleGroup.types";

/**
 * A row of toggle buttons.
 * - Single selection behaves as a radio group (arrow keys move the choice).
 * - Multiple selection exposes each button as pressed or not.
 */
export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  items,
  value,
  defaultValue,
  multiple = false,
  onChange,
  variant = "chips",
  size = "md",
  ariaLabel,
  collapseLabels = false,
  className,
}) => {
  const [internal, setInternal] = useState<string | string[]>(
    defaultValue ?? (multiple ? [] : ""),
  );
  const current = value ?? internal;

  const setValue = (next: string | string[]) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const isActive = (id: string) =>
    Array.isArray(current) ? current.includes(id) : current === id;

  const toggle = (id: string) => {
    if (multiple) {
      const list = Array.isArray(current) ? current : [];
      setValue(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
    } else {
      setValue(id);
    }
  };

  const enabled = items.filter((item) => !item.disabled);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (multiple) return;
    const step =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!step || !enabled.length) return;
    e.preventDefault();
    const i = enabled.findIndex((item) => isActive(item.id));
    const next = enabled[(i + step + enabled.length) % enabled.length];
    setValue(next.id);
    Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>("button"))
      .find((button) => button.dataset.id === next.id)
      ?.focus();
  };

  // In a radio group only the selected item is in the tab order.
  const tabStop = multiple
    ? null
    : (enabled.find((item) => isActive(item.id)) ?? enabled[0])?.id;

  return (
    <div
      role={multiple ? "group" : "radiogroup"}
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={clsx(
        "pw-toggle-group",
        `pw-toggle-group--${variant}`,
        `pw-toggle-group--${size}`,
        { "pw-toggle-group--collapse": collapseLabels },
        className,
      )}
    >
      {items.map((item) => {
        const active = isActive(item.id);
        return (
          <button
            key={item.id}
            data-id={item.id}
            type="button"
            role={multiple ? undefined : "radio"}
            aria-checked={multiple ? undefined : active}
            aria-pressed={multiple ? active : undefined}
            aria-label={collapseLabels ? item.title : undefined}
            title={item.title}
            tabIndex={multiple ? undefined : item.id === tabStop ? 0 : -1}
            className={clsx("pw-toggle-group__item", {
              "pw-toggle-group__item--active": active,
              "pw-toggle-group__item--disabled": item.disabled,
            })}
            disabled={item.disabled}
            onClick={() => {
              if (!item.disabled) toggle(item.id);
            }}
          >
            {item.icon && (
              <span className="pw-toggle-group__icon" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className="pw-toggle-group__label">{item.label}</span>
            {item.count !== undefined && (
              <span className="pw-toggle-group__count">{item.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
