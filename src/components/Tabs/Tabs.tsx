import React, { useId, useMemo, useState } from "react";
import { clsx } from "clsx";
import { TabsProps } from "./Tabs.types";

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  value,
  defaultValue,
  onChange,
  className,
}) => {
  const tabsId = useId();
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

  const enabledTabs = tabs.filter((tab) => !tab.disabled);
  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, id: string) => {
    const currentIndex = enabledTabs.findIndex((tab) => tab.id === id);
    if (currentIndex === -1) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = enabledTabs[(currentIndex + 1) % enabledTabs.length];
      setActive(next.id);
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = enabledTabs[(currentIndex - 1 + enabledTabs.length) % enabledTabs.length];
      setActive(next.id);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setActive(enabledTabs[0].id);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setActive(enabledTabs[enabledTabs.length - 1].id);
    }
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
            aria-controls={`${tabsId}-panel-${tab.id}`}
            id={`${tabsId}-tab-${tab.id}`}
            className={clsx("pw-tabs__tab", {
              "pw-tabs__tab--active": tab.id === activeId,
              "pw-tabs__tab--disabled": tab.disabled,
            })}
            disabled={tab.disabled}
            tabIndex={tab.id === activeId ? 0 : -1}
            onClick={() => {
              if (!tab.disabled) setActive(tab.id);
            }}
            onKeyDown={(event) => onKeyDown(event, tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className="pw-tabs__panel"
        role="tabpanel"
        id={`${tabsId}-panel-${activeTab?.id || "panel"}`}
        aria-labelledby={activeTab ? `${tabsId}-tab-${activeTab.id}` : undefined}
      >
        {activeTab?.content}
      </div>
    </div>
  );
};
