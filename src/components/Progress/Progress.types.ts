export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The current progress value
   * @default 0
   */
  value?: number;

  /**
   * The maximum progress value
   * @default 100
   */
  max?: number;

  /**
   * The size of the progress bar
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * The visual style variant
   * @default 'default'
   */
  variant?: "default" | "striped" | "gradient";

  /**
   * The color scheme of the progress bar
   * @default 'primary'
   */
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";

  /**
   * Whether to show the percentage label
   * @default false
   */
  showLabel?: boolean;

  /**
   * Whether to animate the progress bar
   * @default true
   */
  animated?: boolean;
}
