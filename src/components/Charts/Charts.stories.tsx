import { useState } from 'react';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';
import { DonutChart } from './DonutChart';
import { CandlestickChart } from './CandlestickChart';
import { RSIChart } from './RSIChart';
import { Sparkline } from './Sparkline';
import { KpiChartCard } from './KpiChartCard';
import { StockMarketBoard } from './StockMarketBoard';
import { TimeRangeSelector, TimeRange } from './TimeRangeSelector';

const meta = {
  title: 'Components/Charts',
  tags: ['autodocs'],
};

export default meta;

const linePoints = Array.from({ length: 30 }, (_, i) => ({
  x: i,
  y: 100 + Math.sin(i / 3) * 15 + i,
}));

const candlestickData = Array.from({ length: 20 }, (_, i) => {
  const open = 180 + Math.sin(i / 2) * 10;
  const close = open + (Math.random() - 0.5) * 8;
  return {
    time: `Day ${i + 1}`,
    open,
    close,
    high: Math.max(open, close) + Math.random() * 3,
    low: Math.min(open, close) - Math.random() * 3,
    volume: 1000 + Math.random() * 500,
  };
});

const rsiValues = Array.from({ length: 30 }, (_, i) => 50 + Math.sin(i / 4) * 25);

export const Line = {
  render: () => (
    <LineChart data={linePoints} width={480} height={240} smooth showArea movingAverages={[5, 10]} />
  ),
};

function TimeRangeChartDemo() {
  const [range, setRange] = useState<TimeRange>('1M');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <TimeRangeSelector value={range} onChange={setRange} />
      <LineChart data={linePoints} width={480} height={240} smooth showArea />
    </div>
  );
}

export const LineWithTimeRange = {
  render: () => <TimeRangeChartDemo />,
};

export const Bar = {
  render: () => (
    <BarChart
      width={480}
      height={240}
      data={[
        { label: 'Mon', value: 42 },
        { label: 'Tue', value: 58 },
        { label: 'Wed', value: 35 },
        { label: 'Thu', value: 70 },
        { label: 'Fri', value: 61 },
      ]}
    />
  ),
};

export const Donut = {
  render: () => (
    <DonutChart
      width={280}
      height={280}
      data={[
        { label: 'Equities', value: 55, color: '#3b82f6' },
        { label: 'Bonds', value: 25, color: '#22c55e' },
        { label: 'Cash', value: 20, color: '#f59e0b' },
      ]}
    />
  ),
};

export const Candlestick = {
  render: () => (
    <CandlestickChart width={640} height={320} data={candlestickData} showVolume maPeriods={[7, 21]} />
  ),
};

export const RSI = {
  render: () => <RSIChart width={480} height={160} values={rsiValues} />,
};

export const SparklineTrend = {
  render: () => <Sparkline width={160} height={40} values={[10, 12, 9, 14, 18, 16, 22]} />,
};

export const KpiCard = {
  render: () => (
    <KpiChartCard
      title="Portfolio Value"
      value="$128,450"
      change="+4.2%"
      trendValues={[10, 12, 11, 14, 16, 15, 18]}
    />
  ),
};

export const MarketBoard = {
  render: () => (
    <StockMarketBoard
      title="Watchlist"
      portfolioChange={1.8}
      rows={[
        { symbol: 'AAPL', name: 'Apple Inc.', price: 189.42, change: 1.2, volume: 'High', sector: 'Tech' },
        { symbol: 'MSFT', name: 'Microsoft', price: 402.11, change: -0.4, volume: 'Medium', sector: 'Tech' },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.5, change: 3.1, volume: 'High', sector: 'Auto' },
      ]}
    />
  ),
};
