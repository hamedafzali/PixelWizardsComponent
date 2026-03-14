import { TextareaHTMLAttributes, ReactNode } from "react";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: ReactNode;
  error?: ReactNode;
  helper?: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "filled";
  fullWidth?: boolean;
}
