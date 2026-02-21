export const typography = {
  // Font families - Modern Inter-based stack
  fontFamily: {
    sans: [
      '"Inter"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(", "),
    mono: [
      '"SF Mono"',
      "Monaco",
      '"Cascadia Code"',
      '"Roboto Mono"',
      '"Consolas"',
      '"Liberation Mono"',
      '"Menlo"',
      "monospace",
    ].join(", "),
  },

  // Font sizes - Professional scale
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px
    "8xl": "6rem", // 96px
    "9xl": "8rem", // 128px
  },

  // Line heights
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  // Font weights
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  // Letter spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },

  // Text styles - Professional combinations
  textStyle: {
    // Headings
    h1: {
      fontSize: "2.25rem", // 36px
      fontWeight: "700",
      lineHeight: "2.5rem",
      letterSpacing: "-0.025em",
    },
    h2: {
      fontSize: "1.875rem", // 30px
      fontWeight: "600",
      lineHeight: "2.25rem",
      letterSpacing: "-0.025em",
    },
    h3: {
      fontSize: "1.5rem", // 24px
      fontWeight: "600",
      lineHeight: "2rem",
      letterSpacing: "-0.025em",
    },
    h4: {
      fontSize: "1.25rem", // 20px
      fontWeight: "600",
      lineHeight: "1.75rem",
    },
    h5: {
      fontSize: "1.125rem", // 18px
      fontWeight: "600",
      lineHeight: "1.75rem",
    },
    h6: {
      fontSize: "1rem", // 16px
      fontWeight: "600",
      lineHeight: "1.5rem",
    },

    // Body text
    body: {
      fontSize: "1rem", // 16px
      fontWeight: "400",
      lineHeight: "1.5rem",
    },
    bodyLarge: {
      fontSize: "1.125rem", // 18px
      fontWeight: "400",
      lineHeight: "1.75rem",
    },
    bodySmall: {
      fontSize: "0.875rem", // 14px
      fontWeight: "400",
      lineHeight: "1.25rem",
    },

    // UI elements
    caption: {
      fontSize: "0.75rem", // 12px
      fontWeight: "400",
      lineHeight: "1rem",
    },
    overline: {
      fontSize: "0.75rem", // 12px
      fontWeight: "600",
      lineHeight: "1rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },

    // Button text
    button: {
      fontSize: "0.875rem", // 14px
      fontWeight: "600",
      lineHeight: "1.25rem",
    },
    buttonLarge: {
      fontSize: "1rem", // 16px
      fontWeight: "600",
      lineHeight: "1.5rem",
    },
    buttonSmall: {
      fontSize: "0.75rem", // 12px
      fontWeight: "600",
      lineHeight: "1rem",
    },

    // Input text
    input: {
      fontSize: "1rem", // 16px
      fontWeight: "400",
      lineHeight: "1.5rem",
    },
    label: {
      fontSize: "0.875rem", // 14px
      fontWeight: "500",
      lineHeight: "1.25rem",
    },
  },
};

export type TypographyTokens = typeof typography;
