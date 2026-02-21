export const shadows = {
  // Modern shadow system with better depth and realism
  none: 'none',
  
  // Subtle shadows for UI elements (layered for depth)
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 1px 0 rgba(0, 0, 0, 0.03)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
  
  // Colored shadows for branding (more vibrant)
  primary: '0 4px 14px 0 rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)',
  secondary: '0 4px 14px 0 rgba(168, 85, 247, 0.25), 0 0 0 1px rgba(168, 85, 247, 0.1)',
  success: '0 4px 14px 0 rgba(34, 197, 94, 0.25), 0 0 0 1px rgba(34, 197, 94, 0.1)',
  warning: '0 4px 14px 0 rgba(245, 158, 11, 0.25), 0 0 0 1px rgba(245, 158, 11, 0.1)',
  error: '0 4px 14px 0 rgba(239, 68, 68, 0.25), 0 0 0 1px rgba(239, 68, 68, 0.1)',
  
  // Interactive shadows (more pronounced)
  hover: '0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
  active: '0 5px 10px -3px rgba(0, 0, 0, 0.12), 0 2px 4px -2px rgba(0, 0, 0, 0.08)',
  focus: '0 0 0 3px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.5)',
  
  // Modern glass morphism shadows
  glass: '0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.1)',
  glassHover: '0 12px 40px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.15)',
  
  // Inner shadows for inputs (subtle)
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(0, 0, 0, 0.05)',
}

export type ShadowTokens = typeof shadows
