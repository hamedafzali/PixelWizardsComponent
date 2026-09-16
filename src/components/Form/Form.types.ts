import { FormEvent, FormHTMLAttributes, ReactNode } from "react";

export interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
}

export interface FormFieldProps {
  label?: ReactNode;
  htmlFor?: string;
  error?: ReactNode;
  helper?: ReactNode;
  required?: boolean;
  children: ReactNode;
  className?: string;
}
