import { ReactNode, HTMLAttributes } from 'react';

export type AlertStatus = 'info' | 'success' | 'warning' | 'error';

/**
 * Props for Alert component
 */
export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Status (affects color/icon), default: info */
  status?: AlertStatus;
  /** Title/header text */
  title?: ReactNode;
  /** Main content/message (children) */
  children: ReactNode;
  /** Optional icon (customizes or replaces default status icon) */
  icon?: ReactNode;
  /** Enable dismissable alert (shows close button) */
  dismissable?: boolean;
  /** Called when alert closes (needed if dismissable) */
  onClose?: () => void;
  /** Additional className */
  className?: string;
  /** Show as toast overlay/floating */
  toast?: boolean;
}
