import { lightTheme, darkTheme } from "./index";

// Modern Liquid Glass Enhancement CSS Variables
export const liquidGlassCSSVariables = {
  // Advanced blur effects
  "--glass-blur-subtle": "blur(8px) saturate(120%)",
  "--glass-blur-medium": "blur(16px) saturate(150%)",
  "--glass-blur-strong": "blur(24px) saturate(180%)",
  "--glass-blur-ultra": "blur(32px) saturate(200%)",
  "--glass-blur-dynamic": "blur(20px) saturate(160%)",

  // Layered transparency system
  "--glass-alpha-light": "0.85",
  "--glass-alpha-medium": "0.75",
  "--glass-alpha-heavy": "0.65",
  "--glass-alpha-subtle": "0.4",
  "--glass-alpha-overlay": "0.95",

  // Light mode glass backgrounds
  "--glass-bg-light-primary": "rgba(255, 255, 255, 0.85)",
  "--glass-bg-light-secondary": "rgba(255, 255, 255, 0.75)",
  "--glass-bg-light-tertiary": "rgba(255, 255, 255, 0.65)",
  "--glass-bg-light-overlay": "rgba(255, 255, 255, 0.95)",

  // Dark mode glass backgrounds
  "--glass-bg-dark-primary": "rgba(10, 10, 10, 0.85)",
  "--glass-bg-dark-secondary": "rgba(20, 20, 20, 0.75)",
  "--glass-bg-dark-tertiary": "rgba(30, 30, 30, 0.65)",
  "--glass-bg-dark-overlay": "rgba(10, 10, 10, 0.95)",

  // Glass borders
  "--glass-border-light": "rgba(255, 255, 255, 0.2)",
  "--glass-border-light-subtle": "rgba(255, 255, 255, 0.1)",
  "--glass-border-dark": "rgba(255, 255, 255, 0.1)",
  "--glass-border-dark-subtle": "rgba(255, 255, 255, 0.05)",
  "--glass-border-focus": "rgba(59, 130, 246, 0.3)",

  // Glass shadows
  "--glass-shadow-subtle":
    "0 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)",
  "--glass-shadow-medium":
    "0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.1)",
  "--glass-shadow-strong":
    "0 16px 64px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.15)",
  "--glass-shadow-floating":
    "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",

  // Light effects
  "--glass-edge-light-soft": "0 0 20px rgba(255, 255, 255, 0.1)",
  "--glass-edge-light-medium": "0 0 30px rgba(255, 255, 255, 0.15)",
  "--glass-edge-light-strong": "0 0 40px rgba(255, 255, 255, 0.2)",

  "--glass-reflection-subtle":
    "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
  "--glass-reflection-medium":
    "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%)",
  "--glass-reflection-strong":
    "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",

  // Motion transitions
  "--glass-transition-smooth": "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  "--glass-transition-interactive": "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
  "--glass-transition-background": "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  "--glass-transition-bounce":
    "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",

  // Layer system
  "--glass-layer-background": "0",
  "--glass-layer-glass": "10",
  "--glass-layer-solid": "20",
  "--glass-layer-dynamic": "30",
  "--glass-layer-modal": "40",
  "--glass-layer-toast": "50",
};

// Apply Liquid Glass CSS variables to the document
export const applyLiquidGlassVariables = () => {
  const root = document.documentElement;

  Object.entries(liquidGlassCSSVariables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

// Enhanced theme with Liquid Glass properties
export const liquidGlassLightTheme = {
  ...lightTheme,
  glass: {
    ...lightTheme.glass,
    // Enhanced glass properties for light mode
    background: liquidGlassCSSVariables["--glass-bg-light-primary"],
    backgroundDark: liquidGlassCSSVariables["--glass-bg-light-secondary"],
    border: liquidGlassCSSVariables["--glass-border-light"],
    borderDark: liquidGlassCSSVariables["--glass-border-light-subtle"],
    backdrop: liquidGlassCSSVariables["--glass-blur-medium"],
    backdropStrong: liquidGlassCSSVariables["--glass-blur-strong"],
  },
};

export const liquidGlassDarkTheme = {
  ...darkTheme,
  glass: {
    ...darkTheme.glass,
    // Enhanced glass properties for dark mode
    background: liquidGlassCSSVariables["--glass-bg-dark-primary"],
    backgroundDark: liquidGlassCSSVariables["--glass-bg-dark-secondary"],
    border: liquidGlassCSSVariables["--glass-border-dark"],
    borderDark: liquidGlassCSSVariables["--glass-border-dark-subtle"],
    backdrop: liquidGlassCSSVariables["--glass-blur-medium"],
    backdropStrong: liquidGlassCSSVariables["--glass-blur-strong"],
  },
};

// Helper function to apply glass effect to an element
export const applyGlassEffect = (
  element: HTMLElement,
  options: {
    blur?: "subtle" | "medium" | "strong" | "ultra";
    alpha?: number;
    border?: boolean;
    shadow?: boolean;
  } = {},
) => {
  const {
    blur = "medium",
    alpha = 0.75,
    border = true,
    shadow = true,
  } = options;

  element.style.backdropFilter =
    liquidGlassCSSVariables[`--glass-blur-${blur}`];
  element.style.backgroundColor = `rgba(255, 255, 255, ${alpha})`;

  if (border) {
    element.style.border = `1px solid rgba(255, 255, 255, ${alpha * 0.2})`;
  }

  if (shadow) {
    element.style.boxShadow = liquidGlassCSSVariables["--glass-shadow-medium"];
  }

  element.style.transition =
    liquidGlassCSSVariables["--glass-transition-smooth"];
};

// Component-specific glass configurations
export const glassVariants = {
  navigation: {
    background: "var(--glass-bg-light-primary)",
    backdropFilter: "var(--glass-blur-medium)",
    border: "1px solid var(--glass-border-light)",
    shadow: "var(--glass-shadow-subtle)",
    transition: "var(--glass-transition-smooth)",
  },
  card: {
    background: "var(--glass-bg-light-secondary)",
    backdropFilter: "var(--glass-blur-subtle)",
    border: "1px solid var(--glass-border-light-subtle)",
    shadow: "var(--glass-shadow-medium)",
    transition: "var(--glass-transition-smooth)",
  },
  modal: {
    background: "var(--glass-bg-light-overlay)",
    backdropFilter: "var(--glass-blur-strong)",
    border: "1px solid var(--glass-border-light)",
    shadow: "var(--glass-shadow-strong)",
    transition: "var(--glass-transition-background)",
  },
  button: {
    background: "var(--glass-bg-light-tertiary)",
    backdropFilter: "var(--glass-blur-subtle)",
    border: "1px solid var(--glass-border-light-subtle)",
    shadow: "var(--glass-shadow-subtle)",
    transition: "var(--glass-transition-interactive)",
  },
};
