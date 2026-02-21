import { Theme } from "./types";
import {
  colors as baseColors,
  typography,
  spacing,
  layoutSpacing,
  breakpoints,
  shadows,
  borderRadius,
} from "../tokens";

// Premium dark theme color palette with enhanced depth and richness
const colors = {
  ...baseColors,
  // Advanced primary color system with smooth transitions
  primary: {
    ...baseColors.primary,
    // Enhanced color spectrum with better gradient support
    200: "#bfdbfe", // Very light
    300: "#93c5fd", // Light
    350: "#7ab4f8", // Light-medium
    400: "#60a5fa", // Medium
    450: "#4d94f7", // Medium-strong
    500: "#3b82f6", // Base
    550: "#2e71e5", // Strong
    600: "#2563eb", // Hover
    650: "#1e55d3", // Pressed
    700: "#1d4ed8", // Active
    800: "#1e40af", // Dark
    // Advanced effects
    glow: "0 0 0 1px rgba(96, 165, 250, 0.5)",
    glowHover: "0 0 0 2px rgba(96, 165, 250, 0.7)",
    shadow: "0 4px 14px -2px rgba(59, 130, 246, 0.3)",
  },

  // Enhanced semantic colors for dark mode with better contrast
  semantic: {
    ...baseColors.semantic,
    background: {
      primary: "#121212", // Deep space black
      secondary: "#1e1e1e", // Slightly lighter
      tertiary: "#2d2d2d", // For elevated surfaces
      surface: "rgba(30, 35, 40, 0.6)", // Glass panels
      paper: "#1e1e1e", // Background for paper/card components
      inverse: "rgba(245, 245, 250, 0.95)", // Light mode background
      overlay: "rgba(0, 0, 0, 0.75)", // For modals/overlays
    },

    // Text colors with better contrast
    text: {
      primary: "rgba(255, 255, 255, 0.95)", // High contrast white
      secondary: "rgba(255, 255, 255, 0.8)", // Slightly muted
      tertiary: "rgba(180, 185, 195, 0.7)", // For less important text
      inverse: "rgba(10, 10, 15, 0.95)", // For text on light bg
      disabled: "rgba(150, 155, 165, 0.5)", // Disabled state
      accent: "#60a5fa", // Accent color
      success: "#4ade80", // Success state
      warning: "#fbbf24", // Warning state
      error: "#f87171", // Error state
    },

    // Border colors with glow effects
    border: {
      primary: "rgba(255, 255, 255, 0.08)", // Default border
      secondary: "rgba(255, 255, 255, 0.05)", // Subtle border
      focus: "rgba(96, 165, 250, 0.6)", // Focus state
      error: "rgba(248, 113, 113, 0.6)", // Error state
      success: "rgba(74, 222, 128, 0.6)", // Success state
      accent: "rgba(59, 130, 246, 0.4)", // Accent border
      glow: "0 0 0 1px rgba(59, 130, 246, 0.3)", // Subtle glow
    },
  },

  // Premium glass effects with advanced properties
  glass: {
    ...baseColors.glass,
    // Base glass properties
    background: "rgba(30, 35, 42, 0.6)", // Main glass background
    backgroundDark: "rgba(15, 20, 28, 0.7)", // Darker variant
    backgroundLight: "rgba(45, 55, 65, 0.5)", // Lighter variant
    // Border treatments
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderDark: "1px solid rgba(0, 0, 0, 0.25)",
    borderLight: "1px solid rgba(255, 255, 255, 0.05)",
    // Advanced effects
    backdrop: "blur(28px) saturate(200%) contrast(95%) brightness(0.95)",
    highlight:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
    shadow: "0 12px 40px -8px rgba(0, 0, 0, 0.35)",
    // Interactive states
    hover: {
      background: "rgba(40, 45, 52, 0.7)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      shadow: "0 16px 48px -12px rgba(0, 0, 0, 0.4)",
    },
    active: {
      background: "rgba(25, 30, 38, 0.8)",
      border: "1px solid rgba(0, 0, 0, 0.3)",
      shadow: "0 4px 24px -4px rgba(0, 0, 0, 0.5)",
    },
  },
};

export const darkTheme: Theme = {
  id: "dark",
  name: "Aurora Glass",
  mode: "dark",
  direction: "ltr",

  // Enhanced Glassmorphism properties
  glass: {
    blur: "blur(24px)",
    saturate: "saturate(200%)",
    backdrop: "rgba(20, 25, 35, 0.7)", // Rich dark blue glass
    border: "1px solid rgba(255, 255, 255, 0.1)",
    highlight: "rgba(255, 255, 255, 0.08)",
    shadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
  },

  // Advanced Motion System
  motion: {
    // Timing presets
    ultraFast: "80ms", // Instant feedback
    fast: "150ms", // Quick interactions
    normal: "300ms", // Standard transitions
    slow: "500ms", // Complex animations
    ultraSlow: "800ms", // Background transitions

    // Easing functions
    ease: "cubic-bezier(0.16, 1, 0.3, 1)", // Standard
    easeOut: "cubic-bezier(0.33, 1, 0.68, 1)", // Exit
    easeIn: "cubic-bezier(0.5, 0, 0.84, 0.25)", // Enter
    easeInOut: "cubic-bezier(0.87, 0, 0.13, 1)", // Smooth transitions

    // Spring animations
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    springBouncy: "cubic-bezier(0.5, 1.8, 0.5, 0.8)",

    // Custom transitions
    subtle: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    smooth: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    gentle: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  },

  // Advanced Depth System with Realistic Lighting
  depth: {
    // Base shadows
    none: "none",
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 2px 6px -1px rgba(0, 0, 0, 0.1), 0 1px 3px -1px rgba(0, 0, 0, 0.06)",
    md: "0 4px 12px -2px rgba(0, 0, 0, 0.15), 0 2px 6px -2px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 4px 10px -4px rgba(0, 0, 0, 0.15)",
    xl: "0 20px 50px -12px rgba(0, 0, 0, 0.3), 0 8px 24px -6px rgba(0, 0, 0, 0.2)",

    // Special effects
    float:
      "0 24px 48px -12px rgba(0, 0, 0, 0.4), 0 12px 24px -8px rgba(0, 0, 0, 0.25)",
    modal:
      "0 32px 64px -12px rgba(0, 0, 0, 0.5), 0 16px 32px -16px rgba(0, 0, 0, 0.3)",

    // Ambient occlusion
    ambient: {
      light:
        "inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.02)",
      medium:
        "inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 0 0 1px rgba(255, 255, 255, 0.03)",
      strong:
        "inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.04)",
    },

    // Glow effects
    glow: {
      sm: "0 0 0 1px rgba(96, 165, 250, 0.4)",
      md: "0 0 0 1px rgba(96, 165, 250, 0.5), 0 0 15px rgba(59, 130, 246, 0.3)",
      lg: "0 0 0 1px rgba(96, 165, 250, 0.6), 0 0 25px rgba(59, 130, 246, 0.4)",
      xl: "0 0 0 1px rgba(96, 165, 250, 0.7), 0 0 40px rgba(59, 130, 246, 0.5)",
      hover:
        "0 0 0 2px rgba(96, 165, 250, 0.6), 0 0 30px rgba(59, 130, 246, 0.5)",
      focus: "0 0 0 3px rgba(96, 165, 250, 0.3)",
    },

    // Neumorphic effect
    neumorphic: {
      sm: "4px 4px 8px rgba(0, 0, 0, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.02)",
      md: "8px 8px 16px rgba(0, 0, 0, 0.25), -8px -8px 16px rgba(255, 255, 255, 0.03)",
      lg: "12px 12px 24px rgba(0, 0, 0, 0.3), -12px -12px 24px rgba(255, 255, 255, 0.04)",
    },
  },

  colors: {
    ...colors,
    // Enhanced color palette with better contrast and depth
    primary: {
      ...colors.primary,
      // Override with dark mode specific values
      ...{
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        glow: "0 0 0 1px rgba(59, 130, 246, 0.4)",
      },
      // Add custom property for hover glow
    },

    // Modern dark theme semantic colors
    semantic: {
      ...colors.semantic,
      // Modern dark backgrounds with depth
      background: {
        primary: "#0a0a0a", // Deep black
        secondary: "#141414", // Slightly lighter
        tertiary: "#1a1a1a", // For elevated surfaces
        surface: "#1c1917", // Card surfaces (warm dark)
        overlay: "rgba(0, 0, 0, 0.85)", // Modal overlay
        inverse: "#ffffff", // Light mode background
      },

      // High contrast text for readability
      text: {
        primary: "rgba(255, 255, 255, 0.95)", // Bright white
        secondary: "rgba(255, 255, 255, 0.75)", // Muted white
        tertiary: "rgba(255, 255, 255, 0.6)", // Less important
        inverse: colors.neutral[950], // Text on light bg
        disabled: "rgba(255, 255, 255, 0.4)", // Disabled state
        accent: colors.primary[400], // Vibrant accent
      },

      // Modern borders with subtle glow
      border: {
        primary: "rgba(255, 255, 255, 0.1)", // Visible borders
        secondary: "rgba(255, 255, 255, 0.06)", // Subtle borders
        focus: colors.primary[500], // Bright focus
        error: colors.error[500], // Error state
        success: colors.success[500], // Success state
        accent: colors.primary[500], // Accent borders
        glow: `0 0 0 1px ${colors.primary[500]}40`, // Subtle glow
      },
    },

    // Modern surface colors
    surface: {
      primary: "#1c1917", // Warm dark surface
      secondary: "#262524", // Slightly lighter
      elevated: "#292524", // Elevated with shadow
      overlay: "rgba(0, 0, 0, 0.9)", // Overlays
    },

    // Modern glass effects
    glass: {
      ...colors.glass,
      background: "rgba(28, 25, 23, 0.7)", // Warm dark glass
      backgroundDark: "rgba(10, 10, 10, 0.8)", // Darker variant
      border: "rgba(255, 255, 255, 0.1)", // Visible borders
      borderDark: "rgba(255, 255, 255, 0.05)",
      backdrop: "blur(20px) saturate(180%)", // Modern blur
    },
  },

  // Enhanced typography for better dark mode readability
  typography: {
    ...typography,
    fontFamily: {
      ...typography.fontFamily,
      sans: "'Inter', -apple-system, system-ui, sans-serif",
    },
    // Improved line heights and weights for dark mode
    fontWeight: {
      ...typography.fontWeight,
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    // Using the standard line height scale from the design system
    lineHeight: {
      ...typography.lineHeight, // This includes none, tight, snug, normal, relaxed, loose
      // Ensure we're not adding any non-standard line heights
    },
  },

  spacing,
  layoutSpacing,
  breakpoints,

  // Modern shadow system for dark mode
  shadows: {
    ...shadows,
    // Enhanced shadows with more depth
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.4), 0 1px 1px 0 rgba(0, 0, 0, 0.3)",
    base: "0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)",
    md: "0 4px 8px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)",
    lg: "0 10px 20px -5px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)",
    xl: "0 20px 30px -10px rgba(0, 0, 0, 0.6), 0 10px 15px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)",
    "2xl": "0 25px 60px -15px rgba(0, 0, 0, 0.7)",

    // Modern glass effects
    glass: "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
    glassHover: "0 12px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.15)",

    // Vibrant glow effects
    glow: "0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)",
    glowHover: "0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)",

    // Inner shadows
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)",
    innerLg: "inset 0 4px 8px 0 rgba(0, 0, 0, 0.4)",
  },

  // Slightly larger border radius for a modern look
  borderRadius: {
    ...borderRadius,
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
};
