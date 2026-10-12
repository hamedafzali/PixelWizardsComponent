import React from "react";
import { ToggleGroup } from "../ToggleGroup";
import { usePersistentState } from "../../hooks/usePersistentState";

export type ViewMode = "grid" | "list" | "table";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<ViewMode, React.ReactNode> = {
  grid: (
    <svg viewBox="0 0 24 24" width="16" height="16" {...stroke}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 24 24" width="16" height="16" {...stroke}>
      <rect x="3" y="4" width="18" height="6" rx="1" />
      <rect x="3" y="14" width="18" height="6" rx="1" />
    </svg>
  ),
  table: (
    <svg viewBox="0 0 24 24" width="16" height="16" {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18" />
    </svg>
  ),
};

const LABELS: Record<ViewMode, string> = {
  grid: "Cards",
  list: "List",
  table: "Table",
};

export interface ViewSwitcherProps<T extends ViewMode> {
  value: T;
  onChange: (mode: T) => void;
  /** Views offered, in display order. @default ["grid", "list", "table"] */
  options?: readonly T[];
  /** Override the default labels. */
  labels?: Partial<Record<T, string>>;
  className?: string;
}

/**
 * Segmented control for switching between card, list and table layouts.
 * Labels collapse to icons on small screens.
 */
export function ViewSwitcher<T extends ViewMode>({
  value,
  onChange,
  options = ["grid", "list", "table"] as unknown as readonly T[],
  labels,
  className,
}: ViewSwitcherProps<T>) {
  return (
    <ToggleGroup
      variant="segmented"
      size="sm"
      ariaLabel="View"
      collapseLabels
      className={className}
      value={value}
      onChange={(next) => onChange(next as T)}
      items={options.map((mode) => {
        const label = labels?.[mode] ?? LABELS[mode];
        return { id: mode, label, title: label, icon: ICONS[mode] };
      })}
    />
  );
}

/** View mode for one page, remembered in this browser. */
export function useViewMode<T extends ViewMode>(
  page: string,
  fallback: T,
  allowed: readonly T[],
) {
  return usePersistentState<T>(
    `pw.view.${page}`,
    fallback,
    (v): v is T => typeof v === "string" && (allowed as readonly string[]).includes(v),
  );
}
