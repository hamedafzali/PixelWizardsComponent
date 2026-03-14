import React from "react";
import { clsx } from "clsx";
import { BreadcrumbsProps } from "./Breadcrumbs.types";

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = "/",
  className,
}) => {
  return (
    <nav className={clsx("pw-breadcrumbs", className)} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="pw-breadcrumbs__item">
            {item.href ? (
              <a href={item.href} className="pw-breadcrumbs__link">
                {item.label}
              </a>
            ) : item.onClick ? (
              <button
                type="button"
                className="pw-breadcrumbs__link"
                onClick={item.onClick}
              >
                {item.label}
              </button>
            ) : (
              <span className="pw-breadcrumbs__current">{item.label}</span>
            )}
            {!isLast && <span className="pw-breadcrumbs__separator">{separator}</span>}
          </span>
        );
      })}
    </nav>
  );
};
