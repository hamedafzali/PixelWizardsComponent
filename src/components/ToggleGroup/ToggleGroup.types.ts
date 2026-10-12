import { ReactNode } from "react";

export interface ToggleGroupItem {
  id: string;
  label: ReactNode;
  disabled?: boolean;
  /** Icon shown before the label. */
  icon?: ReactNode;
  /** Count shown after the label, e.g. for filters. */
  count?: number;
  /** Tooltip and accessible name, useful when the label is hidden on small screens. */
  title?: string;
}

export interface ToggleGroupProps {
  items: ToggleGroupItem[];
  value?: string | string[];
  defaultValue?: string | string[];
  multiple?: boolean;
  onChange?: (value: string | string[]) => void;
  /**
   * "chips" are separate outlined buttons; "segmented" is a single
   * pill-shaped control, the usual look for view switchers and filters.
   * @default "chips"
   */
  variant?: "chips" | "segmented";
  size?: "sm" | "md";
  /** Accessible name for the group. */
  ariaLabel?: string;
  /** Hide item labels below 768px and show only icons. */
  collapseLabels?: boolean;
  className?: string;
}
