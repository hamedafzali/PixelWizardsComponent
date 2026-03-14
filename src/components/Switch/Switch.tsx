import React from "react";
import { clsx } from "clsx";
import { SwitchProps } from "./Switch.types";

export const Switch: React.FC<SwitchProps> = ({
  label,
  checked,
  defaultChecked,
  disabled = false,
  size = "md",
  helperText,
  className,
  ...props
}) => {
  return (
    <label
      className={clsx("pw-switch", className, `pw-switch--${size}`, {
        "pw-switch--disabled": disabled,
      })}
    >
      <span className="pw-switch__control">
        <input
          type="checkbox"
          className="pw-switch__input"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-disabled={disabled}
          {...props}
        />
        <span className="pw-switch__track" aria-hidden="true">
          <span className="pw-switch__thumb" />
        </span>
      </span>
      {label && <span className="pw-switch__label">{label}</span>}
      {helperText && <span className="pw-switch__helper">{helperText}</span>}
    </label>
  );
};
