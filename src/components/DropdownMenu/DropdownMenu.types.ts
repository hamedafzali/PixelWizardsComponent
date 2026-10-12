import { ReactNode } from "react";

export interface DropdownMenuItem {
  label: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  /** Icon shown before the label. */
  icon?: ReactNode;
  /** Style as a destructive action. */
  danger?: boolean;
  /** Draw a separator above this item, to group related actions. */
  dividerAbove?: boolean;
}

export interface DropdownMenuProps {
  /** Trigger content. Defaults to a "more" (three dots) icon. */
  label?: ReactNode;
  items: DropdownMenuItem[];
  align?: "left" | "right";
  /**
   * Accessible name for the trigger and menu. Required when the trigger is
   * icon-only. @default "More actions"
   */
  triggerLabel?: string;
  /** Render the trigger as a compact square icon button. */
  iconTrigger?: boolean;
  /** Trigger look when it has a label: outlined (default) or a primary button. */
  triggerVariant?: "outline" | "primary";
  className?: string;
  triggerClassName?: string;
}
