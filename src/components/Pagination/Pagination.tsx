import React from "react";
import { clsx } from "clsx";
import { PaginationProps } from "./Pagination.types";

const getPages = (page: number, total: number) => {
  const pages = new Set<number>([1, total, page - 1, page, page + 1]);
  return Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  className,
}) => {
  const pages = getPages(page, totalPages);
  return (
    <div className={clsx("pw-pagination", className)}>
      <button
        type="button"
        className="pw-pagination__btn"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
      >
        Prev
      </button>
      {pages.map((p, index) => {
        const prev = pages[index - 1];
        const gap = prev && p - prev > 1;
        return (
          <React.Fragment key={p}>
            {gap && <span className="pw-pagination__gap">…</span>}
            <button
              type="button"
              className={clsx("pw-pagination__btn", {
                "pw-pagination__btn--active": p === page,
              })}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          </React.Fragment>
        );
      })}
      <button
        type="button"
        className="pw-pagination__btn"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
};
