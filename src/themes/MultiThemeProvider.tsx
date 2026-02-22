import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme, ThemeContextValue } from "./types";
import { ThemeProvider as OriginalThemeProvider } from "./ThemeProvider";
import {
  ThemeType,
  getTheme,
  loadThemePreference,
  getRecommendedTheme,
  applyThemeClasses,
} from "./multiThemeSystem";
import {
  availableThemes,
  themeCategories,
  getThemeInfo,
  isValidTheme,
} from "./multiThemeSystem";
import { applyLiquidGlassVariables } from "./liquidGlassEnhanced";

interface MultiThemeContextValue extends ThemeContextValue {
  currentThemeType: ThemeType;
  setThemeType: (themeType: ThemeType) => void;
  availableThemes: ThemeType[];
  themeCategories: typeof themeCategories;
  cycleTheme: () => void;
  cycleThemeCategory: () => void;
  isLiquidGlass: boolean;
  themeInfo: ReturnType<typeof getThemeInfo>;
}

const MultiThemeContext = createContext<MultiThemeContextValue | undefined>(
  undefined,
);

interface MultiThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeType | Partial<Theme>;
}

export const MultiThemeProvider: React.FC<MultiThemeProviderProps> = ({
  children,
  defaultTheme,
}) => {
  // Get initial theme
  const getInitialTheme = (): ThemeType => {
    if (defaultTheme && typeof defaultTheme === "string") {
      return defaultTheme as ThemeType;
    }

    const savedTheme = loadThemePreference();
    if (savedTheme) {
      return savedTheme;
    }

    return getRecommendedTheme();
  };

  const [currentThemeType, setCurrentThemeType] =
    useState<ThemeType>(getInitialTheme);
  const theme = getTheme(currentThemeType);

  // Apply theme to DOM
  // Set CSS custom properties from theme
  useEffect(() => {
    const root = document.documentElement;

    // Set basic CSS custom properties
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

    // Set font family
    root.style.setProperty("--font-sans", theme.typography.fontFamily.sans);
    root.style.setProperty("--font-mono", theme.typography.fontFamily.mono);

    // Set theme mode and direction
    root.setAttribute("data-theme", theme.mode);
    root.setAttribute("data-direction", theme.direction);
    root.dir = theme.direction;

    applyThemeClasses(currentThemeType);
    if (currentThemeType.includes("liquid-glass")) {
      applyLiquidGlassVariables();
    }
  }, [theme, currentThemeType]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      const savedPreference = loadThemePreference();
      if (!savedPreference) {
        // Only auto-switch if user hasn't explicitly set a preference
        const systemMode = mediaQuery.matches ? "dark" : "light";
        const recommendedTheme =
          systemMode === "dark" ? "liquid-glass-dark" : "liquid-glass-light";
        setCurrentThemeType(recommendedTheme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const setThemeType = (newThemeType: ThemeType) => {
    if (newThemeType !== currentThemeType) {
      setCurrentThemeType(newThemeType);
    }
  };

  const cycleTheme = () => {
    const currentIndex = availableThemes.indexOf(currentThemeType);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    setThemeType(availableThemes[nextIndex]);
  };

  const cycleThemeCategory = () => {
    const themeInfo = getThemeInfo(currentThemeType);
    let nextTheme: ThemeType;

    if (themeInfo.isLiquidGlass) {
      // Switch to original theme with same mode
      nextTheme = themeInfo.isDark ? "dark" : "light";
    } else {
      // Switch to liquid glass theme with same mode
      nextTheme = themeInfo.isDark ? "liquid-glass-dark" : "liquid-glass-light";
    }

    setThemeType(nextTheme);
  };

  const toggleMode = () => {
    const themeInfo = getThemeInfo(currentThemeType);
    const newMode = themeInfo.isDark ? "light" : "dark";
    const isLiquidGlass = themeInfo.isLiquidGlass;

    let nextTheme: ThemeType;
    if (isLiquidGlass) {
      nextTheme =
        newMode === "dark" ? "liquid-glass-dark" : "liquid-glass-light";
    } else {
      nextTheme = newMode === "dark" ? "dark" : "light";
    }

    setThemeType(nextTheme);
  };

  const toggleDirection = () => {
    const newDirection = theme.direction === "ltr" ? "rtl" : "ltr";

    // Update the document direction
    document.documentElement.setAttribute("dir", newDirection);
    document.documentElement.style.direction = newDirection;

    // For now, log the direction change since full theme direction support
    // would require updating the theme system to handle direction changes
    console.log(`Direction changed to: ${newDirection}`);
  };

  const setTheme = (newTheme: string | Partial<Theme>) => {
    if (typeof newTheme === "string") {
      const themeType = newTheme as ThemeType;
      if (isValidTheme(themeType)) {
        setThemeType(themeType);
      }
    } else {
      // Handle Partial<Theme> objects for theme customization
      const mergedTheme = { ...theme, ...newTheme };

      // Apply the merged theme by updating CSS variables
      const root = document.documentElement;
      if (mergedTheme.colors?.semantic) {
        Object.entries(mergedTheme.colors.semantic).forEach(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            Object.entries(value).forEach(([subKey, subValue]) => {
              if (typeof subValue === "string") {
                root.style.setProperty(`--color-${key}-${subKey}`, subValue);
              }
            });
          } else if (typeof value === "string") {
            root.style.setProperty(`--color-${key}`, value);
          }
        });
      }

      // Update direction if specified
      if (mergedTheme.direction && mergedTheme.direction !== theme.direction) {
        document.documentElement.setAttribute("dir", mergedTheme.direction);
        document.documentElement.style.direction = mergedTheme.direction;
      }

      console.log("Partial theme applied:", newTheme);
    }
  };

  const themeInfo = getThemeInfo(currentThemeType);
  const isDark = themeInfo.isDark;
  const isRTL = theme.direction === "rtl";
  const isLiquidGlass = themeInfo.isLiquidGlass;

  const contextValue: MultiThemeContextValue = {
    theme,
    setTheme,
    toggleMode,
    toggleDirection,
    isDark,
    isRTL,
    currentThemeType,
    setThemeType,
    availableThemes,
    themeCategories,
    cycleTheme,
    cycleThemeCategory,
    isLiquidGlass,
    themeInfo,
  };

  return (
    <MultiThemeContext.Provider value={contextValue}>
      <OriginalThemeProvider defaultTheme={theme}>
        {children}
      </OriginalThemeProvider>
    </MultiThemeContext.Provider>
  );
};

// Hook for using the multi-theme context
export const useMultiTheme = (): MultiThemeContextValue => {
  const context = useContext(MultiThemeContext);
  if (!context) {
    throw new Error("useMultiTheme must be used within a MultiThemeProvider");
  }
  return context;
};

// Convenience hook for theme switching
export const useThemeSwitcher = () => {
  const {
    currentThemeType,
    setThemeType,
    cycleTheme,
    cycleThemeCategory,
    isLiquidGlass,
    themeInfo,
  } = useMultiTheme();

  return {
    currentTheme: currentThemeType,
    setTheme: setThemeType,
    cycleTheme,
    cycleThemeCategory,
    isLiquidGlass,
    themeName: themeInfo.name,
    themeMode: themeInfo.mode,
    themeType: themeInfo.type,
  };
};

// Theme selector component helper
export const ThemeSelector: React.FC<{
  className?: string;
  showCycleButton?: boolean;
  showCategoryButton?: boolean;
}> = ({
  className = "",
  showCycleButton = true,
  showCategoryButton = true,
}) => {
  const {
    currentThemeType,
    setThemeType,
    cycleTheme,
    cycleThemeCategory,
    availableThemes,
    themeInfo,
  } = useMultiTheme();

  return (
    <div className={`theme-selector ${className}`}>
      <select
        value={currentThemeType}
        onChange={(e) => setThemeType(e.target.value as ThemeType)}
        className="theme-select"
      >
        {availableThemes.map((themeType) => {
          const info = getThemeInfo(themeType);
          return (
            <option key={themeType} value={themeType}>
              {info.name}
            </option>
          );
        })}
      </select>

      {showCycleButton && (
        <button onClick={cycleTheme} className="theme-cycle-btn">
          Cycle Theme
        </button>
      )}

      {showCategoryButton && (
        <button onClick={cycleThemeCategory} className="theme-category-btn">
          {themeInfo.isLiquidGlass ? "Original" : "Liquid Glass"}
        </button>
      )}
    </div>
  );
};
