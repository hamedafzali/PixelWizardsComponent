import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme, ThemeContextValue, ThemeProviderProps } from "./types";
import { lightTheme } from "./lightTheme";
import { darkTheme } from "./darkTheme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = lightTheme,
  storageKey = "pw-theme",
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme as Theme);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsedTheme = JSON.parse(stored);
        setThemeState(parsedTheme);
      }
    } catch (error) {
      console.warn("Failed to load theme from localStorage:", error);
    }
  }, [storageKey]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    // Set CSS custom properties
    Object.entries(theme.colors.semantic).forEach(([key, value]) => {
      if (typeof value === "object") {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(
            `--color-${key}-${subKey}`,
            subValue as string,
          );
        });
      } else {
        root.style.setProperty(`--color-${key}`, value as string);
      }
    });

    // Set theme mode and direction
    root.setAttribute("data-theme", theme.mode);
    root.setAttribute("data-direction", theme.direction);
    root.dir = theme.direction;

    // Set font family
    root.style.setProperty("--font-sans", theme.typography.fontFamily.sans);
    root.style.setProperty("--font-mono", theme.typography.fontFamily.mono);
  }, [theme]);

  const setTheme = (newTheme: Partial<Theme> | string) => {
    let updatedTheme: Theme;

    if (typeof newTheme === "string") {
      // Switch between predefined themes
      if (newTheme === "light") {
        updatedTheme = { ...lightTheme, direction: theme.direction };
      } else if (newTheme === "dark") {
        updatedTheme = { ...darkTheme, direction: theme.direction };
      } else {
        throw new Error(`Unknown theme: ${newTheme}`);
      }
    } else {
      // Merge with current theme
      updatedTheme = { ...theme, ...newTheme };
    }

    setThemeState(updatedTheme);

    // Save to localStorage
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedTheme));
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }
  };

  const toggleMode = () => {
    const newMode = theme.mode === "light" ? "dark" : "light";
    const baseTheme = newMode === "light" ? lightTheme : darkTheme;
    setTheme({ ...baseTheme, direction: theme.direction });
  };

  const toggleDirection = () => {
    const newDirection = theme.direction === "ltr" ? "rtl" : "ltr";
    setTheme({ ...theme, direction: newDirection });
  };

  const value: ThemeContextValue = {
    theme,
    setTheme,
    toggleMode,
    toggleDirection,
    isDark: theme.mode === "dark",
    isRTL: theme.direction === "rtl",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
