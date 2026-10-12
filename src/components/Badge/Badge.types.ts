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
  color?:
    | "primary"
    | "secondary"
    | "neutral"
    | "success"
    | "warning"
    | "error"
    | "info";

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
   * Animate the dot, e.g. for an in-progress state
   * @default false
   */
  pulse?: boolean;

  /**
   * Icon shown before the label
   */
  icon?: React.ReactNode;

  /**
   * Use the monospace font, e.g. for ports, hashes and versions
   * @default false
   */
  mono?: boolean;

  /**
   * The content to display inside the badge
   */
  children?: React.ReactNode;
}
