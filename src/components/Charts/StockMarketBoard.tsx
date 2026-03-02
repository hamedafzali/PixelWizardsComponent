import React, { useMemo, useState } from "react";
import { StockMarketBoardProps } from "./Charts.types";

export const StockMarketBoard: React.FC<StockMarketBoardProps> = ({
  title = "Market Watch",
  rows,
  portfolioChange = 0,
  className,
  sortable = false,
}) => {
  const [sortKey, setSortKey] = useState<"symbol" | "price" | "change" | "volume" | "sector">("symbol");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sortedRows = useMemo(() => {
    const volumeRank = { Low: 1, Medium: 2, High: 3 };
    const list = [...rows];
    list.sort((a, b) => {
      let left: string | number = "";
      let right: string | number = "";
      if (sortKey === "symbol") {
        left = a.symbol;
        right = b.symbol;
      } else if (sortKey === "price") {
        left = a.price;
        right = b.price;
      } else if (sortKey === "change") {
        left = a.change;
        right = b.change;
      } else if (sortKey === "volume") {
        left = volumeRank[a.volume];
        right = volumeRank[b.volume];
      } else {
        left = a.sector;
        right = b.sector;
      }

      const result = left > right ? 1 : left < right ? -1 : 0;
      return sortDir === "asc" ? result : -result;
    });
    return list;
  }, [rows, sortDir, sortKey]);

  const applySort = (key: "symbol" | "price" | "change" | "volume" | "sector") => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortMark = (key: "symbol" | "price" | "change" | "volume" | "sector") =>
    sortKey === key ? (sortDir === "asc" ? " ▲" : " ▼") : "";

  return (
    <div className={`pw-market-board ${className || ""}`}>
      <div className="pw-market-board__head">
        <h3 className="pw-market-board__title">{title}</h3>
        <div className="pw-market-board__meta">
          <span className="pw-market-board__live">LIVE</span>
          <span className="pw-market-board__time">
            {new Date().toLocaleTimeString()}
          </span>
          <span
            className={`pw-market-board__portfolio ${
              portfolioChange >= 0
                ? "pw-market-board__portfolio--up"
                : "pw-market-board__portfolio--down"
            }`}
          >
            Portfolio: {portfolioChange >= 0 ? "+" : ""}
            {portfolioChange.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="pw-market-board__table">
        <div className="pw-market-board__row pw-market-board__row--header">
          <button type="button" className="pw-market-board__sort" onClick={() => applySort("symbol")}>
            Symbol{sortMark("symbol")}
          </button>
          <button type="button" className="pw-market-board__sort" onClick={() => applySort("price")}>
            Price{sortMark("price")}
          </button>
          <button type="button" className="pw-market-board__sort" onClick={() => applySort("change")}>
            Change{sortMark("change")}
          </button>
          <button type="button" className="pw-market-board__sort" onClick={() => applySort("volume")}>
            Volume{sortMark("volume")}
          </button>
          <button type="button" className="pw-market-board__sort" onClick={() => applySort("sector")}>
            Sector{sortMark("sector")}
          </button>
        </div>

        {sortedRows.map((row) => (
          <div key={`${row.symbol}-${row.name}`} className="pw-market-board__row">
            <div>
              <div className="pw-market-board__symbol">{row.symbol}</div>
              <div className="pw-market-board__name">{row.name}</div>
            </div>
            <div className="pw-market-board__price">${row.price}</div>
            <div
              className={`pw-market-board__change ${
                row.change >= 0
                  ? "pw-market-board__change--up"
                  : "pw-market-board__change--down"
              }`}
            >
              <span>{row.change >= 0 ? "▲" : "▼"}</span>
              <span>{Math.abs(row.change).toFixed(1)}%</span>
            </div>
            <div>
              <div className="pw-market-board__volume-bar">
                <div
                  className="pw-market-board__volume-fill"
                  style={{
                    width:
                      row.volume === "High"
                        ? "80%"
                        : row.volume === "Medium"
                        ? "50%"
                        : "22%",
                  }}
                />
              </div>
              <div className="pw-market-board__volume-text">{row.volume}</div>
            </div>
            <div>
              <span className="pw-market-board__sector">{row.sector}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
