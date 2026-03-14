import { ReactNode } from "react";

export interface ToggleGroupItem {
  id: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface ToggleGroupProps {
  items: ToggleGroupItem[];
  value?: string | string[];
  defaultValue?: string | string[];
  multiple?: boolean;
  onChange?: (value: string | string[]) => void;
  className?: string;
}
