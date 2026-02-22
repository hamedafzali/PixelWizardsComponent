import React, { useId, useRef, useState, useEffect } from "react";
import { TooltipProps } from "./Tooltip.types";
import { clsx } from "clsx";

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  className,
  placement = "top",
  showDelay = 100,
  hideDelay = 80,
  disabled = false,
  maxWidth = 280,
  offset = 10,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const timeoutRef = useRef<number | undefined>(undefined);

  const show = () => {
    if (disabled) return;
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setOpen(true), showDelay);
  };

  const hide = () => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setOpen(false), hideDelay);
  };

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  if (disabled) {
    return <span className={clsx("pw-tooltip-wrap", className)}>{children}</span>;
  }

  return (
    <span
      className={clsx("pw-tooltip-wrap", className)}
      onFocus={show}
      onBlur={hide}
      onMouseEnter={show}
      onMouseLeave={hide}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          window.clearTimeout(timeoutRef.current);
          setOpen(false);
        }
      }}
      aria-describedby={open ? tooltipId : undefined}
      {...props}
    >
      <span className="pw-tooltip-trigger">{children}</span>

      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className={clsx(
            "pw-tooltip",
            `pw-tooltip--${placement}`,
            "pw-tooltip--open",
          )}
          style={{
            ["--pw-tooltip-offset" as string]: `${offset}px`,
            ["--pw-tooltip-max-width" as string]:
              typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
          }}
        >
          {content}
          <span className="pw-tooltip__arrow" aria-hidden="true" />
        </span>
      )}
    </span>
  );
};
