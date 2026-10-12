import React from "react";
import { clsx } from "clsx";

export interface PageHeaderProps {
  title: React.ReactNode;
  /** Short line under the title, e.g. counts or a description. */
  subtitle?: React.ReactNode;
  /** Breadcrumbs or an eyebrow label shown above the title. */
  eyebrow?: React.ReactNode;
  /** Primary and secondary actions, right-aligned on wide screens. */
  actions?: React.ReactNode;
  className?: string;
}

/** Page title row: stacks on phones, title and actions side by side above 640px. */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  eyebrow,
  actions,
  className,
}) => (
  <header className={clsx("pw-page-header", className)}>
    <div className="pw-page-header__text">
      {eyebrow && <div className="pw-page-header__eyebrow">{eyebrow}</div>}
      <h1 className="pw-page-header__title">{title}</h1>
      {subtitle && <p className="pw-page-header__subtitle">{subtitle}</p>}
    </div>
    {actions && <div className="pw-page-header__actions">{actions}</div>}
  </header>
);
