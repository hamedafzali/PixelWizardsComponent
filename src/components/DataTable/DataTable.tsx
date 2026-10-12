import React from "react";
import { clsx } from "clsx";

export interface DataTableColumn<T> {
  /** Unique key for the column. */
  key: string;
  header: React.ReactNode;
  /** Cell renderer. Defaults to `String(row[key])`. */
  render?: (row: T) => React.ReactNode;
  align?: "left" | "right" | "center";
  /** CSS width, e.g. "1%" for a column that hugs its content. */
  width?: string;
  /** Hide the column below this breakpoint to keep tables readable on phones. */
  hideBelow?: "sm" | "md" | "lg" | "xl";
  /** Keep the cell on one line. */
  nowrap?: boolean;
}

export interface DataTableGroup<T> {
  key: string;
  label: React.ReactNode;
  rows: T[];
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  /** Rows to show. Ignored when `groups` is set. */
  rows?: T[];
  /** Rows split into labelled sections. */
  groups?: DataTableGroup<T>[];
  rowKey: (row: T) => string;
  /** Accessible table caption (visually hidden). */
  caption?: string;
  /** Shown in place of the body when there are no rows. */
  empty?: React.ReactNode;
  /** Extra class per row, e.g. to dim rows that are busy. */
  rowClassName?: (row: T) => string | undefined;
  density?: "comfortable" | "compact";
  /** Keep the header visible while the page scrolls. */
  stickyHeader?: boolean;
  className?: string;
}

/**
 * Generic table for any row type with responsive column hiding, optional
 * row groups and a horizontal scroll fallback on narrow screens.
 */
export function DataTable<T>({
  columns,
  rows = [],
  groups,
  rowKey,
  caption,
  empty,
  rowClassName,
  density = "comfortable",
  stickyHeader = false,
  className,
}: DataTableProps<T>) {
  const cellClass = (col: DataTableColumn<T>) =>
    clsx(
      col.align && `pw-table__cell--${col.align}`,
      col.hideBelow && `pw-table__cell--hide-${col.hideBelow}`,
      col.nowrap && "pw-table__cell--nowrap",
    );

  const renderRow = (row: T) => (
    <tr key={rowKey(row)} className={rowClassName?.(row)}>
      {columns.map((col) => (
        <td key={col.key} className={cellClass(col)}>
          {col.render
            ? col.render(row)
            : String((row as Record<string, unknown>)[col.key] ?? "")}
        </td>
      ))}
    </tr>
  );

  const total = groups ? groups.reduce((n, g) => n + g.rows.length, 0) : rows.length;

  return (
    <div
      className={clsx(
        "pw-table",
        `pw-table--${density}`,
        { "pw-table--sticky": stickyHeader },
        className,
      )}
    >
      <div className="pw-table__scroll">
        <table>
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cellClass(col)}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          {total === 0 ? (
            <tbody>
              <tr>
                <td colSpan={columns.length} className="pw-table__empty">
                  {empty ?? "No data"}
                </td>
              </tr>
            </tbody>
          ) : groups ? (
            groups.map((group) => (
              <tbody key={group.key}>
                <tr className="pw-table__group">
                  <th scope="colgroup" colSpan={columns.length}>
                    {group.label}
                  </th>
                </tr>
                {group.rows.map(renderRow)}
              </tbody>
            ))
          ) : (
            <tbody>{rows.map(renderRow)}</tbody>
          )}
        </table>
      </div>
    </div>
  );
}
