import { ReactNode, HTMLAttributes } from 'react';

/**
 * Props for the Modal component.
 */
export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Controls whether the modal is open.
   */
  open: boolean;
  /**
   * Called when the modal requests closing (backdrop, ESC, etc).
   */
  onClose: () => void;
  /**
   * Modal content (body area).
   */
  children: ReactNode;
  /**
   * Optional title (for accessibility). Use h2/h3 or provide your own header.
   */
  title?: ReactNode;
  /**
   * Content to render at top of modal (header area).
   */
  header?: ReactNode;
  /**
   * Content to render at bottom of modal (footer area).
   */
  footer?: ReactNode;
  /**
   * Disables closing via backdrop or ESC (for required confirmations, etc).
   */
  disableClose?: boolean;
  /**
   * Additional className for modal root.
   */
  className?: string;
}

