import { ReactNode } from "react";

/** Tooltip position variants */
export type TooltipPlacement = "top" | "right" | "bottom" | "left";

/**
 * Props for Tooltip component.
 */
export interface TooltipProps {
  /** The tooltip content */
  content: ReactNode;
  /** Where to place the tooltip relative to the child (default: top) */
  placement?: TooltipPlacement;
  /** Delay before showing (ms, default: 100) */
  showDelay?: number;
  /** Delay before hiding (ms, default: 80) */
  hideDelay?: number;
  /** Disable tooltip rendering and interactions */
  disabled?: boolean;
  /** Max width of tooltip content */
  maxWidth?: number | string;
  /** Space between trigger and tooltip */
  offset?: number;
  /**
   * Single child element that receives the tooltip.
   */
  children: ReactNode;
  /** Optional custom className */
  className?: string;
}
