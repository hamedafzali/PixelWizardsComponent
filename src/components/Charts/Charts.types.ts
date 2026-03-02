import { ReactNode } from "react";

export type ChartPoint = {
  x: string | number;
  y: number;
};

export type BarDatum = {
  label: string;
  value: number;
  color?: string;
};

export type DonutDatum = {
  label: string;
  value: number;
  color?: string;
};

export type CandlestickDatum = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
};

export type BaseChartProps = {
  width?: number;
  height?: number;
  className?: string;
};

export type LineChartProps = BaseChartProps & {
  data: ChartPoint[];
  smooth?: boolean;
  showArea?: boolean;
  lineColor?: string;
  movingAverages?: number[];
  supportLevel?: number;
  resistanceLevel?: number;
};

export type BarChartProps = BaseChartProps & {
  data: BarDatum[];
};

export type DonutChartProps = BaseChartProps & {
  data: DonutDatum[];
  innerRadius?: number;
};

export type SparklineProps = BaseChartProps & {
  values: number[];
  color?: string;
};

export type CandlestickChartProps = BaseChartProps & {
  data: CandlestickDatum[];
  showVolume?: boolean;
  supportLevel?: number;
  resistanceLevel?: number;
  maPeriods?: number[];
};

export type KpiChartCardProps = {
  title: string;
  value: string;
  change?: string;
  trendValues?: number[];
  subtitle?: ReactNode;
  className?: string;
};

export type MarketBoardRow = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: "Low" | "Medium" | "High";
  sector: string;
};

export type StockMarketBoardProps = {
  title?: string;
  rows: MarketBoardRow[];
  portfolioChange?: number;
  className?: string;
  sortable?: boolean;
};

export type RSIChartProps = BaseChartProps & {
  values: number[];
  period?: number;
  overbought?: number;
  oversold?: number;
};
