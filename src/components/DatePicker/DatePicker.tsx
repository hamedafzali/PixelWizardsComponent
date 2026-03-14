import React, { forwardRef, useId, useRef } from "react";
import { clsx } from "clsx";
import { DatePickerProps } from "./DatePicker.types";

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      label,
      error,
      helper,
      size = "md",
      variant = "default",
      fullWidth = false,
      className,
      disabled = false,
      required = false,
      ...props
    },
    ref,
  ) => {
    const inputId = useId();
    const localRef = useRef<HTMLInputElement>(null);

    const setRef = (node: HTMLInputElement | null) => {
      localRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    };

    const openPicker = () => {
      const el = localRef.current;
      if (!el) return;
      if (typeof (el as HTMLInputElement & { showPicker?: () => void }).showPicker === "function") {
        (el as HTMLInputElement & { showPicker: () => void }).showPicker();
      } else {
        el.focus();
        el.click();
      }
    };

    const sizeClass =
      size === "sm"
        ? "pw-date-picker--sm"
        : size === "lg"
        ? "pw-date-picker--lg"
        : "pw-date-picker--md";
    const variantClass =
      variant === "filled"
        ? "pw-date-picker--filled"
        : variant === "outlined"
        ? "pw-date-picker--outlined"
        : "pw-date-picker--default";

    return (
      <div
        className={clsx("pw-date-picker-wrapper", {
          "pw-date-picker-wrapper--full-width": fullWidth,
        })}
      >
        {label && (
          <label htmlFor={inputId} className="pw-date-picker-label">
            {label}
            {required && (
              <span className="pw-date-picker-required" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <div className="pw-date-picker__field">
          <input
            ref={setRef}
          id={inputId}
          type="date"
          className={clsx(
            "pw-date-picker",
            sizeClass,
            variantClass,
            {
              "pw-date-picker--error": !!error,
              "pw-date-picker--disabled": disabled,
              "pw-date-picker--full-width": fullWidth,
            },
            className,
          )}
          disabled={disabled}
          aria-disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error || helper ? `${inputId}-helper` : undefined}
          {...props}
          />
          <button
            type="button"
            className="pw-date-picker__icon"
            onClick={openPicker}
            aria-label="Open date picker"
            disabled={disabled}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 3v4M17 3v4M3.5 9.5h17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {(error || helper) && (
          <div
            id={`${inputId}-helper`}
            className={clsx("pw-date-picker-helper", {
              "pw-date-picker-helper--error": !!error,
            })}
          >
            {error || helper}
          </div>
        )}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
