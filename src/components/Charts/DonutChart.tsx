import React from "react";
import { DonutChartProps } from "./Charts.types";
import { palette } from "./chartUtils";

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  width = 280,
  height = 280,
  className,
  innerRadius = 56,
}) => {
  if (data.length === 0) {
    return <div className={`pw-chart pw-chart--empty ${className || ""}`}>No data</div>;
  }

  const cx = width / 2;
  const cy = height / 2;
  const outerRadius = Math.min(width, height) / 2 - 10;
  const total = Math.max(1e-9, data.reduce((sum, item) => sum + item.value, 0));
  const startAngle = -Math.PI / 2;

  const arcPath = (start: number, end: number) => {
    const large = end - start > Math.PI ? 1 : 0;
    const sx = cx + outerRadius * Math.cos(start);
    const sy = cy + outerRadius * Math.sin(start);
    const ex = cx + outerRadius * Math.cos(end);
    const ey = cy + outerRadius * Math.sin(end);
    const isx = cx + innerRadius * Math.cos(end);
    const isy = cy + innerRadius * Math.sin(end);
    const iex = cx + innerRadius * Math.cos(start);
    const iey = cy + innerRadius * Math.sin(start);
    return [
      `M ${sx} ${sy}`,
      `A ${outerRadius} ${outerRadius} 0 ${large} 1 ${ex} ${ey}`,
      `L ${isx} ${isy}`,
      `A ${innerRadius} ${innerRadius} 0 ${large} 0 ${iex} ${iey}`,
      "Z",
    ].join(" ");
  };

  const slices = data.map((item, index) => {
    const current = data
      .slice(0, index)
      .reduce((sum, point) => sum + point.value, 0);
    const start = startAngle + (current / total) * Math.PI * 2;
    const end = start + (item.value / total) * Math.PI * 2;
    return { item, index, start, end };
  });

  return (
    <div className={`pw-chart ${className || ""}`}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Donut chart">
        {slices.map(({ item, index, start, end }) => {
          return (
            <path
              key={item.label}
              d={arcPath(start, end)}
              fill={item.color || palette[index % palette.length]}
            />
          );
        })}
      </svg>
    </div>
  );
};
