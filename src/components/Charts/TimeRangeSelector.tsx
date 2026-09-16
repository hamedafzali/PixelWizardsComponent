import React from "react";
import { ToggleGroup } from "../ToggleGroup";

export type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";

export interface TimeRangeSelectorProps {
  value?: TimeRange;
  defaultValue?: TimeRange;
  onChange?: (range: TimeRange) => void;
  ranges?: TimeRange[];
  className?: string;
}

const DEFAULT_RANGES: TimeRange[] = ["1D", "1W", "1M", "3M", "1Y", "ALL"];

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  value,
  defaultValue = "1M",
  onChange,
  ranges = DEFAULT_RANGES,
  className,
}) => {
  const items = ranges.map((range) => ({ id: range, label: range }));

  return (
    <ToggleGroup
      className={className}
      items={items}
      value={value}
      defaultValue={defaultValue}
      onChange={(next) => onChange?.(next as TimeRange)}
    />
  );
};
