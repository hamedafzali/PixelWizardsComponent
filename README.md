# PixelWizards Component Library

[![npm version](https://img.shields.io/npm/v/pixelwizards-components.svg)](https://www.npmjs.com/package/pixelwizards-components)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

PixelWizards is a React + TypeScript component library with a built-in multi-theme system, including enhanced liquid glass themes and polished interactive components.

## Features

- 4 built-in themes: `light`, `dark`, `liquid-glass-light`, `liquid-glass-dark`
- Theme context + hooks (`MultiThemeProvider`, `useMultiTheme`)
- Core UI components with shared design tokens and consistent styling
- Enhanced showcase/dev environment with section navigation and live theme switching
- TypeScript definitions included

## Installation

```bash
npm install pixelwizards-components
```

Peer dependencies:

- `react >=18 <20`
- `react-dom >=18 <20`

## Quick Start

```tsx
import React from "react";
import {
  MultiThemeProvider,
  MultiThemeToggle,
  Card,
  Button,
  Input,
} from "pixelwizards-components";

export default function App() {
  return (
    <MultiThemeProvider defaultTheme="liquid-glass-light">
      <div style={{ padding: 24 }}>
        <MultiThemeToggle />
        <Card variant="glass" style={{ marginTop: 16, padding: 16 }}>
          <h2>PixelWizards</h2>
          <Input placeholder="Your name" />
          <Button variant="primary" style={{ marginTop: 12 }}>
            Continue
          </Button>
        </Card>
      </div>
    </MultiThemeProvider>
  );
}
```

## Exported Components

- `Alert`
- `Avatar`
- `Badge`
- `Button`
- `Card`
- `Checkbox`
- `Input`
- `Login`
- `Modal`
- `Progress`
- `Select` (single and multi select)
- `Table` (multiple visual themes)
- `ThemeToggle`
- `MultiThemeToggle`
- `Toast`
- `Tooltip`
- `LiquidGlassCard`
- `LiquidGlassButton`

## Theme System

Use `MultiThemeProvider` at app root:

```tsx
import { MultiThemeProvider } from "pixelwizards-components";

<MultiThemeProvider defaultTheme="dark">
  <App />
</MultiThemeProvider>;
```

Use `useMultiTheme` for runtime controls:

```tsx
import { useMultiTheme } from "pixelwizards-components";

function ThemeControls() {
  const { themeInfo, cycleTheme, setThemeType } = useMultiTheme();

  return (
    <div>
      <p>Current theme: {themeInfo.name}</p>
      <button onClick={cycleTheme}>Next theme</button>
      <button onClick={() => setThemeType("liquid-glass-dark")}>
        Liquid Dark
      </button>
    </div>
  );
}
```

## Styling and Tokens

Core styles are token-driven. Reuse variables for custom components:

```css
.my-surface {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}
```

Liquid glass themes include additional variables used by shipped components:

- `--glass-bg-light-primary`
- `--glass-bg-dark-primary`
- `--glass-border-light`
- `--glass-border-dark`
- `--glass-blur-medium`

## Development

```bash
# install deps
npm install

# run showcase/dev app
npm run dev

# lint
npm run lint

# test
npm test

# build
npm run build
```

## Build and Publish

```bash
# version bump example
npm version patch

# package checks and type build run automatically via prepublishOnly
npm publish
```

## Repository

- GitHub: [PixelWizardsComponent](https://github.com/hamedafzali/PixelWizardsComponent)
- npm: [pixelwizards-components](https://www.npmjs.com/package/pixelwizards-components)

## License

MIT - see [LICENSE](LICENSE).
