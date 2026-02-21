import React, {
  useRef,
  useState,
  useEffect,
  cloneElement,
  isValidElement,
} from "react";
import { TooltipProps } from "./Tooltip.types";
import { clsx } from "clsx";

// Simple utility for unique ids
let tooltipIdSeq = 0;
const getUniqueId = () => `pw-tooltip-${++tooltipIdSeq}`;

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  className,
  placement = "top",
  showDelay = 100,
  hideDelay = 80,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [tooltipId] = useState(getUniqueId());
  const timeoutRef = useRef<number | undefined>(undefined);

  // Show/hide with delay
  const show = () => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setOpen(true), showDelay);
  };
  const hide = () => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setOpen(false), hideDelay);
  };
  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  // Clone the child to add handlers/ARIA
  const child = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, {
        "aria-describedby": open ? tooltipId : undefined,
        onFocus: (e: any) => {
          show();
          (children as any).props?.onFocus?.(e);
        },
        onBlur: (e: any) => {
          hide();
          (children as any).props?.onBlur?.(e);
        },
        onMouseEnter: (e: any) => {
          show();
          (children as any).props?.onMouseEnter?.(e);
        },
        onMouseLeave: (e: any) => {
          hide();
          (children as any).props?.onMouseLeave?.(e);
        },
        tabIndex: (children as any).props?.tabIndex ?? 0,
      })
    : children;

  // Placement styles
  const getPlacement = () => {
    switch (placement) {
      case "right":
        return {
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginLeft: 8,
        };
      case "bottom":
        return {
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: 8,
        };
      case "left":
        return {
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginRight: 8,
        };
      case "top":
      default:
        return {
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: 8,
        };
    }
  };

  return (
    <span
      className={clsx("pw-tooltip-wrap", className)}
      style={{ position: "relative", display: "inline-block" }}
      {...props}
    >
      {child}
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className="pw-tooltip"
          style={{
            position: "absolute",
            zIndex: 1001,
            padding: "6px 12px",
            background: "var(--tooltip-bg, #222)",
            color: "var(--tooltip-color, #fff)",
            fontSize: 14,
            borderRadius: 4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            ...getPlacement(),
          }}
        >
          {content}
        </span>
      )}
    </span>
  );
};
