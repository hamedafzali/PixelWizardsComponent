# PixelWizards Component Library

[![npm version](https://img.shields.io/npm/v/pixelwizards-components.svg)](https://www.npmjs.com/package/pixelwizards-components)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

PixelWizards is a modern React + TypeScript UI library with multi-theme support, form controls, feedback components, data tables, auth UI, and stock-style charts.

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

- `Button`
- `Input`
- `Card`
- `ThemeToggle`
- `MultiThemeToggle`
- `Badge`
- `Progress`
- `Modal`
- `Tooltip`
- `Checkbox`
- `Avatar`
- `Alert`
- `Toast`
- `Login`
- `Select`
- `Table`
- `LineChart`
- `BarChart`
- `DonutChart`
- `CandlestickChart`
- `RSIChart`
- `KpiChartCard`
- `StockMarketBoard`
- `Sparkline`

## Component Usage

### Form and Input

```tsx
import { Input, Select, Checkbox } from "pixelwizards-components";

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "de", label: "Germany" },
];

function FormExample() {
  return (
    <>
      <Input label="Email" placeholder="name@domain.com" />
      <Select
        label="Country"
        options={countryOptions}
        value="us"
        onChange={(v) => console.log(v)}
      />
      <Select
        label="Markets"
        multiple
        options={countryOptions}
        value={["us"]}
        onChange={(v) => console.log(v)}
      />
      <Checkbox label="I agree to terms" checked onChange={() => {}} />
    </>
  );
}
```

### Surface and Navigation

```tsx
import { Card, Badge, Avatar, ThemeToggle, MultiThemeToggle } from "pixelwizards-components";

function SurfaceExample() {
  return (
    <Card variant="elevated" hover>
      <Avatar name="Hamed Afzali" />
      <Badge variant="success">Active</Badge>
      <ThemeToggle />
      <MultiThemeToggle />
    </Card>
  );
}
```

### Feedback and Overlay

```tsx
import { Alert, Toast, Tooltip, Modal, Button } from "pixelwizards-components";

function FeedbackExample() {
  return (
    <>
      <Alert status="warning" title="Margin Call" description="Add funds to keep positions open." />
      <Toast status="success" title="Order Filled" description="100 shares executed." open onClose={() => {}} />
      <Tooltip content="Current spread is 0.3%">
        <Button>Hover me</Button>
      </Tooltip>
      <Modal open onClose={() => {}} title="Confirm Trade">
        Confirm order execution.
      </Modal>
    </>
  );
}
```

### Data and Auth

```tsx
import { Table, Progress, Login } from "pixelwizards-components";

function DataExample() {
  return (
    <>
      <Progress value={68} label="Portfolio Rebalance" />
      <Table
        theme="glass"
        data={{
          columns: [{ column_name: "symbol" }, { column_name: "price" }],
          rows: [{ symbol: "AAPL", price: 196 }],
          pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
        }}
      />
      <Login title="Welcome Back" subtitle="Sign in to your dashboard" />
    </>
  );
}
```

### Charts

```tsx
import {
  LineChart,
  BarChart,
  DonutChart,
  CandlestickChart,
  RSIChart,
  KpiChartCard,
  StockMarketBoard,
  Sparkline,
} from "pixelwizards-components";

function ChartsExample() {
  const line = [{ x: "Mon", y: 42 }, { x: "Tue", y: 48 }, { x: "Wed", y: 45 }];
  const bars = [{ label: "Tech", value: 132 }, { label: "Energy", value: 87 }];
  const donut = [{ label: "Large Cap", value: 38 }, { label: "Mid Cap", value: 23 }];
  const candles = [
    { time: "D1", open: 102, high: 109, low: 99, close: 106, volume: 1400 },
    { time: "D2", open: 106, high: 112, low: 103, close: 110, volume: 1700 },
  ];

  return (
    <>
      <KpiChartCard title="Portfolio Value" value="$1,284,200" change="+8.2%" />
      <Sparkline values={[100, 102, 101, 105, 107]} />
      <LineChart data={line} movingAverages={[3]} supportLevel={40} resistanceLevel={50} />
      <BarChart data={bars} />
      <DonutChart data={donut} />
      <CandlestickChart data={candles} showVolume maPeriods={[2]} />
      <RSIChart values={[99, 101, 100, 104, 106, 105, 108, 109, 107, 110]} />
      <StockMarketBoard
        rows={[{ symbol: "AAPL", name: "Apple Inc.", price: 196, change: 1.6, volume: "High", sector: "Tech" }]}
        sortable
      />
    </>
  );
}
```

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
