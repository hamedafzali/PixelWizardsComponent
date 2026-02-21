import {
  ButtonHTMLAttributes,
  ReactNode,
  ReactElement,
  ComponentType,
} from "react";

type IconType =
  | ComponentType<{ size?: number; className?: string }>
  | ReactElement
  | string
  | null;

/**
 * Props for the Button component.
 * - Use for actions, form submits, navigation, etc.
 * - Accessible out-of-the-box with ARIA.
 */
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  /** Button style variant */
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  /** Size of the button */
  size?: "sm" | "md" | "lg" | "xl";
  /** Disable the button and apply aria-disabled */
  disabled?: boolean;
  /** Show loading state: aria-busy, disables interactions */
  loading?: boolean;
  /** Icon to display before or after the button text */
  icon?: IconType;
  /** Position of the icon relative to the text */
  iconPosition?: "left" | "right";
  /** Make the button take up the full width of its container */
  fullWidth?: boolean;
  /** Button content */
  children?: ReactNode;
  /** Additional class name */
  className?: string;
}

