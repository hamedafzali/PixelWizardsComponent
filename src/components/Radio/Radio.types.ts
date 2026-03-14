import { InputHTMLAttributes, ReactNode } from "react";

export interface RadioOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export interface RadioGroupProps {
  name: string;
  value?: string | number;
  defaultValue?: string | number;
  options: RadioOption[];
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}
