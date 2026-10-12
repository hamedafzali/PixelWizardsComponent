import React from "react";
import { clsx } from "clsx";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Draw the list inside a bordered surface. @default true */
  bordered?: boolean;
}

/** Vertical list of rows, the compact alternative to a card grid. */
export const List: React.FC<ListProps> = ({ bordered = true, className, ...props }) => (
  // role="list" keeps list semantics when list-style is removed (Safari).
  <ul role="list" className={clsx("pw-list", { "pw-list--bordered": bordered }, className)} {...props} />
);

export interface ListItemProps {
  /** Icon, avatar or status dot. */
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Badges and secondary details; hidden below 768px. */
  meta?: React.ReactNode;
  /** Buttons or a menu at the end of the row. */
  actions?: React.ReactNode;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  leading,
  title,
  subtitle,
  meta,
  actions,
  className,
}) => (
  <li className={clsx("pw-list__item", className)}>
    {leading && <div className="pw-list__leading">{leading}</div>}
    <div className="pw-list__text">
      <div className="pw-list__title">{title}</div>
      {subtitle && <div className="pw-list__subtitle">{subtitle}</div>}
    </div>
    {meta && <div className="pw-list__meta">{meta}</div>}
    {actions && <div className="pw-list__actions">{actions}</div>}
  </li>
);
