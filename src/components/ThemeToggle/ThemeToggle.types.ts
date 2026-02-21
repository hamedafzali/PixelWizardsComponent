export interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  isDark?: boolean;
  onToggle?: () => void;
}
