import { InputHTMLAttributes, ReactNode } from "react";

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: ReactNode;
  helperText?: ReactNode;
  size?: "sm" | "md" | "lg";
}
