export * from "./colors";
export * from "./typography";
export * from "./spacing";
export * from "./shadows";
export * from "./borderRadius";

// Import the actual modules
import * as colors from "./colors";
import * as typography from "./typography";
import * as spacing from "./spacing";
import * as shadows from "./shadows";
import * as borderRadius from "./borderRadius";

// Combined tokens interface
export interface DesignTokens {
  colors: typeof colors.colors;
  typography: typeof typography.typography;
  spacing: typeof spacing.spacing;
  layoutSpacing: typeof spacing.layoutSpacing;
  breakpoints: typeof spacing.breakpoints;
  shadows: typeof shadows.shadows;
  borderRadius: typeof borderRadius.borderRadius;
}

// Default tokens export
export const tokens = {
  colors: colors.colors,
  typography: typography.typography,
  spacing: spacing.spacing,
  layoutSpacing: spacing.layoutSpacing,
  breakpoints: spacing.breakpoints,
  shadows: shadows.shadows,
  borderRadius: borderRadius.borderRadius,
};
