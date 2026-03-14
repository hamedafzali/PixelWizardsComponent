import React, { useMemo, useState } from "react";
import { clsx } from "clsx";
import { TabsProps } from "./Tabs.types";

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  value,
  defaultValue,
  onChange,
  className,
}) => {
  const firstEnabled = useMemo(
    () => tabs.find((tab) => !tab.disabled)?.id,
    [tabs],
  );
  const [internalValue, setInternalValue] = useState(
    defaultValue || firstEnabled || "",
  );
  const activeId = value ?? internalValue;
  const activeTab = tabs.find((tab) => tab.id === activeId) || tabs[0];

  const setActive = (id: string) => {
    if (value === undefined) {
      setInternalValue(id);
    }
    onChange?.(id);
  };

  return (
    <div className={clsx("pw-tabs", className)}>
      <div className="pw-tabs__list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeId}
            className={clsx("pw-tabs__tab", {
              "pw-tabs__tab--active": tab.id === activeId,
              "pw-tabs__tab--disabled": tab.disabled,
            })}
            disabled={tab.disabled}
            onClick={() => {
              if (!tab.disabled) setActive(tab.id);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pw-tabs__panel" role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  );
};
