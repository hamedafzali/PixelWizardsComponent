import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { CardFooterProps, CardHeaderProps, CardProps } from "./Card.types";

/**
 * Surface container. Styling comes from CSS variables, so it works with or
 * without a theme provider.
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      rounded = true,
      hover = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const classes = clsx(
      "pw-card",
      `pw-card--${variant}`,
      `pw-card--padding-${padding}`,
      {
        "pw-card--rounded": rounded,
        "pw-card--hover": hover,
      },
      className,
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

/**
 * Card header: optional leading visual, a title and subtitle that truncate,
 * and trailing actions that never wrap under the title.
 */
const CardHeader: React.FC<CardHeaderProps> = ({
  leading,
  title,
  subtitle,
  meta,
  actions,
  as: Heading = "h3",
  className,
}) => (
  <div className={clsx("pw-card-header", className)}>
    {leading && <div className="pw-card-header__leading">{leading}</div>}
    <div className="pw-card-header__text">
      <Heading className="pw-card-header__title">{title}</Heading>
      {subtitle && <div className="pw-card-header__subtitle">{subtitle}</div>}
      {meta && <div className="pw-card-header__meta">{meta}</div>}
    </div>
    {actions && <div className="pw-card-header__actions">{actions}</div>}
  </div>
);

/** Card body that grows, so footers line up across a grid of cards. */
const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={clsx("pw-card-body", className)} {...props} />;

/** Card footer pinned to the bottom edge of the card. */
const CardFooter: React.FC<CardFooterProps> = ({
  className,
  justify = "between",
  ...props
}) => (
  <div
    className={clsx("pw-card-footer", `pw-card-footer--${justify}`, className)}
    {...props}
  />
);

export { Card, CardHeader, CardBody, CardFooter };
