import React from "react";
import { clsx } from "clsx";
import { FormFieldProps } from "./Form.types";

const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  error,
  helper,
  required,
  children,
  className,
}) => {
  return (
    <div className={clsx("pw-form-field", className)}>
      {label && (
        <label htmlFor={htmlFor} className="pw-form-field__label">
          {label}
          {required && (
            <span className="pw-form-field__required" aria-label="required">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      {children}
      {(error || helper) && (
        <div
          className={clsx("pw-form-field__helper", {
            "pw-form-field__helper--error": error,
          })}
          role={error ? "alert" : undefined}
        >
          {error || helper}
        </div>
      )}
    </div>
  );
};

FormField.displayName = "FormField";

export { FormField };
