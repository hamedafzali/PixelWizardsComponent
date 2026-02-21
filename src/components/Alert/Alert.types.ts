import { ReactNode } from "react";

export type AlertStatus = "info" | "success" | "warning" | "error";

/**
 * Props for Alert component
 */
export interface AlertProps {
  /** Status (affects color/icon), default: info */
  status?: AlertStatus;
  /** Alert title */
  title?: string;
  /** Alert description */
  description?: string;
  /** Show close button, default: false */
  closable?: boolean;
  /** Callback when close button clicked */
  onClose?: () => void;
  /** Alert variant, default: subtle */
  variant?: "subtle" | "solid" | "left-accent";
  /** Alert icon, overrides default */
  icon?: ReactNode;
  /** Optional custom className */
  className?: string;
  /** Show as toast overlay/floating */
  toast?: boolean;
}
