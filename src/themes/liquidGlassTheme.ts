import { Theme } from "./types";
import { liquidGlassTokens } from "../tokens/liquidGlass";

// Enhanced Liquid Glass Theme for modern glassmorphism design
export const createLiquidGlassTheme = (baseTheme: Theme): Theme => {
  return {
    ...baseTheme,
    // Enhanced glass properties with modern Liquid Glass effects
    glass: {
      background: "rgba(255, 255, 255, 0.7)",
      backgroundDark: "rgba(10, 10, 10, 0.85)",
      border: "rgba(255, 255, 255, 0.2)",
      borderDark: "rgba(255, 255, 255, 0.15)",
      backdrop: "blur(16px) saturate(150%)",
      backdropStrong: "blur(24px) saturate(180%)",
      blur: liquidGlassTokens.blur,
      saturate: "saturate(150%)",
      highlight: "rgba(255, 255, 255, 0.1)",
      shadow: liquidGlassTokens.glass.shadow.subtle,
    },
    // Enhanced colors with glass variants
    colors: {
      ...baseTheme.colors,
      // Glass-specific color variants
      // Enhanced semantic colors with transparency layers
      semantic: {
        ...baseTheme.colors.semantic,
        // Layer-based background colors
        background: {
          primary: liquidGlassTokens.glass.background.light.primary,
          secondary: liquidGlassTokens.glass.background.light.secondary,
          tertiary: liquidGlassTokens.glass.background.light.tertiary,
          surface: liquidGlassTokens.glass.background.light.secondary,
          inverse: liquidGlassTokens.glass.background.light.tertiary,
        },
        // Glass borders
        border: {
          primary: liquidGlassTokens.glass.border.light.primary,
          secondary: liquidGlassTokens.glass.border.light.secondary,
          elevated: liquidGlassTokens.glass.border.light.secondary,
          overlay: liquidGlassTokens.glass.border.light.secondary,
          focus: liquidGlassTokens.glass.border.light.focus,
          error: liquidGlassTokens.glass.border.light.secondary,
          success: liquidGlassTokens.glass.border.light.secondary,
          accent: liquidGlassTokens.glass.border.light.secondary,
          glow: liquidGlassTokens.glass.border.light.primary,
          glass: liquidGlassTokens.glass.border.light.primary,
          glassDark: liquidGlassTokens.glass.border.dark.primary,
        },
      },
    },
    // Enhanced shadows for glass depth
    shadows: {
      ...baseTheme.shadows,
      // Glass-specific shadows
      glass: liquidGlassTokens.glass.shadow.subtle,
      glassHover: liquidGlassTokens.glass.shadow.medium,
      glassActive: liquidGlassTokens.glass.shadow.strong,
      glassFloating: liquidGlassTokens.glass.shadow.floating,
    },
  };
};

// Liquid Glass theme variants
export const liquidGlassLightTheme = createLiquidGlassTheme({
  // This would be your existing light theme
  // We'll enhance it with liquid glass properties
} as Theme);

export const liquidGlassDarkTheme = createLiquidGlassTheme({
  // This would be your existing dark theme
  // We'll enhance it with liquid glass properties
} as Theme);

// Helper function to apply glass effects to components
export const applyGlassEffect = (
  element: HTMLElement,
  variant: "subtle" | "medium" | "strong" | "ultra" = "medium",
  transparency: number = 0.75,
) => {
  element.style.backdropFilter = liquidGlassTokens.blur[variant];
  element.style.backgroundColor = `rgba(255, 255, 255, ${transparency})`;
  element.style.border = `1px solid rgba(255, 255, 255, ${transparency * 0.2})`;
  element.style.boxShadow = liquidGlassTokens.glass.shadow.medium;
};

// Helper function to create layered glass effects
export const createGlassLayer = (
  background: string,
  glassVariant: "primary" | "secondary" | "tertiary" | "overlay" = "primary",
  blurVariant: "subtle" | "medium" | "strong" | "ultra" = "medium",
) => {
  return {
    background,
    backdropFilter: liquidGlassTokens.blur[blurVariant],
    backgroundColor: liquidGlassTokens.glass.background.light[glassVariant],
    border: `1px solid ${liquidGlassTokens.glass.border.light.primary}`,
    boxShadow: liquidGlassTokens.glass.shadow.medium,
    transition: liquidGlassTokens.motion.glass,
  };
};
