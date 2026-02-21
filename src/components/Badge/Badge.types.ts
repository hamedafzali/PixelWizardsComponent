export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The visual style variant of the badge
   * @default 'default'
   */
  variant?: "default" | "solid" | "outline" | "subtle";

  /**
   * The color scheme of the badge
   * @default 'primary'
   */
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";

  /**
   * The size of the badge
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether to show as a dot indicator
   * @default false
   */
  dot?: boolean;

  /**
   * The content to display inside the badge
   */
  children?: React.ReactNode;
}
