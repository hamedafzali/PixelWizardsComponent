import { forwardRef, useId } from "react";
import { clsx } from "clsx";
import { useTheme } from "../../themes";
import { InputProps } from "./Input.types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      size = "md",
      variant = "default",
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled = false,
      required = false,
      style,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const inputId = useId();

    const getVariantClasses = () => {
      const variants = {
        default: "pw-input--default",
        filled: "pw-input--filled",
        outlined: "pw-input--outlined",
      };
      return variants[variant];
    };

    const getSizeClasses = () => {
      const sizes = {
        sm: "pw-input--sm",
        md: "pw-input--md",
        lg: "pw-input--lg",
      };
      return sizes[size];
    };

    const inputClasses = clsx(
      "pw-input",
      getVariantClasses(),
      getSizeClasses(),
      {
        "pw-input--error": error,
        "pw-input--disabled": disabled,
        "pw-input--with-left-icon": leftIcon,
        "pw-input--with-right-icon": rightIcon,
        "pw-input--full-width": fullWidth,
      },
      className,
    );

    const inputStyle = {
      ...style,
      // CSS custom properties for theming
      "--primary-color": theme.colors.primary[600],
      "--error-color": theme.colors.error[600],
      "--text-color": theme.colors.semantic.text.primary,
      "--border-color": theme.colors.semantic.border.primary,
      "--background-color": theme.colors.semantic.surface.primary,
    } as React.CSSProperties;

    const labelStyle = {
      color: theme.colors.semantic.text.primary,
    } as React.CSSProperties;

    const helperStyle = {
      color: error
        ? theme.colors.error[600]
        : theme.colors.semantic.text.secondary,
    } as React.CSSProperties;

    return (
      <div
        className={clsx("pw-input-wrapper", {
          "pw-input-wrapper--full-width": fullWidth,
        })}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="pw-input-label"
            style={labelStyle}
          >
            {label}
            {required && (
              <span className="pw-input-required" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <div className="pw-input-container">
          {leftIcon && (
            <div className="pw-input-icon pw-input-icon--left">{leftIcon}</div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            style={inputStyle}
            disabled={disabled}
            aria-disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error || helper ? `${inputId}-helper` : undefined}
            {...props}
          />

          {rightIcon && (
            <div className="pw-input-icon pw-input-icon--right">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helper) && (
          <div
            id={`${inputId}-helper`}
            className={clsx("pw-input-helper", {
              "pw-input-helper--error": error,
            })}
            style={helperStyle}
          >
            {error || helper}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
