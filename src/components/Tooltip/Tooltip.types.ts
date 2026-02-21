import { ReactNode, HTMLAttributes } from 'react';

/** Tooltip position variants */
export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

/**
 * Props for Tooltip component.
 */
export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The tooltip content */
  content: ReactNode;
  /** Where to place the tooltip relative to the child (default: top) */
  placement?: TooltipPlacement;
  /** Delay before showing (ms, default: 100) */
  showDelay?: number;
  /** Delay before hiding (ms, default: 80) */
  hideDelay?: number;
  /**
   * Single child element that receives the tooltip. 
   * Tooltip wraps and clones this child, adding ARIA and event handlers.
   */
  children: ReactNode;
  /** Optional custom className */
  className?: string;
}
