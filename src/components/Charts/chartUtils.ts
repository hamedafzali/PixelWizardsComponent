export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const range = (values: number[]) => {
  if (values.length === 0) {
    return { min: 0, max: 1 };
  }
  let min = values[0];
  let max = values[0];
  values.forEach((v) => {
    min = Math.min(min, v);
    max = Math.max(max, v);
  });
  if (min === max) {
    return { min: min - 1, max: max + 1 };
  }
  return { min, max };
};

export const scaledY = (
  value: number,
  min: number,
  max: number,
  height: number,
  pad: number,
) => {
  const inner = Math.max(1, height - pad * 2);
  const t = (value - min) / Math.max(1e-9, max - min);
  return pad + (1 - t) * inner;
};

export const palette = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#22c55e",
  "#0ea5e9",
  "#a855f7",
  "#e11d48",
  "#14b8a6",
  "#facc15",
];

export const movingAverage = (values: number[], period: number): Array<number | null> => {
  if (period <= 1) return values.map((v) => v);
  let sum = 0;
  return values.map((value, index) => {
    sum += value;
    if (index >= period) {
      sum -= values[index - period];
    }
    if (index < period - 1) return null;
    return sum / period;
  });
};

export const calculateRSI = (values: number[], period = 14): Array<number | null> => {
  if (values.length < 2) return values.map(() => null);
  const gains: number[] = [];
  const losses: number[] = [];

  for (let index = 1; index < values.length; index += 1) {
    const delta = values[index] - values[index - 1];
    gains.push(Math.max(0, delta));
    losses.push(Math.max(0, -delta));
  }

  const result: Array<number | null> = [null];
  for (let index = 0; index < gains.length; index += 1) {
    if (index < period - 1) {
      result.push(null);
      continue;
    }
    const start = index - (period - 1);
    const avgGain = gains.slice(start, index + 1).reduce((a, b) => a + b, 0) / period;
    const avgLoss = losses.slice(start, index + 1).reduce((a, b) => a + b, 0) / period;
    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    const rsi = 100 - 100 / (1 + rs);
    result.push(clamp(rsi, 0, 100));
  }

  return result;
};
