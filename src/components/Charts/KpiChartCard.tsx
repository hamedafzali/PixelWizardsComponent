import React from "react";
import { Card } from "../Card";
import { KpiChartCardProps } from "./Charts.types";
import { Sparkline } from "./Sparkline";

export const KpiChartCard: React.FC<KpiChartCardProps> = ({
  title,
  value,
  change,
  trendValues = [],
  subtitle,
  className,
}) => {
  const negative = (change || "").trim().startsWith("-");

  return (
    <Card className={`pw-kpi-card ${className || ""}`}>
      <div className="pw-kpi-card__head">
        <span className="pw-kpi-card__title">{title}</span>
        {change ? (
          <span
            className={`pw-kpi-card__change ${
              negative ? "pw-kpi-card__change--down" : "pw-kpi-card__change--up"
            }`}
          >
            {change}
          </span>
        ) : null}
      </div>
      <div className="pw-kpi-card__value">{value}</div>
      {subtitle ? <div className="pw-kpi-card__subtitle">{subtitle}</div> : null}
      {trendValues.length > 1 ? <Sparkline values={trendValues} /> : null}
    </Card>
  );
};
