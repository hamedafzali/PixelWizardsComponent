import { ReactNode } from "react";

export interface DropdownMenuItem {
  label: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  label: ReactNode;
  items: DropdownMenuItem[];
  align?: "left" | "right";
  className?: string;
}
