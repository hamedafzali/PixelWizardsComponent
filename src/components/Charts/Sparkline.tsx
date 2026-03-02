import React from "react";
import { SparklineProps } from "./Charts.types";
import { range, scaledY } from "./chartUtils";

export const Sparkline: React.FC<SparklineProps> = ({
  values,
  width = 120,
  height = 36,
  className,
  color = "var(--color-primary)",
}) => {
  if (values.length < 2) {
    return <div className={`pw-sparkline ${className || ""}`}>-</div>;
  }

  const pad = 3;
  const { min, max } = range(values);
  const stepX = (width - pad * 2) / (values.length - 1);
  const path = values
    .map((value, index) => {
      const x = pad + index * stepX;
      const y = scaledY(value, min, max, height, pad);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className={`pw-sparkline ${className || ""}`}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Sparkline">
        <path d={path} fill="none" stroke={color} strokeWidth="2" />
      </svg>
    </div>
  );
};
