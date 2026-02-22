import { ReactNode } from "react";
import { AlertStatus } from "../Alert";
import { CSSProperties } from "react";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface ToastProps {
  open: boolean;
  status?: AlertStatus;
  title?: string;
  description?: string;
  duration?: number;
  closable?: boolean;
  position?: ToastPosition;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  className?: string;
  icon?: ReactNode;
  /** zero-based index in a stack for offsetting older toasts */
  stackIndex?: number;
  /** pixel distance between stacked toasts */
  stackSpacing?: number;
  /** optional style overrides */
  style?: CSSProperties;
}
