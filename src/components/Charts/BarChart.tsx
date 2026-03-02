import React from "react";
import { BarChartProps } from "./Charts.types";
import { palette, range } from "./chartUtils";

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 560,
  height = 240,
  className,
}) => {
  if (data.length === 0) {
    return <div className={`pw-chart pw-chart--empty ${className || ""}`}>No data</div>;
  }

  const pad = 18;
  const { max } = range(data.map((item) => item.value));
  const innerWidth = width - pad * 2;
  const innerHeight = height - pad * 2;
  const gap = 10;
  const barWidth = Math.max(8, (innerWidth - gap * (data.length - 1)) / data.length);

  return (
    <div className={`pw-chart ${className || ""}`}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Bar chart">
        {data.map((item, index) => {
          const h = (item.value / Math.max(1e-9, max)) * innerHeight;
          const x = pad + index * (barWidth + gap);
          const y = height - pad - h;
          return (
            <g key={item.label}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={h}
                rx="6"
                fill={item.color || palette[index % palette.length]}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
