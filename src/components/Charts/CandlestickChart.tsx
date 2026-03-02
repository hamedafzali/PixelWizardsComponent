import React from "react";
import { CandlestickChartProps } from "./Charts.types";
import { movingAverage, range, scaledY } from "./chartUtils";

export const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data,
  width = 620,
  height = 280,
  className,
  showVolume = true,
  supportLevel,
  resistanceLevel,
  maPeriods = [],
}) => {
  if (data.length === 0) {
    return <div className={`pw-chart pw-chart--empty ${className || ""}`}>No data</div>;
  }

  const pad = 16;
  const volumeHeight = showVolume ? 58 : 0;
  const priceHeight = height - pad * 2 - volumeHeight;
  const lows = data.map((item) => item.low);
  const highs = data.map((item) => item.high);
  const { min, max } = range([...lows, ...highs]);
  const step = (width - pad * 2) / data.length;
  const bodyWidth = Math.max(4, step * 0.55);
  const volMax = Math.max(1, ...data.map((item) => item.volume || 0));
  const closeValues = data.map((item) => item.close);
  const maLines = maPeriods.map((period, idx) => {
    const series = movingAverage(closeValues, period);
    const color = idx === 0 ? "#f59e0b" : idx === 1 ? "#8b5cf6" : "#06b6d4";
    const path = series
      .map((value, index) => {
        if (value === null) return "";
        const x = pad + index * step + step / 2;
        const y = scaledY(value, min, max, priceHeight + pad * 2, pad);
        return `${index === 0 || series[index - 1] === null ? "M" : "L"} ${x} ${y}`;
      })
      .filter(Boolean)
      .join(" ");
    return { period, color, path };
  });

  const supportY =
    typeof supportLevel === "number"
      ? scaledY(supportLevel, min, max, priceHeight + pad * 2, pad)
      : null;
  const resistanceY =
    typeof resistanceLevel === "number"
      ? scaledY(resistanceLevel, min, max, priceHeight + pad * 2, pad)
      : null;

  return (
    <div className={`pw-chart ${className || ""}`}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Candlestick chart">
        {supportY !== null ? (
          <line
            x1={pad}
            y1={supportY}
            x2={width - pad}
            y2={supportY}
            stroke="#10b981"
            strokeDasharray="5 4"
            strokeWidth="1.3"
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
            strokeWidth="1.3"
          />
        ) : null}
        {data.map((item, index) => {
          const x = pad + index * step + step / 2;
          const highY = scaledY(item.high, min, max, priceHeight + pad * 2, pad);
          const lowY = scaledY(item.low, min, max, priceHeight + pad * 2, pad);
          const openY = scaledY(item.open, min, max, priceHeight + pad * 2, pad);
          const closeY = scaledY(item.close, min, max, priceHeight + pad * 2, pad);
          const up = item.close >= item.open;
          const top = Math.min(openY, closeY);
          const h = Math.max(1.5, Math.abs(closeY - openY));
          const color = up ? "#10b981" : "#ef4444";
          const vol = item.volume || 0;
          const volH = (vol / volMax) * Math.max(1, volumeHeight - 10);
          const volY = height - pad - volH;

          return (
            <g key={`${item.time}-${index}`}>
              <line x1={x} y1={highY} x2={x} y2={lowY} stroke={color} strokeWidth="1.3" />
              <rect x={x - bodyWidth / 2} y={top} width={bodyWidth} height={h} fill={color} rx="2" />
              {showVolume ? (
                <rect x={x - bodyWidth / 2} y={volY} width={bodyWidth} height={volH} fill={`${color}99`} rx="1" />
              ) : null}
            </g>
          );
        })}
        {maLines.map((line) =>
          line.path ? (
            <path
              key={line.period}
              d={line.path}
              fill="none"
              stroke={line.color}
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          ) : null,
        )}
      </svg>
    </div>
  );
};
