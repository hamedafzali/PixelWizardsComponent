import React from "react";
import { clsx } from "clsx";
import { SliderProps } from "./Slider.types";

export const Slider: React.FC<SliderProps> = ({
  label,
  helperText,
  size = "md",
  className,
  ...props
}) => {
  return (
    <div className={clsx("pw-slider", className, `pw-slider--${size}`)}>
      {label && <div className="pw-slider__label">{label}</div>}
      <input type="range" className="pw-slider__input" {...props} />
      {helperText && <div className="pw-slider__helper">{helperText}</div>}
    </div>
  );
};
