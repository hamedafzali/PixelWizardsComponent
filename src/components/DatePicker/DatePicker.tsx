import React, { forwardRef, useId } from "react";
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
        <input
          ref={ref}
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
