import React, { useState } from "react";
import { clsx } from "clsx";
import { ToggleGroupProps } from "./ToggleGroup.types";

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  items,
  value,
  defaultValue,
  multiple = false,
  onChange,
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
      if (list.includes(id)) {
        setValue(list.filter((item) => item !== id));
      } else {
        setValue([...list, id]);
      }
    } else {
      setValue(id);
    }
  };

  return (
    <div className={clsx("pw-toggle-group", className)}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={clsx("pw-toggle-group__item", {
            "pw-toggle-group__item--active": isActive(item.id),
            "pw-toggle-group__item--disabled": item.disabled,
          })}
          disabled={item.disabled}
          onClick={() => {
            if (!item.disabled) toggle(item.id);
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
