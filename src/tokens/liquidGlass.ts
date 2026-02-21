// iOS 26 Liquid Glass Design Tokens
// Enhanced glassmorphism with advanced blur, transparency, and light effects

export const liquidGlassTokens = {
  // Advanced Blur Effects
  blur: {
    // Subtle blur for background elements
    subtle: "blur(8px) saturate(120%)",
    // Medium blur for cards and panels
    medium: "blur(16px) saturate(150%)",
    // Strong blur for overlays and modals
    strong: "blur(24px) saturate(180%)",
    // Ultra blur for dramatic depth
    ultra: "blur(32px) saturate(200%)",
    // Dynamic blur for interactive elements
    dynamic: "blur(20px) saturate(160%)",
  },

  // Layered Transparency System
  transparency: {
    // Background Layer - 100% opacity for wallpapers/base content
    background: 1.0,
    // Glass Layer - Semi-transparent panels and cards
    glass: {
      // Light glass for navigation bars
      light: 0.85,
      // Medium glass for cards and panels
      medium: 0.75,
      // Heavy glass for overlays
      heavy: 0.65,
      // Subtle glass for decorative elements
      subtle: 0.4,
    },
    // Solid Layer - Critical text and buttons (100% opacity)
    solid: 1.0,
    // Dynamic Layer - Floating elements and overlays
    dynamic: {
      // High visibility for important overlays
      high: 0.9,
      // Medium visibility for contextual elements
      medium: 0.7,
      // Low visibility for atmospheric effects
      low: 0.3,
    },
  },

  // Advanced Light Effects
  light: {
    // Edge lighting for glass surfaces
    edgeLight: {
      // Soft edge glow
      soft: "0 0 20px rgba(255, 255, 255, 0.1)",
      // Medium edge glow
      medium: "0 0 30px rgba(255, 255, 255, 0.15)",
      // Strong edge glow
      strong: "0 0 40px rgba(255, 255, 255, 0.2)",
    },
    // Reflection effects
    reflection: {
      // Subtle surface reflection
      subtle:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
      // Medium surface reflection
      medium:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%)",
      // Strong surface reflection
      strong:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
    },
    // Ambient lighting
    ambient: {
      // Cool ambient light
      cool: "rgba(59, 130, 246, 0.05)",
      // Warm ambient light
      warm: "rgba(251, 191, 36, 0.05)",
      // Neutral ambient light
      neutral: "rgba(255, 255, 255, 0.05)",
    },
  },

  // Glass Surface Properties
  glass: {
    // Background colors with transparency
    background: {
      // Light mode glass backgrounds
      light: {
        primary: "rgba(255, 255, 255, 0.85)",
        secondary: "rgba(255, 255, 255, 0.75)",
        tertiary: "rgba(255, 255, 255, 0.65)",
        overlay: "rgba(255, 255, 255, 0.95)",
      },
      // Dark mode glass backgrounds
      dark: {
        primary: "rgba(10, 10, 10, 0.85)",
        secondary: "rgba(20, 20, 20, 0.75)",
        tertiary: "rgba(30, 30, 30, 0.65)",
        overlay: "rgba(10, 10, 10, 0.95)",
      },
    },
    // Border styling for glass elements
    border: {
      // Light mode borders
      light: {
        primary: "rgba(255, 255, 255, 0.2)",
        secondary: "rgba(255, 255, 255, 0.1)",
        focus: "rgba(59, 130, 246, 0.3)",
      },
      // Dark mode borders
      dark: {
        primary: "rgba(255, 255, 255, 0.1)",
        secondary: "rgba(255, 255, 255, 0.05)",
        focus: "rgba(59, 130, 246, 0.2)",
      },
    },
    // Shadow effects for glass depth
    shadow: {
      // Subtle depth shadow
      subtle:
        "0 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)",
      // Medium depth shadow
      medium:
        "0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      // Strong depth shadow
      strong:
        "0 16px 64px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.15)",
      // Floating shadow for elevated elements
      floating: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
    },
  },

  // Dynamic Effects
  motion: {
    // Smooth transitions for glass effects
    glass: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    // Quick transitions for interactive elements
    interactive: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    // Slow transitions for background changes
    background: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    // Bounce effect for dynamic elements
    bounce: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },

  // Layer System for Component Hierarchy
  layers: {
    // Background layer (wallpapers, base content)
    background: "z-index: 0",
    // Glass layer (panels, cards, containers)
    glass: "z-index: 10",
    // Solid layer (critical text, buttons)
    solid: "z-index: 20",
    // Dynamic layer (floating elements, overlays)
    dynamic: "z-index: 30",
    // Modal layer (dialogs, alerts)
    modal: "z-index: 40",
    // Toast/notification layer
    toast: "z-index: 50",
  },

  // Component-Specific Glass Variants
  components: {
    // Navigation bar glass
    navigation: {
      background: "var(--glass-background-primary)",
      blur: "var(--blur-medium)",
      border: "var(--glass-border-primary)",
      shadow: "var(--glass-shadow-subtle)",
    },
    // Card glass
    card: {
      background: "var(--glass-background-secondary)",
      blur: "var(--blur-subtle)",
      border: "var(--glass-border-secondary)",
      shadow: "var(--glass-shadow-medium)",
    },
    // Modal glass
    modal: {
      background: "var(--glass-background-overlay)",
      blur: "var(--blur-strong)",
      border: "var(--glass-border-primary)",
      shadow: "var(--glass-shadow-strong)",
    },
    // Button glass (for ghost/outline variants)
    button: {
      background: "var(--glass-background-tertiary)",
      blur: "var(--blur-subtle)",
      border: "var(--glass-border-secondary)",
      shadow: "var(--glass-shadow-subtle)",
    },
  },
};

export type LiquidGlassTokens = typeof liquidGlassTokens;
