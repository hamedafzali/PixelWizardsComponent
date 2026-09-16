import React from "react";
import { clsx } from "clsx";
import { FormProps } from "./Form.types";

const Form: React.FC<FormProps> = ({ onSubmit, children, className, ...props }) => {
  return (
    <form noValidate onSubmit={onSubmit} className={clsx("pw-form", className)} {...props}>
      {children}
    </form>
  );
};

Form.displayName = "Form";

export { Form };
