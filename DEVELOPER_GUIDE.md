# PW Component Library - Developer Guide

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Theme System](#theme-system)
- [Liquid Glass Theme](#liquid-glass-theme)
- [Component Library](#component-library)
- [Multi-Theme System](#multi-theme-system)
- [Custom Theming](#custom-theming)
- [Development](#development)
- [Best Practices](#best-practices)

## Installation

```bash
npm install
npm run dev
```

The development server will start at `http://localhost:5174`

## Quick Start

### Basic Usage

```tsx
import React from "react";
import { MultiThemeProvider } from "./src/themes/MultiThemeProvider";
import { Button, Card, Input } from "./src/components";

function App() {
  return (
    <MultiThemeProvider defaultTheme="liquid-glass-light">
      <div>
        <Card variant="glass">
          <h1>Welcome to PW</h1>
          <Input placeholder="Enter your name" />
          <Button variant="primary">Get Started</Button>
        </Card>
      </div>
    </MultiThemeProvider>
  );
}
```

## Theme System

PW includes a powerful multi-theme system with support for:

### Available Themes

- **Light Theme** (`light`) - Clean, modern light theme
- **Dark Theme** (`dark`) - Elegant dark theme
- **Liquid Glass Light** (`liquid-glass-light`) - Modern glassmorphism
- **Liquid Glass Dark** (`liquid-glass-dark`) - Dark glassmorphism with blur effects

### Theme Provider

```tsx
import { MultiThemeProvider } from "./src/themes/MultiThemeProvider";

<MultiThemeProvider defaultTheme="liquid-glass-light">
  <YourApp />
</MultiThemeProvider>;
```

### Theme Toggle Component

```tsx
import { MultiThemeToggle } from "./src/components/MultiThemeToggle";

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <MultiThemeToggle />
    </header>
  );
}
```

#### Theme Toggle Features

- **Click**: Cycles through all 4 themes
- **Right-click**: Toggles between original and liquid glass styles
- **Icons**: Dynamic icons that change based on current theme
- **Sizes**: Available in `sm`, `md`, `lg` variants

```tsx
<MultiThemeToggle size="md" />
```

### Using Theme Information

```tsx
import { useMultiTheme } from "./src/themes/MultiThemeProvider";

function ThemeInfo() {
  const { themeInfo, isLiquidGlass, currentThemeType } = useMultiTheme();

  return (
    <div>
      <p>Current Theme: {themeInfo.name}</p>
      <p>Theme Type: {themeInfo.type}</p>
      <p>Is Liquid Glass: {isLiquidGlass ? "Yes" : "No"}</p>
    </div>
  );
}
```

## Liquid Glass Theme

The Liquid Glass theme provides modern glassmorphism effects with:

### Features

- **Backdrop Blur**: Adjustable blur intensities (8px to 32px)
- **Transparency**: Multiple alpha levels (0.65 to 0.95)
- **Edge Lighting**: Subtle glow effects
- **Reflections**: Light reflection effects
- **Floating Animations**: Smooth floating effects
- **Perfect Contrast**: Optimized text colors for readability

### Glass Effects

#### Visual Properties

```css
/* Glass background */
background: rgba(255, 255, 255, 0.85);
backdrop-filter: blur(16px) saturate(150%);
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
```

#### Color System

- **Light Theme**: Dark text on light glass backgrounds
- **Dark Theme**: Light text on dark glass backgrounds
- **Perfect Contrast**: WCAG compliant readability
- **Consistent Hierarchy**: Clear visual structure

### Liquid Glass Components

#### Using Glass Variants

```tsx
import { Card, Button } from "./src/components";

function GlassExample() {
  return (
    <div>
      {/* Glass card with blur effect */}
      <Card variant="glass">
        <h3>Glass Card</h3>
        <p>Beautiful glassmorphism effect</p>
      </Card>

      {/* Glass button */}
      <Button variant="primary">Glass Button</Button>
    </div>
  );
}
```

#### Specialized Glass Components

```tsx
import { LiquidGlassCard, LiquidGlassButton } from './src/components/LiquidGlass';

<LiquidGlassCard blur="medium" alpha={0.75}>
  <h3>Premium Glass</h3>
  <p>Advanced glass effects</p>
</LiquidGlassCard>

<LiquidGlassButton variant="primary">Glass Button</LiquidGlassButton>
```

### Glass Component Props

#### LiquidGlassCard

- **blur**: `light`, `medium`, `strong`, `ultra`
- **alpha**: `0.1` - `1.0` (transparency level)
- **edgeLight**: `none`, `soft`, `medium`, `strong`
- **reflection**: `none`, `subtle`, `medium`, `strong`
- **floating**: `boolean` (enables floating animation)

#### LiquidGlassButton

- **variant**: `primary`, `secondary`, `ghost`
- **size**: `sm`, `md`, `lg`
- **loading**: `boolean`

## Component Library

### Core Components

#### Button

```tsx
import { Button } from "./src/components";

<Button variant="primary" size="md" loading={false}>
  Click me
</Button>;
```

**Variants:** `primary`, `secondary`, `ghost`, `danger`
**Sizes:** `sm`, `md`, `lg`
**Props:** `loading`, `disabled`, `onClick`, `type`

#### Card

```tsx
import { Card } from "./src/components";

<Card variant="glass">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>;
```

**Variants:** `default`, `elevated`, `outlined`, `glass`

#### Input

```tsx
import { Input } from "./src/components";

<Input
  placeholder="Enter text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error={hasError}
  helperText="This field is required"
/>;
```

**Props:** `placeholder`, `value`, `onChange`, `error`, `helperText`, `disabled`

#### Modal

```tsx
import { Modal } from "./src/components";

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h2>Modal Title</h2>
  <p>Modal content</p>
</Modal>;
```

#### Alert

```tsx
import { Alert } from "./src/components";

<Alert variant="success" dismissible>
  Operation completed successfully!
</Alert>;
```

**Variants:** `success`, `warning`, `error`, `info`

#### Avatar

```tsx
import { Avatar } from "./src/components";

<Avatar src="/path/to/image.jpg" alt="User Name" size="md" fallback="UN" />;
```

**Sizes:** `sm`, `md`, `lg`, `xl`

#### Checkbox

```tsx
import { Checkbox } from "./src/components";

<Checkbox
  checked={isChecked}
  onChange={(checked) => setIsChecked(checked)}
  label="I agree to terms"
/>;
```

#### Progress

```tsx
import { Progress } from "./src/components";

<Progress value={75} max={100} showLabel />;
```

#### Badge

```tsx
import { Badge } from './src/components';

<Badge variant="primary">New</Badge>
<Badge variant="success">Completed</Badge>
```

#### Tooltip

```tsx
import { Tooltip } from "./src/components";

<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>;
```

#### Login Component

```tsx
import { Login } from "./src/components";

<Login
  onSubmit={(values) => console.log(values)}
  submitText="Sign In"
  showRememberMe={true}
/>;
```

## Multi-Theme System

### Programmatic Theme Control

```tsx
import { useMultiTheme } from "./src/themes/MultiThemeProvider";

function ThemeControls() {
  const {
    setThemeType,
    cycleTheme,
    cycleThemeCategory,
    availableThemes,
    currentThemeType,
  } = useMultiTheme();

  return (
    <div>
      <select
        value={currentThemeType}
        onChange={(e) => setThemeType(e.target.value)}
      >
        {availableThemes.map((theme) => (
          <option key={theme} value={theme}>
            {theme.replace("-", " ").toUpperCase()}
          </option>
        ))}
      </select>

      <button onClick={cycleTheme}>Next Theme</button>
      <button onClick={cycleThemeCategory}>Toggle Style</button>
    </div>
  );
}
```

### Theme Categories

```tsx
import { themeCategories } from "./src/themes/multiThemeSystem";

// Access theme categories
console.log(themeCategories.original); // ['light', 'dark']
console.log(themeCategories.liquidGlass); // ['liquid-glass-light', 'liquid-glass-dark']
```

### Theme Persistence

The multi-theme system automatically:

- Saves theme preference to localStorage
- Detects system color scheme preference
- Provides smooth theme transitions

## Custom Theming

### Creating Custom Themes

```tsx
import { createCustomTheme } from "./src/themes/multiThemeSystem";

const customTheme = createCustomTheme({
  id: "custom-theme",
  name: "Custom Theme",
  mode: "light",
  type: "custom",
  colors: {
    primary: "#your-brand-color",
    // ... other color tokens
  },
  // ... other theme properties
});
```

### CSS Custom Properties

The theme system exposes CSS custom properties for styling:

```css
.my-custom-component {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}
```

### Available CSS Variables

#### Colors

- `--color-primary` - Primary brand color
- `--color-text-primary` - Main text color
- `--color-text-secondary` - Secondary text color
- `--color-bg-primary` - Primary background
- `--color-bg-surface` - Surface background
- `--color-border` - Border color

#### Glass Effects (Liquid Glass)

- `--glass-bg-light-primary` - Light glass background
- `--glass-bg-dark-primary` - Dark glass background
- `--glass-blur-medium` - Medium blur intensity
- `--glass-border-light` - Light glass border

## Development

### Project Structure

```
components/
├── src/
│   ├── components/          # React components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── LiquidGlass/     # Liquid glass components
│   │   └── MultiThemeToggle/
│   ├── themes/              # Theme system
│   │   ├── multiThemeSystem.ts
│   │   ├── MultiThemeProvider.tsx
│   │   └── [theme files]
│   ├── styles/              # CSS files
│   │   ├── global.css
│   │   ├── components.css
│   │   └── liquidGlass.css
│   └── examples/            # Demo components
└── DEVELOPER_GUIDE.md       # This file
```

### Running Examples

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linting
npm run type-check   # TypeScript type checking
```

### Component Development

When creating new components:

1. **Use theme hooks** for theming:

   ```tsx
   import { useTheme } from "./src/themes/ThemeProvider";
   // or
   import { useMultiTheme } from "./src/themes/MultiThemeProvider";
   ```

2. **Follow CSS custom properties**:

   ```css
   .my-component {
     background: var(--color-bg-surface);
     color: var(--color-text-primary);
   }
   ```

3. **Add TypeScript types**:

   ```tsx
   interface MyComponentProps {
     variant?: "primary" | "secondary";
     size?: "sm" | "md" | "lg";
     children: React.ReactNode;
   }
   ```

4. **Export from index**:
   ```tsx
   export { MyComponent } from "./MyComponent";
   ```

## Best Practices

### Theme Usage

- **Use `useMultiTheme`** for new components
- **Use `useTheme`** for backward compatibility
- **Leverage CSS custom properties** for styling
- **Test in all themes** including liquid glass

### Component Design

- **Semantic HTML** - Use appropriate HTML elements
- **Accessibility** - Include ARIA labels and keyboard navigation
- **Responsive** - Design for mobile and desktop
- **Consistent API** - Follow existing component patterns

### Performance

- **Lazy load heavy components** when possible
- **Use React.memo** for expensive components
- **Optimize re-renders** with proper dependencies
- **Minimize bundle size** with tree shaking

### Liquid Glass Best Practices

- **Use sparingly** - Glass effects are computationally expensive
- **Test performance** - Monitor frame rates
- **Provide fallbacks** - Ensure usability without blur support
- **Consider contrast** - Maintain readability with transparency

## Troubleshooting

### Common Issues

#### Theme Not Applying

- Ensure component is wrapped in `MultiThemeProvider`
- Check CSS custom properties are being used
- Verify theme name is correct

#### Liquid Glass Effects Not Visible

- Check browser supports backdrop-filter
- Ensure liquid glass CSS is imported
- Verify component is in liquid glass theme

#### Component Errors

- Check all required props are provided
- Verify component is properly exported
- Ensure theme hooks are used correctly

#### Font Color Issues

- Ensure text colors match theme (dark for light glass, light for dark glass)
- Check CSS custom properties are applied
- Verify theme classes are present on DOM

### Getting Help

1. **Check the console** for error messages
2. **Verify component exports** in index files
3. **Test with different themes**
4. **Check browser compatibility** for advanced features

### useMultiTheme Hook

```tsx
const {
  theme, // Current theme object
  setTheme, // Set theme programmatically
  toggleMode, // Toggle light/dark mode
  toggleDirection, // Toggle LTR/RTL
  isDark, // Is dark mode active
  isRTL, // Is RTL direction
  currentThemeType, // Current theme type string
  setThemeType, // Set theme by type
  availableThemes, // Array of available themes
  themeCategories, // Theme categories object
  cycleTheme, // Cycle to next theme
  cycleThemeCategory, // Cycle theme category
  isLiquidGlass, // Is liquid glass theme
  themeInfo, // Theme metadata
} = useMultiTheme();
```

### Theme Types

```tsx
type ThemeType = "light" | "dark" | "liquid-glass-light" | "liquid-glass-dark";

interface ThemeInfo {
  name: string;
  type: "original" | "liquid-glass";
  isDark: boolean;
  isLiquidGlass: boolean;
}
```

### Liquid Glass Theme Colors

#### Light Theme Colors

```css
--glass-text-primary: #1e293b; /* Dark text */
--glass-text-secondary: #475569; /* Medium text */
--glass-text-tertiary: #64748b; /* Muted text */
--glass-bg-primary: rgba(255, 255, 255, 0.85); /* Light glass */
```

#### Dark Theme Colors

```css
--glass-text-primary: #f8fafc; /* Light text */
--glass-text-secondary: #e2e8f0; /* Medium text */
--glass-text-tertiary: #cbd5e1; /* Muted text */
--glass-bg-primary: rgba(10, 10, 10, 0.85); /* Dark glass */
```

---

## Liquid Glass Theme Status

**Fully Implemented & Production Ready**

The liquid glass theme system is now completely functional with:

- **Perfect text contrast** in both light and dark variants
- **Beautiful glassmorphism effects** with blur and transparency
- **Comprehensive component support** with glass variants
- **Smooth theme switching** between all 4 themes
- **TypeScript compliance** and proper type safety
- **Performance optimization** and accessibility compliance

**This guide covers the essential aspects of using the PW Component Library with the complete liquid glass theme system. For more detailed information, refer to the source code and examples.**
