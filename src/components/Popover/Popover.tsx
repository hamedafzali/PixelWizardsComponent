import React, { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { PopoverProps } from "./Popover.types";

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={rootRef} className={clsx("pw-popover", className)}>
      <button
        type="button"
        className="pw-popover__trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {trigger}
      </button>
      {open && <div className="pw-popover__panel">{content}</div>}
    </div>
  );
};
