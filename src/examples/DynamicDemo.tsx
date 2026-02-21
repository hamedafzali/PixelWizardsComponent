import React from "react";
import { MultiThemeProvider } from "../themes/MultiThemeProvider";
import ComponentShowcase from "./ComponentShowcase";

const DynamicDemo: React.FC = () => {
  return (
    <MultiThemeProvider defaultTheme="liquid-glass-light">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  PixelWizards Component Library
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Interactive demo of React components with theme switching
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                v1.0.0
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ComponentShowcase />
        </main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p>Built with React, TypeScript, and Tailwind CSS</p>
              <p className="mt-2">
                <a
                  href="https://github.com/hamedafzali/PixelWizardsComponent"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </MultiThemeProvider>
  );
};

export default DynamicDemo;
