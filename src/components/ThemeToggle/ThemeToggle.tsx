import React from "react";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  isDark?: boolean;
  onToggle?: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  size = "md",
  isDark = false,
  onToggle,
}) => {
  const handleClick = () => {
    if (onToggle) {
      onToggle();
    }
  };

  const getIcon = () => {
    if (isDark) {
      // Moon icon for dark mode
      return (
        <svg
          className="pw-theme-toggle__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      );
    } else {
      // Sun icon for light mode
      return (
        <svg
          className="pw-theme-toggle__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      );
    }
  };

  const sizeClasses = {
    sm: "pw-theme-toggle--sm",
    md: "pw-theme-toggle--md",
    lg: "pw-theme-toggle--lg",
  };

  return (
    <button
      className={`pw-theme-toggle ${sizeClasses[size]} ${className}`}
      onClick={handleClick}
      aria-label={`Current theme: ${
        isDark ? "dark" : "light"
      }. Click to toggle theme`}
      title={`${isDark ? "Dark" : "Light"} mode (Click to toggle)`}
      style={{
        background: "var(--color-surface-primary)",
        border: "1px solid var(--color-border-primary)",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        color: "var(--color-text-primary)",
        width: size === "sm" ? "32px" : size === "lg" ? "48px" : "40px",
        height: size === "sm" ? "32px" : size === "lg" ? "48px" : "40px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <svg
        width={size === "sm" ? "16" : size === "lg" ? "24" : "20"}
        height={size === "sm" ? "16" : size === "lg" ? "24" : "20"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {getIcon()}
      </svg>
    </button>
  );
};

export default ThemeToggle;
