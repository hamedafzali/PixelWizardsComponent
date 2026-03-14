# PixelWizards Component Library

[![npm version](https://img.shields.io/npm/v/pixelwizards-components.svg)](https://www.npmjs.com/package/pixelwizards-components)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

PixelWizards is a professional React + TypeScript component library built for modern dashboards. It ships with a full theming system, polished form controls, rich data display, and stock‑style charting.

## Features

- 4 built‑in themes: `light`, `dark`, `liquid-glass-light`, `liquid-glass-dark`
- Theme context + hooks (`MultiThemeProvider`, `useMultiTheme`)
- Consistent design tokens and shared UX behavior
- Ready‑to‑use charts for market dashboards
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

## Component Catalog

### Layout and Surface

- `Card`
- `EmptyState`
- `Skeleton`
- `Drawer`

### Navigation

- `Tabs`
- `Accordion`
- `Breadcrumbs`
- `Pagination`
- `DropdownMenu`
- `Popover`

### Forms and Inputs

- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `Radio`
- `Switch`
- `DatePicker`
- `Slider`
- `ToggleGroup`

### Data Display

- `Table`
- `Badge`
- `Progress`
- `Avatar`

### Feedback and Overlays

- `Alert`
- `Toast`
- `Tooltip`
- `Modal`

### Auth

- `Login`

### Charts

- `LineChart`
- `BarChart`
- `DonutChart`
- `CandlestickChart`
- `RSIChart`
- `Sparkline`
- `KpiChartCard`
- `StockMarketBoard`

### Theme Controls

- `ThemeToggle`
- `MultiThemeToggle`
- `MultiThemeProvider`
- `useMultiTheme`

## Examples

### Forms and Inputs

```tsx
import {
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Switch,
  DatePicker,
  Slider,
  ToggleGroup,
} from "pixelwizards-components";

const options = [
  { value: "us", label: "United States" },
  { value: "de", label: "Germany" },
];

function FormExample() {
  return (
    <>
      <Input label="Email" placeholder="name@domain.com" />
      <Textarea label="Trade Notes" placeholder="Add context..." />
      <Select label="Country" options={options} value="us" onChange={() => {}} />
      <Checkbox label="I agree" checked onChange={() => {}} />
      <Radio name="risk" label="Low risk" defaultChecked />
      <Switch label="Live pricing" defaultChecked />
      <DatePicker label="Trade date" />
      <Slider label="Risk tolerance" min={0} max={100} defaultValue={45} />
      <ToggleGroup
        items={[
          { id: "daily", label: "Daily" },
          { id: "weekly", label: "Weekly" },
        ]}
        value="daily"
        onChange={() => {}}
      />
    </>
  );
}
```

### Navigation

```tsx
import {
  Tabs,
  Accordion,
  Breadcrumbs,
  Pagination,
  DropdownMenu,
  Popover,
} from "pixelwizards-components";

function NavigationExample() {
  return (
    <>
      <Tabs
        tabs={[
          { id: "overview", label: "Overview", content: "Summary" },
          { id: "positions", label: "Positions", content: "Open positions" },
        ]}
        defaultValue="overview"
      />
      <Accordion
        items={[
          { id: "one", title: "Pre‑market", content: "Key catalysts" },
          { id: "two", title: "Risk", content: "Exposure by sector" },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Portfolio", href: "#" },
          { label: "Equities", href: "#" },
          { label: "Large Cap" },
        ]}
      />
      <Pagination page={2} totalPages={12} onPageChange={() => {}} />
      <DropdownMenu
        label="Actions"
        items={[{ label: "Buy" }, { label: "Sell" }]}
      />
      <Popover trigger="Details" content="Bid/ask depth" />
    </>
  );
}
```

### Feedback and Overlays

```tsx
import { Alert, Toast, Tooltip, Modal, Button, Drawer } from "pixelwizards-components";

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
      <Drawer open onClose={() => {}} title="Order Settings">
        Configure execution rules and risk limits.
      </Drawer>
    </>
  );
}
```

### Data Display

```tsx
import { Table, Badge, Progress, Avatar, Skeleton, EmptyState } from "pixelwizards-components";

function DataExample() {
  return (
    <>
      <Progress value={68} label="Portfolio Rebalance" />
      <Badge color="success">Active</Badge>
      <Avatar name="Alex Morgan" />
      <Skeleton width="60%" height="1rem" />
      <EmptyState
        title="No positions yet"
        description="Add a symbol to start tracking."
      />
      <Table
        theme="glass"
        data={{
          columns: [{ column_name: "symbol" }, { column_name: "price" }],
          rows: [{ symbol: "AAPL", price: 196 }],
          pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
        }}
      />
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
      <RSIChart values={[120, 114, 126, 110, 132, 108, 138, 112]} period={7} />
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

## Development

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
```

## Build and Publish

```bash
npm version minor
npm publish
```

## Repository

- GitHub: [PixelWizardsComponent](https://github.com/hamedafzali/PixelWizardsComponent)
- npm: [pixelwizards-components](https://www.npmjs.com/package/pixelwizards-components)

## License

MIT - see [LICENSE](LICENSE).
