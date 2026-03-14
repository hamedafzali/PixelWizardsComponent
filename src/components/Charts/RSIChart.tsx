import React from "react";
import { RSIChartProps } from "./Charts.types";
import { calculateRSI, scaledY } from "./chartUtils";

export const RSIChart: React.FC<RSIChartProps> = ({
  values,
  width = 620,
  height = 180,
  className,
  period = 14,
  overbought = 70,
  oversold = 30,
}) => {
  if (values.length < 3) {
    return <div className={`pw-chart pw-chart--empty ${className || ""}`}>No data</div>;
  }

  const pad = 14;
  const rsiValues = calculateRSI(values, period);
  const firstValid = rsiValues.find((value) => value !== null);
  const filledRsi = firstValid
    ? rsiValues.map((value) => (value === null ? firstValid : value))
    : rsiValues;
  const stepX = (width - pad * 2) / Math.max(1, values.length - 1);

  const path = filledRsi
    .map((value, index) => {
      if (value === null) return "";
      const x = pad + index * stepX;
      const y = scaledY(value, 0, 100, height, pad);
      return `${index === 0 || filledRsi[index - 1] === null ? "M" : "L"} ${x} ${y}`;
    })
    .filter(Boolean)
    .join(" ");

  const overY = scaledY(overbought, 0, 100, height, pad);
  const underY = scaledY(oversold, 0, 100, height, pad);
  const midY = scaledY(50, 0, 100, height, pad);
  const lastRsi = [...rsiValues].reverse().find((value) => value !== null) as number | undefined;
  const lastIdx = [...rsiValues]
    .map((value, index) => ({ value, index }))
    .reverse()
    .find((item) => item.value !== null)?.index;
  const lastX = typeof lastIdx === "number" ? pad + lastIdx * stepX : null;
  const lastY = typeof lastRsi === "number" ? scaledY(lastRsi, 0, 100, height, pad) : null;

  return (
    <div className={`pw-chart ${className || ""}`}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="RSI chart">
        <rect
          x={pad}
          y={overY}
          width={width - pad * 2}
          height={underY - overY}
          fill="color-mix(in srgb, var(--color-primary) 8%, transparent)"
        />
        <line x1={pad} y1={overY} x2={width - pad} y2={overY} stroke="#ef4444" strokeDasharray="5 4" />
        <line x1={pad} y1={midY} x2={width - pad} y2={midY} stroke="var(--color-border)" strokeDasharray="3 4" />
        <line x1={pad} y1={underY} x2={width - pad} y2={underY} stroke="#10b981" strokeDasharray="5 4" />
        <path d={path} fill="none" stroke="var(--color-primary)" strokeWidth="2" />
        {lastX !== null && lastY !== null ? (
          <circle cx={lastX} cy={lastY} r="3.5" fill="var(--color-primary)" />
        ) : null}
        <text x={width - pad} y={overY - 4} fontSize="10" textAnchor="end" fill="#ef4444">
          70
        </text>
        <text x={width - pad} y={midY - 4} fontSize="10" textAnchor="end" fill="var(--color-text-secondary)">
          50
        </text>
        <text x={width - pad} y={underY - 4} fontSize="10" textAnchor="end" fill="#10b981">
          30
        </text>
      </svg>
      {typeof lastRsi === "number" ? (
        <div style={{ marginTop: "0.35rem", fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
          RSI: <strong style={{ color: "var(--color-text-primary)" }}>{lastRsi.toFixed(1)}</strong>
        </div>
      ) : null}
    </div>
  );
};
