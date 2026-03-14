import React from "react";
import { clsx } from "clsx";
import { RadioGroupProps, RadioProps } from "./Radio.types";

export const Radio: React.FC<RadioProps> = ({
  label,
  checked,
  defaultChecked,
  disabled = false,
  size = "md",
  className,
  ...props
}) => {
  return (
    <label
      className={clsx("pw-radio-label", className, `pw-radio--${size}`, {
        "pw-radio--disabled": disabled,
      })}
    >
      <input
        type="radio"
        className="pw-radio-input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-disabled={disabled}
        {...props}
      />
      <span className="pw-radio-custom" aria-hidden="true">
        <span className="pw-radio-dot" />
      </span>
      {label && <span className="pw-radio-text">{label}</span>}
    </label>
  );
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  defaultValue,
  options,
  onChange,
  disabled = false,
  size = "md",
  className,
}) => {
  return (
    <div className={clsx("pw-radio-group", className)}>
      {options.map((option) => {
        const isDisabled = disabled || option.disabled;
        return (
          <Radio
            key={`${name}-${option.value}`}
            name={name}
            value={option.value}
            label={option.label}
            checked={value !== undefined ? value === option.value : undefined}
            defaultChecked={
              value === undefined ? defaultValue === option.value : undefined
            }
            disabled={isDisabled}
            size={size}
            onChange={() => {
              if (!isDisabled) {
                onChange?.(option.value);
              }
            }}
          />
        );
      })}
    </div>
  );
};
