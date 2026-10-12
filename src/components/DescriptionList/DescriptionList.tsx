import React from "react";
import { clsx } from "clsx";

export interface DescriptionItem {
  label: React.ReactNode;
  value?: React.ReactNode;
  /** Icon shown before the label. */
  icon?: React.ReactNode;
  /** Monospace value, e.g. for IDs, ports and paths. */
  mono?: boolean;
  /** Full value shown on hover when it is truncated. Defaults to string values. */
  title?: string;
  /** Skip the row, convenient for optional fields. */
  hidden?: boolean;
  /** Let the value wrap instead of truncating. */
  wrap?: boolean;
}

export interface DescriptionListProps {
  items: DescriptionItem[];
  /**
   * "inline": label left, value right on one line (compact cards).
   * "stacked": label above value, laid out in `columns` columns.
   * @default "inline"
   */
  layout?: "inline" | "stacked";
  columns?: 1 | 2 | 3;
  /** Text shown for empty values. @default "–" */
  placeholder?: React.ReactNode;
  className?: string;
}

/** Aligned label/value pairs, rendered as a semantic <dl>. */
export const DescriptionList: React.FC<DescriptionListProps> = ({
  items,
  layout = "inline",
  columns = 1,
  placeholder = "–",
  className,
}) => (
  <dl
    className={clsx(
      "pw-dl",
      `pw-dl--${layout}`,
      layout === "stacked" && `pw-dl--cols-${columns}`,
      className,
    )}
  >
    {items
      .filter((item) => !item.hidden)
      .map((item, i) => {
        const empty = item.value === undefined || item.value === null || item.value === "";
        return (
          <div className="pw-dl__row" key={i}>
            <dt className="pw-dl__label">
              {item.icon && (
                <span className="pw-dl__icon" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              {item.label}
            </dt>
            <dd
              className={clsx("pw-dl__value", {
                "pw-dl__value--mono": item.mono,
                "pw-dl__value--wrap": item.wrap,
                "pw-dl__value--empty": empty,
              })}
              title={item.title ?? (typeof item.value === "string" ? item.value : undefined)}
            >
              {empty ? placeholder : item.value}
            </dd>
          </div>
        );
      })}
  </dl>
);
