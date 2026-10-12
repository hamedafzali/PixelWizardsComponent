import { ElementType, HTMLAttributes, ReactNode } from "react";

/**
 * Props for Card component.
 * - Use for surface containers, grouping content, panels, etc.
 * - Pass role/aria-label yourself when the card is a landmark.
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "glass";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  rounded?: boolean;
  /** Raise the card on hover; use when the whole card is interactive. */
  hover?: boolean;
  children?: ReactNode;
}

export interface CardHeaderProps {
  /** Icon, avatar or status shown before the title. */
  leading?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Badges or chips shown under the title. */
  meta?: ReactNode;
  /** Buttons or a menu aligned to the top right. */
  actions?: ReactNode;
  /** Heading element for the title. @default "h3" */
  as?: ElementType;
  className?: string;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** @default "between" */
  justify?: "start" | "end" | "between";
}
