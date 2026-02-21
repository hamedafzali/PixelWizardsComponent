import { Theme } from "./types";
import {
  colors,
  typography,
  spacing,
  layoutSpacing,
  breakpoints,
  shadows,
  borderRadius,
} from "../tokens";

export const lightTheme: Theme = {
  id: "light",
  name: "Modern Light",
  mode: "light",
  direction: "ltr",

  glass: {
    blur: "blur(16px) saturate(150%)",
    saturate: "150%",
    backdrop: "blur(16px) saturate(150%)",
    border: "rgba(255, 255, 255, 0.2)",
    highlight: "rgba(255, 255, 255, 0.1)",
  },

  motion: {
    fast: "0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    ease: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0.4, 0, 1, 1)",
    easeIn: "cubic-bezier(0, 0, 0.2, 1)",
  },

  depth: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.07)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    ambient: {
      light: "rgba(255, 255, 255, 0.5)",
      medium: "rgba(255, 255, 255, 0.3)",
      strong: "rgba(255, 255, 255, 0.1)",
    },
  },

  colors: {
    ...colors,
    semantic: {
      ...colors.semantic,
      // Modern light theme with warm, soft backgrounds
      background: {
        primary: "#ffffff", // Pure white for main background
        secondary: "#fafaf9", // Warm off-white for depth
        tertiary: "#f5f5f4", // Subtle gray for sections
        surface: "#ffffff", // Card surfaces
        inverse: colors.neutral[950], // Dark for contrast
      },
      text: {
        primary: colors.neutral[950], // High contrast black
        secondary: colors.neutral[700], // Good contrast gray
        tertiary: colors.neutral[600], // Muted for less important text
        inverse: colors.neutral[0], // White text on dark
        disabled: colors.neutral[400], // Clear disabled state
        accent: colors.primary[600], // Vibrant accent
      },
      border: {
        primary: colors.neutral[200], // Soft borders
        secondary: colors.neutral[300], // Slightly stronger borders
        focus: colors.primary[500], // Vibrant focus ring
        error: colors.error[500], // Error state
        success: colors.success[500], // Success state
        accent: colors.primary[500], // Accent borders
        glow: `0 0 0 1px ${colors.primary[500]}40`, // Subtle glow
      },
      surface: {
        primary: "#ffffff", // White cards
        secondary: "#fafaf9", // Subtle variation
        elevated: "#ffffff", // Elevated with shadow
        overlay: "rgba(0, 0, 0, 0.5)", // Modal overlay
      },
    },
    glass: {
      background: "rgba(255, 255, 255, 0.8)", // Bright glass
      backgroundDark: "rgba(15, 23, 42, 0.8)", // Dark glass variant
      border: "rgba(255, 255, 255, 0.2)", // Glass borders
      borderDark: "rgba(255, 255, 255, 0.1)",
      backdrop: "blur(20px) saturate(180%)", // Modern blur
      backdropStrong: "blur(24px) saturate(200%)", // Strong blur
    },
    surface: {
      primary: "#ffffff", // White cards
      secondary: "#fafaf9", // Subtle variation
      elevated: "#ffffff", // Elevated with shadow
      overlay: "rgba(0, 0, 0, 0.5)", // Modal overlay
    },
  },

  typography,
  spacing,
  layoutSpacing,
  breakpoints,
  shadows,
  borderRadius,
};
