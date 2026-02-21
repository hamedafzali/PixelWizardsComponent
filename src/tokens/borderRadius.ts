export const borderRadius = {
  // Professional border radius system
  none: '0',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
  
  // Component-specific radii
  button: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
  },
  
  card: {
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.25rem',    // 20px
  },
  
  input: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
  },
  
  modal: {
    sm: '0.75rem',    // 12px
    md: '1rem',       // 16px
    lg: '1.25rem',    // 20px
  },
  
  // Special radii for specific use cases
  pill: '9999px',
  circle: '50%',
}

export type BorderRadiusTokens = typeof borderRadius
