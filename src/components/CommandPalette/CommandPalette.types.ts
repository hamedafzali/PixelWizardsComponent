import { ReactNode } from "react";

export interface CommandItem {
  id: string;
  label: string;
  /** Group heading the item is listed under, e.g. "Pages" or "Containers". */
  group?: string;
  /** Secondary text shown after the label and searched too. */
  hint?: string;
  icon?: ReactNode;
  /** Extra words that should match this item. */
  keywords?: string[];
  /** Short key hint shown on the right, e.g. "G D". */
  shortcut?: string;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  /** Shown when nothing matches. @default "No results" */
  emptyText?: ReactNode;
  /** Max items per group before the rest are cut. @default 8 */
  groupLimit?: number;
}
