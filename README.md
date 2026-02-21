# PixelWizards Component Library

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

A modern, glassmorphism-inspired React component library with a powerful multi-theme system featuring iOS 26-style liquid glass effects.

![PixelWizards Preview](https://via.placeholder.com/800x400/ffffff/000000?text=PixelWizards+Component+Library+Preview)

## ✨ Features

- 🎨 **Multi-Theme System** - Light, Dark, and Liquid Glass themes
- 🥂 **Liquid Glass Effects** - iOS 26-inspired glassmorphism with blur and transparency
- 🔧 **TypeScript Support** - Full type safety and IntelliSense
- 📱 **Responsive Design** - Mobile-first approach
- ♿ **Accessibility** - WCAG compliant components
- 🎯 **Tree Shakable** - Optimized bundle sizes
- 🚀 **Production Ready** - Performance optimized and tested

## 🚀 Quick Start

### Installation

```bash
npm install @pw/components
```

### Basic Usage

```tsx
import React from "react";
import { MultiThemeProvider, Button, Card, Input } from "@pw/components";

function App() {
  return (
    <MultiThemeProvider defaultTheme="liquid-glass-light">
      <div className="app">
        <Card variant="glass">
          <h1>Welcome to PixelWizards</h1>
          <Input placeholder="Enter your name" />
          <Button variant="primary">Get Started</Button>
        </Card>
      </div>
    </MultiThemeProvider>
  );
}

export default App;
```

## 🎨 Available Themes

- **Light Theme** (`light`) - Clean, modern light theme
- **Dark Theme** (`dark`) - Elegant dark theme with perfect contrast
- **Liquid Glass Light** (`liquid-glass-light`) - iOS 26-inspired glassmorphism
- **Liquid Glass Dark** (`liquid-glass-dark`) - Dark glassmorphism with blur effects

### Theme Provider

```tsx
import { MultiThemeProvider } from "@pw/components";

<MultiThemeProvider defaultTheme="liquid-glass-light">
  <YourApp />
</MultiThemeProvider>
```

### Theme Toggle

```tsx
import { MultiThemeToggle } from "@pw/components";

<MultiThemeToggle size="md" />
```

## 🧩 Components

### Core Components

#### Button
```tsx
<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

#### Card
```tsx
<Card variant="glass">
  <h3>Glass Card</h3>
  <p>Beautiful glassmorphism effect</p>
</Card>
```

#### Input
```tsx
<Input
  placeholder="Enter text"
  error={hasError}
  helperText="This field is required"
/>
```

#### Modal
```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h2>Modal Title</h2>
  <p>Modal content</p>
</Modal>
```

### Specialized Components

#### Liquid Glass Components
```tsx
import { LiquidGlassCard, LiquidGlassButton } from "@pw/components";

<LiquidGlassCard blur="medium" alpha={0.75}>
  <h3>Premium Glass</h3>
  <p>Advanced glass effects</p>
</LiquidGlassCard>

<LiquidGlassButton variant="primary">
  Glass Button
</LiquidGlassButton>
```

#### Other Components
- Alert, Avatar, Badge, Checkbox, Progress, Tooltip, Login

## 🖥️ Programmatic Control

```tsx
import { useMultiTheme } from "@pw/components";

function ThemeControls() {
  const {
    setThemeType,
    cycleTheme,
    cycleThemeCategory,
    currentThemeType,
    isLiquidGlass,
    themeInfo,
  } = useMultiTheme();

  return (
    <div>
      <p>Current: {themeInfo.name}</p>
      <button onClick={cycleTheme}>Next Theme</button>
      <button onClick={cycleThemeCategory}>Toggle Style</button>
    </div>
  );
}
```

## 🎨 Liquid Glass Effects

The Liquid Glass theme provides stunning iOS 26-inspired effects:

- **Backdrop Blur**: Adjustable blur intensities (8px to 32px)
- **Transparency**: Multiple alpha levels (0.65 to 0.95)
- **Edge Lighting**: Subtle glow effects
- **Reflections**: Light reflection effects
- **Perfect Contrast**: WCAG compliant text readability

### CSS Custom Properties

```css
.my-component {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

/* Glass effects */
.glass-element {
  background: var(--glass-bg-light-primary);
  backdrop-filter: var(--glass-blur-medium);
  border: 1px solid var(--glass-border-light);
}
```

## 📦 API Reference

### useMultiTheme Hook

```tsx
const {
  theme,           // Current theme object
  setTheme,        // Set theme programmatically
  toggleMode,      // Toggle light/dark mode
  toggleDirection, // Toggle LTR/RTL
  isDark,          // Is dark mode active
  isRTL,           // Is RTL direction
  currentThemeType,// Current theme type string
  setThemeType,    // Set theme by type
  availableThemes, // Array of available themes
  themeCategories, // Theme categories object
  cycleTheme,      // Cycle to next theme
  cycleThemeCategory, // Cycle theme category
  isLiquidGlass,   // Is liquid glass theme
  themeInfo,       // Theme metadata
} = useMultiTheme();
```

## 🔧 Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/hamedafzali/PixelWizardsComponent.git
cd PixelWizardsComponent

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
src/
├── components/          # React components
│   ├── Button/
│   ├── Card/
│   ├── LiquidGlass/     # Liquid glass components
│   └── MultiThemeToggle/
├── themes/              # Theme system
│   ├── multiThemeSystem.ts
│   ├── MultiThemeProvider.tsx
│   └── types.ts
├── styles/              # CSS files
│   ├── global.css
│   ├── components.css
│   └── liquidGlass.css
├── tokens/              # Design tokens
└── examples/            # Demo components
```

## 🎯 Best Practices

### Theme Usage
- Use `useMultiTheme` for new components
- Leverage CSS custom properties for styling
- Test in all themes including liquid glass

### Component Design
- Use semantic HTML elements
- Include ARIA labels and keyboard navigation
- Design for mobile and desktop
- Follow existing component patterns

### Performance
- Use `React.memo` for expensive components
- Optimize re-renders with proper dependencies
- Minimize bundle size with tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by iOS 26 glassmorphism effects
- Built with modern React and TypeScript
- Designed for performance and accessibility

---

**Built with ❤️ by [Hamed Afzali](https://github.com/hamedafzali)**

[⭐ Star this repo](https://github.com/hamedafzali/PixelWizardsComponent) if you find it useful!
