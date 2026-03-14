import React, { forwardRef, useId } from "react";
import { clsx } from "clsx";
import { TextareaProps } from "./Textarea.types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
        ? "pw-textarea--sm"
        : size === "lg"
        ? "pw-textarea--lg"
        : "pw-textarea--md";
    const variantClass =
      variant === "filled"
        ? "pw-textarea--filled"
        : variant === "outlined"
        ? "pw-textarea--outlined"
        : "pw-textarea--default";

    return (
      <div
        className={clsx("pw-textarea-wrapper", {
          "pw-textarea-wrapper--full-width": fullWidth,
        })}
      >
        {label && (
          <label htmlFor={inputId} className="pw-textarea-label">
            {label}
            {required && (
              <span className="pw-textarea-required" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={clsx(
            "pw-textarea",
            sizeClass,
            variantClass,
            {
              "pw-textarea--error": !!error,
              "pw-textarea--disabled": disabled,
              "pw-textarea--full-width": fullWidth,
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
            className={clsx("pw-textarea-helper", {
              "pw-textarea-helper--error": !!error,
            })}
          >
            {error || helper}
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
