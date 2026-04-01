import React, { useEffect, useId, useRef, useState } from "react";
import { clsx } from "clsx";
import { PopoverProps } from "./Popover.types";

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div ref={rootRef} className={clsx("pw-popover", className)}>
      <button
        type="button"
        className="pw-popover__trigger"
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? panelId : undefined}
      >
        {trigger}
      </button>
      {open && (
        <div id={panelId} className="pw-popover__panel" role="dialog" aria-modal="false">
          {content}
        </div>
      )}
    </div>
  );
};
