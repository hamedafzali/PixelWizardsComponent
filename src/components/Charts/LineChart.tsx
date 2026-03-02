import React from "react";
import { LineChartProps } from "./Charts.types";
import { movingAverage, range, scaledY } from "./chartUtils";

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 560,
  height = 240,
  className,
  smooth = true,
  showArea = false,
  lineColor = "var(--color-primary)",
  movingAverages = [],
  supportLevel,
  resistanceLevel,
}) => {
  if (data.length === 0) {
    return <div className={`pw-chart pw-chart--empty ${className || ""}`}>No data</div>;
  }

  const pad = 18;
  const values = data.map((point) => point.y);
  const { min, max } = range(values);
  const stepX = data.length > 1 ? (width - pad * 2) / (data.length - 1) : 0;

  const points = data.map((point, index) => {
    const x = pad + index * stepX;
    const y = scaledY(point.y, min, max, height, pad);
    return { x, y };
  });

  const linePath = points
    .map((point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      if (!smooth) return `L ${point.x} ${point.y}`;
      const prev = points[index - 1];
      const cx = (prev.x + point.x) / 2;
      return `C ${cx} ${prev.y}, ${cx} ${point.y}, ${point.x} ${point.y}`;
    })
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - pad} L ${points[0].x} ${height - pad} Z`;
  const maPaths = movingAverages.map((period, idx) => {
    const ma = movingAverage(values, period);
    const color = idx === 0 ? "#f59e0b" : idx === 1 ? "#8b5cf6" : "#06b6d4";
    const path = ma
      .map((value, index) => {
        if (value === null) return "";
        const x = pad + index * stepX;
        const y = scaledY(value, min, max, height, pad);
        return `${index === 0 || ma[index - 1] === null ? "M" : "L"} ${x} ${y}`;
      })
      .filter(Boolean)
      .join(" ");
    return { period, color, path };
  });

  const supportY =
    typeof supportLevel === "number"
      ? scaledY(supportLevel, min, max, height, pad)
      : null;
  const resistanceY =
    typeof resistanceLevel === "number"
      ? scaledY(resistanceLevel, min, max, height, pad)
      : null;

  return (
    <div className={`pw-chart ${className || ""}`}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Line chart">
        <rect x="0" y="0" width={width} height={height} fill="transparent" />
        {supportY !== null ? (
          <line
            x1={pad}
            y1={supportY}
            x2={width - pad}
            y2={supportY}
            stroke="#10b981"
            strokeDasharray="5 4"
            strokeWidth="1.4"
          />
        ) : null}
        {resistanceY !== null ? (
          <line
            x1={pad}
            y1={resistanceY}
            x2={width - pad}
            y2={resistanceY}
            stroke="#ef4444"
            strokeDasharray="5 4"
            strokeWidth="1.4"
          />
        ) : null}
        {showArea ? <path d={areaPath} fill="color-mix(in srgb, var(--color-primary) 18%, transparent)" /> : null}
        <path d={linePath} fill="none" stroke={lineColor} strokeWidth="2.5" />
        {maPaths.map((ma) =>
          ma.path ? (
            <path
              key={ma.period}
              d={ma.path}
              fill="none"
              stroke={ma.color}
              strokeWidth="1.7"
              strokeDasharray="4 3"
            />
          ) : null,
        )}
        {points.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r="3" fill={lineColor} />
        ))}
      </svg>
    </div>
  );
};
