import { DesignTokens } from "../tokens";

export interface GlassEffect {
  background?: string;
  backgroundDark?: string;
  blur:
    | string
    | {
        subtle: string;
        medium: string;
        strong: string;
        ultra: string;
        dynamic: string;
      };
  saturate: string;
  backdrop: string;
  backdropStrong?: string;
  border: string;
  borderDark?: string;
  highlight: string;
  shadow?: string; // For glass panel shadows
  transparency?: any; // Allow transparency properties
  light?: any; // Allow light properties
  motion?: any; // Allow motion properties
}

export interface MotionSettings {
  ultraFast?: string; // Instant feedback
  fast: string; // Quick interactions
  normal: string; // Standard transitions
  slow: string; // Complex animations
  ultraSlow?: string; // Background transitions

  ease: string; // Standard
  easeOut: string; // Exit
  easeIn: string; // Enter
  easeInOut?: string; // Smooth transitions

  spring?: string; // Standard spring
  springBouncy?: string; // Bouncy spring

  subtle?: string; // Quick transitions
  smooth?: string; // Standard transitions
  gentle?: string; // Slow transitions
}

export interface DepthSystem {
  none?: string;
  xs?: string;
  sm: string;
  md: string;
  lg: string;
  xl?: string;

  float?: string;
  modal?: string;

  ambient:
    | string
    | {
        light: string;
        medium: string;
        strong: string;
      };

  glow?:
    | string
    | {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        hover: string;
        focus: string;
      };

  neumorphic?: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface Theme {
  id: string;
  name: string;
  mode: "light" | "dark";
  direction: "ltr" | "rtl";
  type?: string;
  glass: GlassEffect;

  motion: MotionSettings;

  depth: DepthSystem;

  // Design tokens
  colors: DesignTokens["colors"] & {
    semantic: DesignTokens["colors"]["semantic"] & {
      background: DesignTokens["colors"]["semantic"]["background"] & {
        surface?: string;
        overlay?: string;
        glass?: any; // Allow glass properties
        glassDark?: any; // Allow dark glass properties
      };
      text: DesignTokens["colors"]["semantic"]["text"] & {
        accent?: string;
        success?: string;
        warning?: string;
        error?: string;
      };
      border: DesignTokens["colors"]["semantic"]["border"] & {
        primary: string;
        secondary: string;
        focus: string;
        error: string;
        success: string;
        accent: string;
        glow: string;
        glass?: any; // Allow glass properties
        glassDark?: any; // Allow dark glass properties
      };
    };
    surface: {
      primary: string;
      secondary: string;
      elevated: string;
      overlay: string;
    };
    glass: {
      background: string;
      backgroundDark: string;
      border: string;
      borderDark: string;
      backdrop: string;
      highlight?: string;
      shadow?: string;
    };
  };
  typography: DesignTokens["typography"];
  spacing: DesignTokens["spacing"];
  layoutSpacing: DesignTokens["layoutSpacing"];
  breakpoints: DesignTokens["breakpoints"];
  shadows: DesignTokens["shadows"] & {
    glass?: string;
    glassHover?: string;
    glassActive?: string;
    glassFloating?: string;
    glow?: string;
    glowHover?: string;
    inner?: string;
    innerLg?: string;
  };
  borderRadius: DesignTokens["borderRadius"];
}

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Partial<Theme> | string) => void;
  toggleMode: () => void;
  toggleDirection: () => void;
  isDark: boolean;
  isRTL: boolean;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Partial<Theme>;
  storageKey?: string;
}
