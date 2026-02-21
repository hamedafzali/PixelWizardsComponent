import React, { useEffect, useRef } from "react";
import { CheckboxProps } from "./Checkbox.types";
import { clsx } from "clsx";
import { useTheme } from "../../themes";

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  indeterminate = false,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  className,
  size = "md",
  ...props
}) => {
  const { theme } = useTheme ? useTheme() : { theme: {} };
  const inputRef = useRef<HTMLInputElement>(null);

  // Indeterminate visual state
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // ARIA status
  const ariaChecked = indeterminate ? "mixed" : checked;

  return (
    <label
      className={clsx("pw-checkbox-label", className, `pw-checkbox--${size}`, {
        "pw-checkbox--disabled": disabled,
        "pw-checkbox--indeterminate": indeterminate,
      })}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <input
        ref={inputRef}
        type="checkbox"
        className="pw-checkbox-input"
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        aria-checked={ariaChecked}
        aria-disabled={disabled}
        onChange={onChange}
        {...props}
        style={{
          width: size === "sm" ? 16 : size === "lg" ? 24 : 20,
          height: size === "sm" ? 16 : size === "lg" ? 24 : 20,
          accentColor: "var(--checkbox-color, #3b82f6)",
        }}
      />
      <span
        className="pw-checkbox-custom"
        style={{
          display: "inline-block",
          width: size === "sm" ? 16 : size === "lg" ? 24 : 20,
          height: size === "sm" ? 16 : size === "lg" ? 24 : 20,
          borderRadius: 4,
          border: "2px solid var(--checkbox-border, #ccc)",
          background: "var(--checkbox-bg, #fff)",
          position: "relative",
          marginRight: 4,
        }}
      >
        {/* Tick or indeterminate icon */}
        {(checked || indeterminate) && (
          <svg
            width={size === "sm" ? 12 : size === "lg" ? 18 : 14}
            height={size === "sm" ? 12 : size === "lg" ? 18 : 14}
            viewBox="0 0 16 16"
            style={{ position: "absolute", top: 2, left: 2 }}
            aria-hidden="true"
          >
            {indeterminate ? (
              <rect
                x="2.5"
                y="6.5"
                width="11"
                height="3"
                rx="1.2"
                fill="var(--checkbox-color, #3b82f6)"
              />
            ) : (
              <polyline
                points="4 8.5 7 12 12.5 5"
                fill="none"
                stroke="var(--checkbox-color, #3b82f6)"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        )}
      </span>
      {label && (
        <span className="pw-checkbox-text" style={{ userSelect: "none" }}>
          {label}
        </span>
      )}
    </label>
  );
};
