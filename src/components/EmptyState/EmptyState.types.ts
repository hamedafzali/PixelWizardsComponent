import { ReactNode } from "react";

export interface EmptyStateProps {
  title: ReactNode;
  /** Illustration or icon shown above the title. */
  icon?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}
