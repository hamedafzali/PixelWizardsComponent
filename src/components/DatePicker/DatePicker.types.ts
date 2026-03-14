import { InputHTMLAttributes, ReactNode } from "react";

export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: ReactNode;
  error?: ReactNode;
  helper?: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "filled";
  fullWidth?: boolean;
}
