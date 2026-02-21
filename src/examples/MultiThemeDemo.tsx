import React, { useState } from "react";
import { MultiThemeProvider } from "../themes/MultiThemeProvider";
import MultiThemeToggle from "../components/MultiThemeToggle";
import { useMultiTheme } from "../themes/MultiThemeProvider";
import { clsx } from "clsx";

// Demo component to showcase multi-theme system
const MultiThemeDemoContent: React.FC = () => {
  const {
    currentThemeType,
    setThemeType,
    availableThemes,
    themeCategories,
    cycleTheme,
    cycleThemeCategory,
    isLiquidGlass,
    themeInfo,
  } = useMultiTheme();

  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Import styles */}
      <style>{`
        @import url('../styles/liquidGlass.css');
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-black bg-opacity-20 backdrop-blur-md border-b border-white border-opacity-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">
              Multi-Theme System Demo
            </h1>
            <div className="flex items-center space-x-2 text-white text-sm">
              <span className="px-2 py-1 bg-white bg-opacity-20 rounded">
                {themeInfo.name}
              </span>
              <span className="px-2 py-1 bg-blue-500 bg-opacity-30 rounded">
                {themeInfo.type}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MultiThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Theme Controls */}
        <div className="mb-8 p-6 rounded-2xl bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20">
          <h2 className="text-xl font-semibold text-white mb-4">
            Theme Controls
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Theme Selector */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Select Theme
              </label>
              <select
                value={currentThemeType}
                onChange={(e) => setThemeType(e.target.value as any)}
                className="w-full p-2 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white"
              >
                {availableThemes.map((themeType) => {
                  const info = themeInfo; // This would need to be calculated per theme
                  return (
                    <option
                      key={themeType}
                      value={themeType}
                      className="bg-gray-800"
                    >
                      {themeType
                        .replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Quick Actions */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Quick Actions
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={cycleTheme}
                  className="px-3 py-2 bg-blue-500 bg-opacity-30 hover:bg-opacity-40 text-white rounded-lg transition-all"
                >
                  Cycle Theme
                </button>
                <button
                  onClick={cycleThemeCategory}
                  className="px-3 py-2 bg-purple-500 bg-opacity-30 hover:bg-opacity-40 text-white rounded-lg transition-all"
                >
                  Toggle Style
                </button>
              </div>
            </div>

            {/* Theme Info */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Current Theme Info
              </label>
              <div className="text-white text-sm space-y-1">
                <div>Type: {themeInfo.type}</div>
                <div>Mode: {themeInfo.mode}</div>
                <div>Liquid Glass: {isLiquidGlass ? "Yes" : "No"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {availableThemes.map((themeType) => {
            const isCurrent = themeType === currentThemeType;
            const themeName = themeType
              .replace("-", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());
            const isLGTheme = themeType.includes("liquid-glass");
            const isDarkTheme = themeType.includes("dark");

            return (
              <div
                key={themeType}
                onClick={() => setThemeType(themeType)}
                className={clsx(
                  "p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300",
                  isCurrent
                    ? "border-blue-400 bg-blue-500 bg-opacity-20"
                    : "border-white border-opacity-20 bg-white bg-opacity-10 hover:bg-opacity-20"
                )}
              >
                <div className="text-center">
                  {/* Theme Icon */}
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    {isLGTheme ? (
                      // Crystal icon for liquid glass
                      <svg
                        className="w-8 h-8 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 3L12 22L18 3L12 8L6 3Z" />
                        <circle cx="12" cy="11" r="1" />
                      </svg>
                    ) : isDarkTheme ? (
                      // Moon icon for dark
                      <svg
                        className="w-8 h-8 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    ) : (
                      // Sun icon for light
                      <svg
                        className="w-8 h-8 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                      </svg>
                    )}
                  </div>

                  {/* Theme Name */}
                  <h3 className="text-white font-semibold mb-1">{themeName}</h3>

                  {/* Theme Details */}
                  <div className="text-white text-xs space-y-1">
                    <div className="flex justify-center space-x-2">
                      <span
                        className={clsx(
                          "px-2 py-1 rounded",
                          isLGTheme
                            ? "bg-blue-500 bg-opacity-30"
                            : "bg-gray-500 bg-opacity-30"
                        )}
                      >
                        {isLGTheme ? "Liquid Glass" : "Original"}
                      </span>
                      <span
                        className={clsx(
                          "px-2 py-1 rounded",
                          isDarkTheme
                            ? "bg-gray-800 bg-opacity-50"
                            : "bg-yellow-500 bg-opacity-30"
                        )}
                      >
                        {isDarkTheme ? "Dark" : "Light"}
                      </span>
                    </div>
                    {isCurrent && (
                      <div className="text-green-400 text-xs">✓ Active</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Component Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Standard Components */}
          <div className="p-6 rounded-2xl bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20">
            <h3 className="text-lg font-semibold text-white mb-4">
              Standard Components
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white bg-opacity-10 rounded-lg">
                <p className="text-white">
                  This is a standard component that adapts to all themes.
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-500 bg-opacity-30 hover:bg-opacity-40 text-white rounded-lg transition-all">
                Standard Button
              </button>
            </div>
          </div>

          {/* Liquid Glass Components (only show when in liquid glass mode) */}
          {isLiquidGlass && (
            <div className="p-6 rounded-2xl bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20">
              <h3 className="text-lg font-semibold text-white mb-4">
                Liquid Glass Components
              </h3>
              <div className="space-y-4">
                <div className="liquid-glass liquid-glass--card p-4">
                  <p className="text-white">
                    This is a liquid glass component with advanced blur effects.
                  </p>
                </div>
                <button className="liquid-glass liquid-glass--button px-4 py-2">
                  Glass Button
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Advanced Options */}
        <div className="mt-8">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-lg transition-all"
          >
            {showAdvanced ? "Hide" : "Show"} Advanced Options
          </button>

          {showAdvanced && (
            <div className="mt-4 p-6 rounded-2xl bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20">
              <h3 className="text-lg font-semibold text-white mb-4">
                Advanced Theme Options
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-2">
                    Theme Categories
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-white">
                      <span>Original Themes:</span>
                      <span>{themeCategories.original.join(", ")}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Liquid Glass Themes:</span>
                      <span>{themeCategories.liquidGlass.join(", ")}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">
                    System Integration
                  </h4>
                  <div className="space-y-2 text-white text-sm">
                    <div>✅ Theme persistence</div>
                    <div>✅ System preference detection</div>
                    <div>✅ Smooth transitions</div>
                    <div>✅ CSS variable integration</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main demo component with provider
export const MultiThemeDemo: React.FC = () => {
  return (
    <MultiThemeProvider defaultTheme="liquid-glass-light">
      <MultiThemeDemoContent />
    </MultiThemeProvider>
  );
};
