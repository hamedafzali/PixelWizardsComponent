import React, { useState } from "react";
import { clsx } from "clsx";
import { AccordionProps } from "./Accordion.types";

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div className={clsx("pw-accordion", className)}>
      {items.map((item) => {
        const open = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={clsx("pw-accordion__item", {
              "pw-accordion__item--open": open,
              "pw-accordion__item--disabled": item.disabled,
            })}
          >
            <button
              type="button"
              className="pw-accordion__trigger"
              onClick={() => {
                if (!item.disabled) toggle(item.id);
              }}
              disabled={item.disabled}
            >
              <span>{item.title}</span>
              <span className="pw-accordion__icon">{open ? "−" : "+"}</span>
            </button>
            {open && <div className="pw-accordion__content">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
};
