import React from "react";
import { clsx } from "clsx";
import { EmptyStateProps } from "./EmptyState.types";

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  icon,
  description,
  action,
  className,
}) => {
  return (
    <div className={clsx("pw-empty-state", className)}>
      {icon && (
        <div className="pw-empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="pw-empty-state__title">{title}</div>
      {description && <div className="pw-empty-state__desc">{description}</div>}
      {action && <div className="pw-empty-state__action">{action}</div>}
    </div>
  );
};
