import React, { useState } from "react";
import {
  Button,
  Card,
  Input,
  Badge,
  Progress,
  Checkbox,
  Avatar,
  Alert,
  Toast,
  Tooltip,
  Modal,
  Login,
  Select,
  ThemeToggle,
  Table,
} from "../index";
import MultiThemeToggle from "../components/MultiThemeToggle";
import { useMultiTheme } from "../themes/MultiThemeProvider";
import { LiquidGlassCard, LiquidGlassButton } from "../components/LiquidGlass";

const ComponentShowcase: React.FC = () => {
  const {
    isLiquidGlass,
    themeInfo,
    isDark,
    toggleMode,
    setThemeType,
    availableThemes,
    currentThemeType,
  } = useMultiTheme();
  const [loading, setLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<
    "primary" | "secondary" | "ghost" | "outline" | "danger"
  >("primary");
  const [modalOpen, setModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const [demoToasts, setDemoToasts] = useState<
    Array<{
      id: number;
      status: "success" | "info" | "warning" | "error";
      title: string;
      description: string;
      actionLabel?: string;
      duration?: number;
    }>
  >([]);
  const [progressValue, setProgressValue] = useState(45);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableTheme, setTableTheme] = useState<
    "glass" | "clean" | "zebra" | "compact"
  >("glass");
  const [singleSelectValue, setSingleSelectValue] = useState<
    string | number | null
  >(null);
  const [multiSelectValue, setMultiSelectValue] = useState<
    Array<string | number>
  >([]);

  const selectOptions = [
    { value: "us", label: "United States", group: "North America" },
    { value: "ca", label: "Canada", group: "North America" },
    { value: "gb", label: "United Kingdom", group: "Europe" },
    { value: "de", label: "Germany", group: "Europe" },
    { value: "jp", label: "Japan", group: "Asia" },
    { value: "au", label: "Australia", group: "Oceania" },
  ];

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const pushToast = (
    status: "success" | "info" | "warning" | "error",
    title: string,
    description: string,
    options?: { actionLabel?: string; duration?: number },
  ) => {
    setDemoToasts((prev) => [
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        status,
        title,
        description,
        actionLabel: options?.actionLabel,
        duration: options?.duration,
      },
      ...prev,
    ]);
  };

  const removeToast = (id: number) => {
    setDemoToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const navSections = [
    { id: "buttons", label: "Buttons" },
    { id: "cards", label: "Cards" },
    { id: "inputs", label: "Inputs" },
    { id: "selects", label: "Selects" },
    { id: "badges", label: "Badges" },
    { id: "progress", label: "Progress" },
    { id: "checkboxes", label: "Checkboxes" },
    { id: "avatars", label: "Avatars" },
    { id: "alerts", label: "Alerts" },
    { id: "toasts", label: "Toasts" },
    { id: "tooltips", label: "Tooltips" },
    { id: "modals", label: "Modals" },
    { id: "themes", label: "Theme Toggle" },
    { id: "login", label: "Login" },
    { id: "table", label: "Table" },
  ];

  return (
    <div>
      <aside
        style={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          width: "250px",
          maxHeight: "calc(100vh - 2rem)",
          overflowY: "auto",
          padding: "1rem",
          borderRadius: "12px",
          border: "1px solid var(--color-border)",
          background: "var(--color-bg-surface)",
          boxShadow: "var(--shadow-md)",
          zIndex: 40,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            marginBottom: "0.75rem",
            color: "var(--color-text-primary)",
          }}
        >
          Showcase Menu
        </div>

        <div style={{ display: "grid", gap: "0.4rem", marginBottom: "1rem" }}>
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "0.86rem",
                textDecoration: "none",
              }}
            >
              {section.label}
            </a>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid var(--color-border-light)",
            paddingTop: "0.75rem",
          }}
        >
          <div
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Theme
          </div>
          <div style={{ display: "grid", gap: "0.35rem" }}>
            {availableThemes.map((theme) => (
              <Button
                key={theme}
                size="sm"
                variant={currentThemeType === theme ? "primary" : "outline"}
                onClick={() => setThemeType(theme)}
              >
                {theme}
              </Button>
            ))}
          </div>
        </div>
      </aside>

      <div
        className="container"
        style={{ padding: "2rem 0", marginLeft: "290px", width: "calc(100% - 290px)" }}
      >
      <header
        style={{
          marginBottom: "3rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              marginBottom: "0.5rem",
              background:
                "linear-gradient(90deg, var(--color-primary), #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            PixelWizards Component Library
          </h1>
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "1.125rem",
            }}
          >
            Complete showcase of all available components and styles
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <MultiThemeToggle />
          <div
            style={{
              padding: "0.5rem 1rem",
              background: "var(--color-bg-surface)",
              borderRadius: "0.5rem",
              border: "1px solid var(--color-border)",
              fontSize: "0.875rem",
              color: "var(--color-text-primary)",
            }}
          >
            {themeInfo.name} ({themeInfo.type})
          </div>
        </div>
      </header>

      {/* Buttons Section */}
      <section id="buttons" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Buttons
        </h2>

        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "500",
              marginBottom: "1rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Button Variants
          </h3>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "1rem",
            }}
          >
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="danger">Danger Button</Button>
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "500",
              marginBottom: "1rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Button States
          </h3>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "1rem",
            }}
          >
            <Button variant="primary" disabled>
              Disabled Button
            </Button>
            <Button
              variant="primary"
              loading={loading}
              onClick={handleButtonClick}
            >
              {loading ? "Loading..." : "Click to Load"}
            </Button>
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "500",
              marginBottom: "1rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Button Sizes
          </h3>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button variant="primary" size="sm">
              Small Button
            </Button>
            <Button variant="primary">Default Button</Button>
            <Button variant="primary" size="lg">
              Large Button
            </Button>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section id="cards" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Cards
        </h2>

        <div className="stats-grid" style={{ marginBottom: "2rem" }}>
          <Card variant={isLiquidGlass ? "glass" : "default"}>
            <div className="stat-card">
              <div className="stat-value">Default</div>
              <div className="stat-label">Card Variant</div>
            </div>
          </Card>

          <Card variant={isLiquidGlass ? "glass" : "elevated"} hover>
            <div className="stat-card">
              <div className="stat-value">Elevated</div>
              <div className="stat-label">With Hover</div>
            </div>
          </Card>

          <Card variant={isLiquidGlass ? "glass" : "outlined"}>
            <div className="stat-card">
              <div className="stat-value">Outlined</div>
              <div className="stat-label">Card Style</div>
            </div>
          </Card>

          <Card variant="glass">
            <div className="stat-card">
              <div className="stat-value">Glass</div>
              <div className="stat-label">Morphism</div>
            </div>
          </Card>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "500",
              marginBottom: "1rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Card with Different Padding
          </h3>
          <div className="stats-grid">
            <Card variant="elevated" padding="sm">
              <div style={{ padding: "1rem", textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    marginBottom: "0.5rem",
                  }}
                >
                  Small
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Padding
                </div>
              </div>
            </Card>

            <Card variant="elevated" padding="md">
              <div style={{ padding: "1.5rem", textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    marginBottom: "0.5rem",
                  }}
                >
                  Medium
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Padding
                </div>
              </div>
            </Card>

            <Card variant="elevated" padding="lg">
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    marginBottom: "0.5rem",
                  }}
                >
                  Large
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Padding
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Layout Examples */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Layout Examples
        </h2>

        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "500",
              marginBottom: "1rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Stats Grid Layout
          </h3>
          <div className="stats-grid">
            <Card variant="elevated" hover>
              <div className="stat-card">
                <div className="stat-value">$125,430</div>
                <div className="stat-label">Revenue</div>
              </div>
            </Card>
            <Card variant="elevated" hover>
              <div className="stat-card">
                <div className="stat-value">342</div>
                <div className="stat-label">Orders</div>
              </div>
            </Card>
            <Card variant="elevated" hover>
              <div className="stat-card">
                <div className="stat-value">89</div>
                <div className="stat-label">Customers</div>
              </div>
            </Card>
            <Card variant="elevated" hover>
              <div className="stat-card">
                <div className="stat-value">456</div>
                <div className="stat-label">Products</div>
              </div>
            </Card>
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "500",
              marginBottom: "1rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Modules Grid Layout
          </h3>
          <div className="modules-grid">
            <Card variant="default" hover>
              <div style={{ padding: "2rem" }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Organization Module
                </h3>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Manage your organization structure, departments, and teams
                  with comprehensive IAM features.
                </p>
                <Button variant="primary" style={{ width: "100%" }}>
                  Open Module
                </Button>
              </div>
            </Card>

            <Card variant="default" hover>
              <div style={{ padding: "2rem" }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    color: "var(--color-text-primary)",
                  }}
                >
                  User Management
                </h3>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Create and manage user accounts, permissions, and access
                  control across your organization.
                </p>
                <Button variant="secondary" style={{ width: "100%" }}>
                  Open Module
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Typography Examples */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Typography
        </h2>

        <Card variant="elevated" style={{ padding: "2rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "1rem",
                color: "var(--color-text-primary)",
              }}
            >
              Heading 1
            </h1>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--color-text-primary)",
              }}
            >
              Heading 2
            </h2>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--color-text-primary)",
              }}
            >
              Heading 3
            </h3>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "var(--color-text-primary)",
                marginBottom: "1rem",
              }}
            >
              This is a paragraph of body text. The component library provides
              consistent typography with proper contrast ratios and modern font
              stacks for optimal readability.
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--color-text-secondary)",
              }}
            >
              This is secondary text with reduced opacity for less important
              information.
            </p>
          </div>
        </Card>
      </section>

      {/* Color Palette */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Color Palette
        </h2>

        <div className="modules-grid">
          <Card variant="elevated">
            <div style={{ padding: "1.5rem" }}>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Primary Colors
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "0.5rem",
                }}
              >
                {[
                  "50",
                  "100",
                  "200",
                  "300",
                  "400",
                  "500",
                  "600",
                  "700",
                  "800",
                  "900",
                ].map((shade) => (
                  <div key={shade} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: `var(--color-primary-${shade})`,
                        borderRadius: "0.375rem",
                        marginBottom: "0.25rem",
                      }}
                    />
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {shade}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card variant="elevated">
            <div style={{ padding: "1.5rem" }}>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Semantic Colors
              </h3>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: "var(--color-success-500)",
                      borderRadius: "0.25rem",
                    }}
                  />
                  <span style={{ fontSize: "0.875rem" }}>Success</span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: "var(--color-warning-500)",
                      borderRadius: "0.25rem",
                    }}
                  />
                  <span style={{ fontSize: "0.875rem" }}>Warning</span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: "var(--color-error-500)",
                      borderRadius: "0.25rem",
                    }}
                  />
                  <span style={{ fontSize: "0.875rem" }}>Error</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Interactive Demo */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Interactive Demo
        </h2>

        <Card variant="glass" style={{ padding: "2rem" }}>
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Try the Components
            </h3>
            <p
              style={{
                color: "var(--color-text-secondary)",
                marginBottom: "2rem",
              }}
            >
              Select different button variants and see them in action
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginBottom: "1rem",
                }}
              >
                {(
                  [
                    "primary",
                    "secondary",
                    "ghost",
                    "outline",
                    "danger",
                  ] as const
                ).map((variant) => (
                  <Button
                    key={variant}
                    variant={variant === selectedVariant ? "primary" : "ghost"}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: "2rem",
                backgroundColor: "var(--color-background-secondary)",
                borderRadius: "0.75rem",
              }}
            >
              <Button
                variant={selectedVariant}
                size="lg"
                onClick={handleButtonClick}
                loading={loading}
              >
                {loading ? "Processing..." : `Selected: ${selectedVariant}`}
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Input Section */}
      <section id="inputs" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Input Fields
        </h2>
        <div style={{ display: "grid", gap: "1.5rem", maxWidth: "500px" }}>
          <Input
            label="Email Address"
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            helper="Must be at least 8 characters"
          />
          <Input
            label="Username"
            placeholder="Enter username"
            error="This field is required"
          />
          <Input
            label="Disabled Input"
            placeholder="This is disabled"
            disabled
          />
        </div>
      </section>

      {/* Select Section */}
      <section id="selects" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Select Fields
        </h2>
        <div style={{ display: "grid", gap: "1.5rem", maxWidth: "500px" }}>
          <Select
            options={selectOptions}
            value={singleSelectValue}
            onChange={(next) =>
              setSingleSelectValue(
                typeof next === "string" || typeof next === "number"
                  ? next
                  : null,
              )
            }
            placeholder="Choose a country"
            searchable
            clearable
            helperText="Single-select searchable dropdown"
          />
          <Select
            options={selectOptions}
            value={multiSelectValue}
            onChange={(next) =>
              setMultiSelectValue(Array.isArray(next) ? next : [])
            }
            placeholder="Choose multiple countries"
            multiple
            clearable
            helperText="Multi-select dropdown"
          />
          <ThemeToggle
            isDark={isDark}
            onToggle={toggleMode}
            size="md"
            className="pw-theme-toggle--liquid-glass"
          />
        </div>
      </section>

      {/* Badge Section */}
      <section id="badges" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Badges
        </h2>
        <Card variant="elevated" padding="lg">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                Colors
              </h3>
              <div
                style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
              >
                <Badge color="primary">Primary</Badge>
                <Badge color="success">Success</Badge>
                <Badge color="warning">Warning</Badge>
                <Badge color="error">Error</Badge>
                <Badge color="info">Info</Badge>
              </div>
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                Sizes
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                Dot Badges
              </h3>
              <div
                style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
              >
                <Badge dot>New</Badge>
                <Badge dot color="success">
                  Active
                </Badge>
                <Badge dot color="error">
                  Error
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Progress Section */}
      <section id="progress" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Progress Bars
        </h2>
        <Card variant="elevated" padding="lg">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                  Default Progress
                </span>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {progressValue}%
                </span>
              </div>
              <Progress value={progressValue} showLabel animated />
            </div>
            <div>
              <div style={{ marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                  Striped Variant
                </span>
              </div>
              <Progress
                value={75}
                variant="striped"
                color="success"
                showLabel
              />
            </div>
            <div>
              <div style={{ marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                  Gradient Variant
                </span>
              </div>
              <Progress
                value={60}
                variant="gradient"
                color="primary"
                showLabel
              />
            </div>
            <div>
              <div style={{ marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                  Different Colors
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <Progress value={80} color="success" size="sm" />
                <Progress value={65} color="warning" size="md" />
                <Progress value={50} color="error" size="lg" />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Checkbox Section */}
      <section id="checkboxes" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Checkboxes
        </h2>
        <Card variant="elevated" padding="lg">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Checkbox label="Accept terms and conditions" />
            <Checkbox label="Subscribe to newsletter" defaultChecked />
            <Checkbox label="Select all items" indeterminate />
            <Checkbox label="Disabled checkbox" disabled />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                marginTop: "0.5rem",
              }}
            >
              <Checkbox size="sm" label="Small checkbox" />
              <Checkbox size="md" label="Medium checkbox" />
              <Checkbox size="lg" label="Large checkbox" />
            </div>
          </div>
        </Card>
      </section>

      {/* Avatar Section */}
      <section id="avatars" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Avatars
        </h2>
        <Card variant="elevated" padding="lg">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                With Initials
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Avatar name="John Doe" />
                <Avatar name="Jane Smith" />
                <Avatar name="Bob Johnson" />
              </div>
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                Sizes
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Avatar name="User" size="xs" />
                <Avatar name="User" size="sm" />
                <Avatar name="User" size="md" />
                <Avatar name="User" size="lg" />
                <Avatar name="User" size="xl" />
              </div>
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                Square Variant
              </h3>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Avatar name="Square" variant="square" />
                <Avatar name="Square" variant="square" size="lg" />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Alert Section */}
      <section id="alerts" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Alerts
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "500px",
          }}
        >
          <Alert
            status="info"
            title="Information"
            description="This is an informational alert message."
          />
          <Alert
            status="success"
            title="Success"
            description="Your action was completed successfully!"
          />
          <Alert
            status="warning"
            title="Warning"
            description="Please be careful with this action."
          />
          <Alert
            status="error"
            title="Error"
            description="Something went wrong. Please try again."
          />
          {alertVisible && (
            <Alert
              status="info"
              title="Info Alert"
              description="This is an informational message."
              closable
              onClose={() => setAlertVisible(false)}
            />
          )}
        </div>
      </section>

      {/* Toast Section */}
      <section id="toasts" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Toasts
        </h2>
        <Card variant="elevated" padding="lg">
          <div
            style={{
              display: "grid",
              gap: "1rem",
            }}
          >
            <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
              Show different toast variants and positions.
            </p>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              <Button
                onClick={() =>
                  pushToast(
                    "success",
                    "Saved",
                    "Your settings were saved successfully.",
                    { actionLabel: "Undo" },
                  )
                }
              >
                Success
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  pushToast("info", "Heads up", "A new release is available.")
                }
              >
                Info
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  pushToast(
                    "warning",
                    "Storage almost full",
                    "You are using 92% of your quota.",
                    { actionLabel: "Manage" },
                  )
                }
              >
                Warning
              </Button>
              <Button
                variant="danger"
                onClick={() =>
                  pushToast(
                    "error",
                    "Upload failed",
                    "Network timeout. Please retry.",
                    { duration: 5000 },
                  )
                }
              >
                Error
              </Button>
            </div>
          </div>
        </Card>
        {demoToasts.map((toast, index) => (
          <Toast
            key={toast.id}
            open
            status={toast.status}
            title={toast.title}
            description={toast.description}
            actionLabel={toast.actionLabel}
            onAction={() => removeToast(toast.id)}
            onClose={() => removeToast(toast.id)}
            position="bottom-right"
            duration={toast.duration}
            stackIndex={index}
          />
        ))}
      </section>

      {/* Tooltip Section */}
      <section id="tooltips" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Tooltips
        </h2>
        <Card variant="elevated" padding="lg">
          <div
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              padding: "2rem",
            }}
          >
            <Tooltip content="This is a top tooltip" placement="top">
              <Button>Hover Top</Button>
            </Tooltip>
            <Tooltip content="This is a right tooltip" placement="right">
              <Button>Hover Right</Button>
            </Tooltip>
            <Tooltip content="This is a bottom tooltip" placement="bottom">
              <Button>Hover Bottom</Button>
            </Tooltip>
            <Tooltip content="This is a left tooltip" placement="left">
              <Button>Hover Left</Button>
            </Tooltip>
          </div>
        </Card>
      </section>

      {/* Modal Section */}
      <section id="modals" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Modal Dialog
        </h2>
        <Card variant="elevated" padding="lg">
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                marginBottom: "1.5rem",
                color: "var(--color-text-secondary)",
              }}
            >
              Click the button below to open a modal dialog
            </p>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          </div>
        </Card>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example Modal"
          footer={
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            </div>
          }
        >
          <p
            style={{
              color: "var(--color-text-secondary)",
              marginBottom: "1rem",
            }}
          >
            This is a modal dialog example. You can put any content here.
          </p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            Click outside or press ESC to close, or use the buttons in the
            footer.
          </p>
        </Modal>
      </section>

      {/* Theme Toggle Section */}
      <section id="themes" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Theme Toggle
        </h2>
        <Card variant="elevated" padding="lg">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              alignItems: "flex-start",
            }}
          >
            <div>
              <p
                style={{
                  marginBottom: "1rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                Switch between light and dark themes using the toggle in the
                header, or try these:
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <MultiThemeToggle size="sm" />
                <MultiThemeToggle size="md" />
                <MultiThemeToggle size="lg" />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Login Section */}
      <section id="login" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Login Form
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--color-text-secondary)",
                textAlign: "center",
              }}
            >
              Default Login
            </h3>
            <Login
              onSubmit={(values) => {
                console.log("Login submitted:", values);
                alert(
                  `Login: ${values.username}\nRemember me: ${
                    values.rememberMe || false
                  }`,
                );
              }}
              submitText="Sign In"
            />
          </div>
          <div>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--color-text-secondary)",
                textAlign: "center",
              }}
            >
              With Error
            </h3>
            <Login
              onSubmit={(values) => {
                console.log("Login submitted:", values);
              }}
              error="Invalid username or password. Please try again."
              submitText="Sign In"
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Login
            title="Welcome Back"
            subtitle="Sign in to continue to your account"
            onSubmit={(values) => {
              console.log("Login submitted:", values);
            }}
            onForgotPassword={() => alert("Forgot password clicked")}
            submitText="Sign In"
          >
            <div>
              Don&apos;t have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Sign up clicked");
                }}
                style={{
                  color: "var(--color-primary)",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                Sign up
              </a>
            </div>
          </Login>
        </div>
      </section>

      {/* Liquid Glass Section - Only show when in liquid glass theme */}
      {isLiquidGlass && (
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1.5rem",
              color: "var(--color-text-primary)",
            }}
          >
            Liquid Glass Components
          </h2>
          <Card>
            <div
              style={{
                padding: "1.5rem",
              }}
            >
              <p
                style={{
                  marginBottom: "1.5rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                Advanced glassmorphism effects with modern Liquid Glass design.
                These components use backdrop-filter, transparency, and light
                effects.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <LiquidGlassCard blur="medium" alpha={0.75} edgeLight="soft">
                  <h3 style={{ color: "white", marginBottom: "0.5rem" }}>
                    Basic Glass Card
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "0.875rem",
                    }}
                  >
                    Simple liquid glass effect with medium blur and soft edge
                    lighting.
                  </p>
                </LiquidGlassCard>

                <LiquidGlassCard
                  blur="strong"
                  alpha={0.65}
                  edgeLight="medium"
                  reflection="subtle"
                >
                  <h3 style={{ color: "white", marginBottom: "0.5rem" }}>
                    Advanced Glass Card
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "0.875rem",
                    }}
                  >
                    Strong blur with medium edge lighting and subtle reflection
                    effects.
                  </p>
                </LiquidGlassCard>

                <LiquidGlassCard
                  blur="ultra"
                  alpha={0.55}
                  edgeLight="strong"
                  reflection="medium"
                  floating={true}
                >
                  <h3 style={{ color: "white", marginBottom: "0.5rem" }}>
                    Premium Glass Card
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "0.875rem",
                    }}
                  >
                    Ultra blur with strong edge lighting, medium reflection, and
                    floating animation.
                  </p>
                </LiquidGlassCard>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  marginBottom: "2rem",
                }}
              >
                <LiquidGlassButton variant="primary">
                  Primary Glass
                </LiquidGlassButton>
                <LiquidGlassButton variant="secondary">
                  Secondary Glass
                </LiquidGlassButton>
                <LiquidGlassButton variant="ghost">
                  Ghost Glass
                </LiquidGlassButton>
                <LiquidGlassButton loading>Loading Glass</LiquidGlassButton>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Table Section */}
      <section id="table" style={{ marginBottom: "3rem", scrollMarginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "var(--color-text-primary)",
          }}
        >
          Data Table
        </h2>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "1rem",
          }}
        >
          {["glass", "clean", "zebra", "compact"].map((theme) => (
            <Button
              key={theme}
              size="sm"
              variant={tableTheme === theme ? "primary" : "outline"}
              onClick={() =>
                setTableTheme(theme as "glass" | "clean" | "zebra" | "compact")
              }
            >
              {theme}
            </Button>
          ))}
        </div>

        <Table
          theme={tableTheme}
          data={{
            table: "Users",
            columns: [
              {
                column_name: "id",
                data_type: "integer",
                is_nullable: "NO",
                column_default: null,
              },
              {
                column_name: "name",
                data_type: "varchar",
                is_nullable: "NO",
                column_default: null,
              },
              {
                column_name: "email",
                data_type: "varchar",
                is_nullable: "YES",
                column_default: null,
              },
              {
                column_name: "role",
                data_type: "varchar",
                is_nullable: "NO",
                column_default: "'user'",
              },
            ],
            data: [
              {
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                role: "admin",
              },
              {
                id: 2,
                name: "Jane Smith",
                email: "jane@example.com",
                role: "user",
              },
              {
                id: 3,
                name: "Bob Johnson",
                email: "bob@example.com",
                role: "user",
              },
              {
                id: 4,
                name: "Alice Brown",
                email: "alice@example.com",
                role: "moderator",
              },
              {
                id: 5,
                name: "Charlie Wilson",
                email: "charlie@example.com",
                role: "user",
              },
            ],
            pagination: {
              page: currentPage,
              limit: 5,
              total: 25,
              totalPages: 5,
            },
          }}
          onPageChange={setCurrentPage}
        />
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "2rem 0",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <p style={{ color: "var(--color-text-secondary)" }}>
          Pixel Wizards Component Library - Modern, Professional, Accessible
        </p>
      </footer>
      </div>
    </div>
  );
};

export default ComponentShowcase;
