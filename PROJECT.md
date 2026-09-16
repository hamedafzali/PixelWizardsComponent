# PixelWizards Component Library - Project Status

## Snapshot (September 14, 2026)

### Overall Status: **Release-ready with test/CI foundation in place**

- `npm run build`: **PASS**
- `npm run lint`: **PASS, no warnings**
- `npx vitest run`: **PASS** (35 tests across 8 suites)
- CI: GitHub Actions workflow (`.github/workflows/ci.yml`) runs lint, test, build on every push/PR to `main`

## Current Scope (Exported Surface)

Core UI:
- `Button`, `Input`, `Card`, `Badge`, `Progress`, `Checkbox`, `Avatar`, `Radio`, `RadioGroup`, `Switch`, `Textarea`, `Slider`
- `Form`, `FormField` (composition wrapper for label/error/helper wiring), `useForm` hook (form state, validation, submit lifecycle)

Navigation and layout:
- `Tabs`, `Accordion`, `Breadcrumbs`, `Pagination`, `ToggleGroup`, `Skeleton`, `EmptyState`

Feedback and overlays:
- `Alert`, `Toast`, `Tooltip`, `Modal`, `Popover`, `Drawer`, `DropdownMenu`

Auth and data:
- `Login`, `Table`, `Select`, `DatePicker`

Theming:
- `ThemeToggle`, `MultiThemeToggle`, `MultiThemeProvider`, `ThemeProvider`, `useMultiTheme`, `useTheme`
- `LiquidGlassCard`, `LiquidGlassButton` (liquid-glass variants, now exported from the package root)

Charts:
- `LineChart`, `BarChart`, `DonutChart`, `CandlestickChart`, `RSIChart`, `KpiChartCard`, `StockMarketBoard`, `Sparkline`, `TimeRangeSelector`
- `LineChart` supports hover crosshair + value tooltip (`interactive` prop, on by default)

## UX Goals (Components)

1. Consistent visual language across all components and themes, including liquid-glass variants.
2. Clear interaction states for every control (hover, active, focus, disabled, loading).
3. Accessibility by default: keyboard navigation, focus visibility, contrast compliance.
4. Readable density: balanced spacing, minimum widths, and legible typography in compact layouts.
5. Predictable feedback: toast/alert/tooltip timing and positioning should feel stable.
6. Chart readability at a glance: MA/RSI/support/resistance indicators are legible at smaller sizes.
7. Showcase usability: left-panel navigation and live theme switching make evaluation fast.
8. Error-proofing: selects, inputs, and multi-selects should not allow confusing states.
9. Smooth motion: animations feel deliberate and respect theme changes.

## Quality Gates

### Passing

- TypeScript build compiles successfully.
- ESLint has no errors or warnings.
- Vitest suite passes (Button, Input, Select, Modal, Tooltip, MultiThemeProvider, useForm, Form/FormField).
- Storybook builds cleanly with stories for every exported component, including a `Form` story wiring `useForm` + `Form` + `FormField` + `Input`/`Select`/`Checkbox` into a validated trade-order form, and a `LineWithTimeRange` chart story.
- CI runs lint + test + build on every push and PR.
- `Form`/`FormField` composition component and `useForm` hook are built, exported from the package root, and tested.
- `LineChart` hover crosshair interactivity and `TimeRangeSelector` are built, exported, and demonstrated together.

### Not yet passing / not yet built

- Test coverage is a baseline, not comprehensive — most components (Table, other Charts, Login, Accordion, DropdownMenu, etc.) still have no unit tests.
- No coverage reporting/thresholds configured.
- No visual regression testing (e.g. Chromatic) despite Storybook being the primary showcase.

## Remaining Technical Debt

1. Expand unit test coverage beyond the current baseline (Table, Select edge cases, Charts, Login, DropdownMenu, Accordion, Drawer).
2. Add coverage reporting and a minimum threshold gate in CI.
3. Consider visual regression testing for the chart family, where regressions are easy to miss in a diff.

## Next Execution Plan

### Phase 1 (Immediate)

1. Expand test coverage to Table, Accordion, DropdownMenu, Tabs, and the remaining Charts family.
2. Add coverage reporting (`vitest --coverage`) and wire a threshold into CI.

### Phase 2

1. Evaluate visual regression tooling (e.g. Chromatic) against the Storybook build.

---

**Last Updated:** September 14, 2026
**Current State:** Build/lint/test/CI all green; Storybook coverage complete for exported components; Form composition and chart interactivity shipped
**Recommended Focus:** deepen test coverage, then coverage reporting/thresholds and visual regression tooling
