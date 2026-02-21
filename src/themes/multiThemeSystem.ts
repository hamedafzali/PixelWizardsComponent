import { Theme } from "./types";
import { lightTheme, darkTheme } from "./index";

// Theme type definitions
export type ThemeType =
  | "light"
  | "dark"
  | "liquid-glass-light"
  | "liquid-glass-dark";

// Enhanced theme configurations
export const themeConfigurations = {
  // Original light theme
  light: {
    ...lightTheme,
    id: "light",
    name: "Light Theme",
    mode: "light" as const,
    type: "original" as const,
    direction: "ltr" as const,
  },

  // Original dark theme
  dark: {
    ...darkTheme,
    id: "dark",
    name: "Dark Theme",
    mode: "dark" as const,
    type: "original" as const,
    direction: "ltr" as const,
  },

  // Liquid glass light theme
  "liquid-glass-light": {
    ...lightTheme,
    id: "liquid-glass-light",
    name: "Liquid Glass Light",
    mode: "light" as const,
    type: "liquid-glass" as const,
    direction: "ltr" as const,
    // Complete color override for glass compatibility
    colors: {
      ...lightTheme.colors,
      semantic: {
        // Background colors for glass
        background: {
          primary: "#f8fafc", // Very light background
          secondary: "#f1f5f9", // Light secondary
          tertiary: "#e2e8f0", // Light tertiary
          surface: "rgba(255, 255, 255, 0.85)", // Glass surface
          inverse: "#0f172a", // Dark for contrast
        },
        // Text colors optimized for glass
        text: {
          primary: "#1e293b", // Dark text for light glass
          secondary: "#475569", // Medium dark text
          tertiary: "#64748b", // Muted text
          inverse: "#ffffff", // White text on dark
          disabled: "#94a3b8", // Disabled text
          accent: "#3b82f6", // Blue accent
        },
        // Border colors for glass
        border: {
          primary: "rgba(148, 163, 184, 0.3)", // Light borders
          secondary: "rgba(148, 163, 184, 0.2)", // Subtle borders
          focus: "#3b82f6", // Focus ring
          error: "#ef4444", // Error state
          success: "#10b981", // Success state
          accent: "#3b82f6", // Accent borders
          glow: "0 0 0 1px rgba(59, 130, 246, 0.3)", // Subtle glow
        },
        // Surface colors for glass
        surface: {
          primary: "rgba(255, 255, 255, 0.9)", // Glass primary
          secondary: "rgba(255, 255, 255, 0.8)", // Glass secondary
          elevated: "rgba(255, 255, 255, 0.95)", // Glass elevated
          overlay: "rgba(0, 0, 0, 0.3)", // Modal overlay
        },
      },
    },
    // Enhanced glass properties
    glass: {
      blur: "16px",
      saturate: "150%",
      backdrop: "rgba(255, 255, 255, 0.85)",
      border: "rgba(255, 255, 255, 0.2)",
      highlight: "rgba(255, 255, 255, 0.4)",
      shadow:
        "0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.1)",
    },
    // Enhanced shadows for glass depth
    shadows: {
      ...lightTheme.shadows,
      glass:
        "0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      glassHover:
        "0 16px 64px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.15)",
      glassActive:
        "0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)",
    },
  },

  // Liquid glass dark theme
  "liquid-glass-dark": {
    ...darkTheme,
    id: "liquid-glass-dark",
    name: "Liquid Glass Dark",
    mode: "dark" as const,
    type: "liquid-glass" as const,
    direction: "ltr" as const,
    // Complete color override for glass compatibility
    colors: {
      ...darkTheme.colors,
      semantic: {
        // Background colors for dark glass
        background: {
          primary: "#0f172a", // Very dark background
          secondary: "#1e293b", // Dark secondary
          tertiary: "#334155", // Dark tertiary
          surface: "rgba(15, 23, 42, 0.85)", // Glass surface
          inverse: "#f8fafc", // Light for contrast
        },
        // Text colors optimized for dark glass
        text: {
          primary: "#f8fafc", // Light text for dark glass
          secondary: "#e2e8f0", // Medium light text
          tertiary: "#cbd5e1", // Muted light text
          inverse: "#0f172a", // Dark text on light
          disabled: "#64748b", // Disabled text
          accent: "#60a5fa", // Light blue accent
        },
        // Border colors for dark glass
        border: {
          primary: "rgba(148, 163, 184, 0.2)", // Dark borders
          secondary: "rgba(148, 163, 184, 0.1)", // Subtle dark borders
          focus: "#60a5fa", // Focus ring
          error: "#f87171", // Error state
          success: "#34d399", // Success state
          accent: "#60a5fa", // Accent borders
          glow: "0 0 0 1px rgba(96, 165, 250, 0.3)", // Subtle glow
        },
        // Surface colors for dark glass
        surface: {
          primary: "rgba(15, 23, 42, 0.9)", // Dark glass primary
          secondary: "rgba(30, 41, 59, 0.8)", // Dark glass secondary
          elevated: "rgba(15, 23, 42, 0.95)", // Dark glass elevated
          overlay: "rgba(0, 0, 0, 0.5)", // Modal overlay
        },
      },
    },
    // Enhanced glass properties for dark mode
    glass: {
      blur: "16px",
      saturate: "150%",
      backdrop: "rgba(15, 23, 42, 0.85)",
      border: "rgba(255, 255, 255, 0.15)",
      highlight: "rgba(255, 255, 255, 0.3)",
      shadow:
        "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)",
    },
    // Enhanced shadows for glass depth
    shadows: {
      ...darkTheme.shadows,
      glass:
        "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)",
      glassHover:
        "0 16px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      glassActive:
        "0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.03)",
    },
  },
};

// Theme selector helper
export const getTheme = (themeType: ThemeType): Theme => {
  return themeConfigurations[themeType];
};

// Theme switching helper
export const switchTheme = (
  currentTheme: ThemeType,
  targetTheme: ThemeType,
): ThemeType => {
  return targetTheme;
};

// Theme validation
export const isValidTheme = (theme: string): theme is ThemeType => {
  return Object.keys(themeConfigurations).includes(theme);
};

// Theme metadata
export type ThemeInfo = {
  id: string;
  name: string;
  mode: "light" | "dark";
  isLiquidGlass: boolean;
  isDark: boolean;
  colors: any;
  type?: string;
};

export const getThemeInfo = (themeType: ThemeType): ThemeInfo => {
  const theme = themeConfigurations[themeType];
  const isLiquidGlass =
    themeType === "liquid-glass-light" || themeType === "liquid-glass-dark";

  return {
    id: themeType,
    name: theme.name,
    mode: theme.mode,
    isLiquidGlass,
    isDark: theme.mode === "dark",
    colors: theme.colors,
    type: themeType,
  };
};

// All available themes
export const availableThemes = Object.keys(themeConfigurations) as ThemeType[];

// Theme categories
export const themeCategories = {
  original: ["light", "dark"] as ThemeType[],
  liquidGlass: ["liquid-glass-light", "liquid-glass-dark"] as ThemeType[],
  light: ["light", "liquid-glass-light"] as ThemeType[],
  dark: ["dark", "liquid-glass-dark"] as ThemeType[],
};

// Theme CSS class applier
export const applyThemeClasses = (themeType: ThemeType) => {
  const root = document.documentElement;
  const themeInfo = getThemeInfo(themeType);

  // Remove all theme classes
  root.classList.remove("theme-light", "theme-dark", "theme-liquid-glass");

  // Apply current theme classes
  root.classList.add(`theme-${themeInfo.mode}`);

  if (themeInfo.isLiquidGlass) {
    root.classList.add("theme-liquid-glass");
  }

  // Set data attributes
  root.setAttribute("data-theme", themeInfo.mode);
  root.setAttribute("data-theme-type", themeType);
  root.setAttribute("data-theme-style", themeInfo.type || themeType);
};

// Theme transition helper
export const applyTheme = (targetTheme: ThemeType) => {
  const theme = themeConfigurations[targetTheme];
  const root = document.documentElement;

  // Apply theme classes
  root.setAttribute("data-theme", targetTheme);
  root.classList.add("theme-transitioning");

  // Apply CSS custom properties
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === "string") {
      root.style.setProperty(`--color-${key}`, value);
    }
  });

  // Remove transition class after animation
  setTimeout(() => {
    root.classList.remove("theme-transitioning");
  }, 300);
};

// Theme persistence
export const saveThemePreference = (themeType: ThemeType) => {
  try {
    localStorage.setItem("pw-theme-preference", themeType);
  } catch (error) {
    console.warn("Failed to save theme preference:", error);
  }
};

export const loadThemePreference = (): ThemeType | null => {
  try {
    const saved = localStorage.getItem("pw-theme-preference");
    return saved && isValidTheme(saved) ? saved : null;
  } catch (error) {
    console.warn("Failed to load theme preference:", error);
    return null;
  }
};

// Theme detection based on system preferences
export const detectSystemTheme = (): "light" | "dark" => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
};

// Get recommended theme based on system and user preference
export const getRecommendedTheme = (userPreference?: ThemeType): ThemeType => {
  if (userPreference && isValidTheme(userPreference)) {
    return userPreference;
  }

  const systemTheme = detectSystemTheme();
  return systemTheme === "dark" ? "liquid-glass-dark" : "liquid-glass-light";
};
