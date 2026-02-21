import React from "react";
import { createRoot } from "react-dom/client";
import { MultiThemeProvider } from "../themes/MultiThemeProvider";
import ComponentShowcase from "./ComponentShowcase";
import "../styles/global.css";

const DemoApp: React.FC = () => {
  return (
    <MultiThemeProvider defaultTheme="liquid-glass-light">
      <div className="dashboard-page">
        <ComponentShowcase />
      </div>
    </MultiThemeProvider>
  );
};

// Mount the demo app to the root element
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<DemoApp />);
}

export default DemoApp;
