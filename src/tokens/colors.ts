export const colors = {
  // Primary brand colors - Modern vibrant blue palette (inspired by modern design systems)
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Modern vibrant blue
    600: "#2563eb", // Hover state
    700: "#1d4ed8", // Active state
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
    glow: "0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)",
  },

  // Secondary colors - Professional purple accent
  secondary: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7c3aed",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764",
  },

  // Success colors - Professional green
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  },

  // Warning colors - Professional amber
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  },

  // Error colors - Professional red
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },

  // Neutral colors - Modern warm gray scale (better for UI)
  neutral: {
    0: "#ffffff",
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09",
  },

  // Semantic colors for specific use cases
  semantic: {
    // Background colors
    background: {
      primary: "#ffffff",
      secondary: "#fafafa",
      tertiary: "#f5f5f5",
      surface: "#ffffff",
      inverse: "#171717",
    },

    // Text colors with proper contrast
    text: {
      primary: "#171717",
      secondary: "#525252",
      tertiary: "#737373",
      inverse: "#ffffff",
      disabled: "#a3a3a3",
      accent: "#0ea5e9",
    },

    // Border colors
    border: {
      primary: "#e5e5e5",
      secondary: "#d4d4d4",
      focus: "#0ea5e9",
      error: "#ef4444",
      success: "#22c55e",
      accent: "rgba(14, 165, 233, 0.2)",
      glow: "0 0 0 1px rgba(14, 165, 233, 0.2)",
    },

    // Surface colors for cards, panels, etc.
    surface: {
      primary: "#ffffff",
      secondary: "#fafafa",
      elevated: "#ffffff",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
  },

  // Modern glass morphism effects
  glass: {
    background: "rgba(255, 255, 255, 0.7)",
    backgroundDark: "rgba(15, 23, 42, 0.8)",
    border: "rgba(255, 255, 255, 0.18)",
    borderDark: "rgba(255, 255, 255, 0.1)",
    backdrop: "blur(16px) saturate(180%)",
    backdropStrong: "blur(24px) saturate(200%)",
  },
};

export type ColorTokens = typeof colors;
