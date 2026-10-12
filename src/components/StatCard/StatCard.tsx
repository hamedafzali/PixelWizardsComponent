import React from "react";
import { clsx } from "clsx";

export interface StatCardProps {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Secondary line under the value, e.g. "3 stopped". */
  hint?: React.ReactNode;
  icon?: React.ReactNode;
  /** Colour of the icon tile. @default "primary" */
  tone?: "primary" | "neutral" | "success" | "warning" | "error" | "info";
  /** Makes the card a toggle button, e.g. to filter a list below it. */
  onClick?: () => void;
  /** Pressed state when the card is used as a filter. */
  active?: boolean;
  className?: string;
}

/**
 * Key number with a label. Pass `onClick` to make it a filter toggle; it then
 * renders as a button with aria-pressed.
 */
export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  hint,
  icon,
  tone = "primary",
  onClick,
  active = false,
  className,
}) => {
  const classes = clsx(
    "pw-stat-card",
    {
      "pw-stat-card--interactive": Boolean(onClick),
      "pw-stat-card--active": active,
    },
    className,
  );
  const content = (
    <>
      <div className="pw-stat-card__text">
        <div className="pw-stat-card__label">{label}</div>
        <div className="pw-stat-card__value">{value}</div>
        {hint && <div className="pw-stat-card__hint">{hint}</div>}
      </div>
      {icon && (
        <div className={clsx("pw-stat-card__icon", `pw-stat-card__icon--${tone}`)} aria-hidden="true">
          {icon}
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick} aria-pressed={active}>
        {content}
      </button>
    );
  }
  return <div className={classes}>{content}</div>;
};
