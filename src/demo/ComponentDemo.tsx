import React, { useState } from "react";
import { Button } from "../components/Button/Button";
import { Badge } from "../components/Badge/Badge";

// Import any icons you want to use
import {
  FiSun,
  FiMoon,
  FiCheck,
  FiAlertCircle,
  FiArrowRight,
} from "react-icons/fi";

export const ComponentDemo: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      return newTheme;
    });
  };

  return (
    <div className="demo-container" data-theme={theme}>
      <header className="demo-header">
        <h1>PW Component Library</h1>
        <Button
          variant="ghost"
          size="sm"
          icon={theme === "light" ? <FiMoon /> : <FiSun />}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        />
      </header>

      <section className="demo-section">
        <h2>Buttons</h2>

        <div className="component-grid">
          {/* Primary Buttons */}
          <div className="component-showcase">
            <h3>Primary</h3>
            <div className="button-group">
              <Button variant="primary">Primary</Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button variant="primary" icon={<FiCheck />}>
                With Icon
              </Button>
              <Button variant="primary" loading>
                Loading
              </Button>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div className="component-showcase">
            <h3>Secondary</h3>
            <div className="button-group">
              <Button variant="secondary">Secondary</Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
              <Button
                variant="secondary"
                icon={<FiArrowRight />}
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </div>

          {/* Outline Buttons */}
          <div className="component-showcase">
            <h3>Outline</h3>
            <div className="button-group">
              <Button variant="outline">Outline</Button>
              <Button variant="outline" disabled>
                Disabled
              </Button>
              <Button variant="outline" icon={<FiArrowRight />} />
            </div>
          </div>

          {/* Danger Buttons */}
          <div className="component-showcase">
            <h3>Danger</h3>
            <div className="button-group">
              <Button variant="danger">Delete</Button>
              <Button variant="danger" disabled>
                Disabled
              </Button>
              <Button variant="danger" icon={<FiAlertCircle />}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Badges</h2>
        <div className="component-grid">
          <div className="component-showcase">
            <h3>Default</h3>
            <div className="badge-group">
              <Badge>Default</Badge>
              <Badge color="primary">Primary</Badge>
              <Badge color="success">Success</Badge>
              <Badge color="warning">Warning</Badge>
              <Badge color="error">Error</Badge>
            </div>
          </div>

          <div className="component-showcase">
            <h3>Solid</h3>
            <div className="badge-group">
              <Badge variant="solid">Default</Badge>
              <Badge variant="solid" color="primary">
                Primary
              </Badge>
              <Badge variant="solid" color="success">
                Success
              </Badge>
              <Badge variant="solid" color="warning">
                Warning
              </Badge>
              <Badge variant="solid" color="error">
                Error
              </Badge>
            </div>
          </div>

          <div className="component-showcase">
            <h3>Outline</h3>
            <div className="badge-group">
              <Badge variant="outline">Default</Badge>
              <Badge variant="outline" color="primary">
                Primary
              </Badge>
              <Badge variant="outline" color="success">
                Success
              </Badge>
              <Badge variant="outline" color="warning">
                Warning
              </Badge>
              <Badge variant="outline" color="error">
                Error
              </Badge>
            </div>
          </div>

          <div className="component-showcase">
            <h3>With Dot</h3>
            <div className="badge-group">
              <Badge dot>Default</Badge>
              <Badge dot color="primary">
                Primary
              </Badge>
              <Badge dot color="success">
                Success
              </Badge>
              <Badge dot color="warning">
                Warning
              </Badge>
              <Badge dot color="error">
                Error
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
        n :root {
          /* Light theme */
          --color-bg: #ffffff;
          --color-text: #1a1a1a;
          --color-primary: #3b82f6;
          --color-primary-dark: #2563eb;
          --color-error: #ef4444;
          --color-error-dark: #dc2626;
          --color-success: #10b981;
          --color-warning: #f59e0b;
          --color-border: #e5e7eb;
          --color-bg-secondary: #f9fafb;
          --color-bg-elevated: #ffffff;
          --color-text-secondary: #4b5563;
          --radius-sm: 0.25rem;
          --radius-md: 0.375rem;
          --radius-lg: 0.5rem;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        [data-theme="dark"] {
          --color-bg: #0f172a;
          --color-text: #f8fafc;
          --color-primary: #60a5fa;
          --color-primary-dark: #3b82f6;
          --color-error: #f87171;
          --color-error-dark: #ef4444;
          --color-success: #34d399;
          --color-warning: #fbbf24;
          --color-border: #334155;
          --color-bg-secondary: #1e293b;
          --color-bg-elevated: #334155;
          --color-text-secondary: #94a3b8;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          background-color: var(--color-bg);
          color: var(--color-text);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .demo-container {
          min-height: 100vh;
          padding: 2rem;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .demo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--color-border);
        }

        .demo-header h1 {
          font-size: 1.875rem;
          font-weight: 700;
          background: linear-gradient(90deg, var(--color-primary), #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .demo-section {
          margin-bottom: 4rem;
        }

        .demo-section h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: var(--color-text);
        }

        .component-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 1.5rem;
        }

        .component-showcase {
          background: var(--color-bg-elevated);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          transition: all 0.2s ease;
        }

        .component-showcase:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .component-showcase h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--color-text);
        }

        .button-group,
        .badge-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        @media (max-width: 640px) {
          .demo-container {
            padding: 1rem;
          }

          .component-grid {
            grid-template-columns: 1fr;
          }
        }
      `}
      </style>
    </div>
  );
};

export default ComponentDemo;
