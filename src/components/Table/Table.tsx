import React from "react";
import { clsx } from "clsx";

export interface TableColumn {
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
}

export interface TableData {
  table: string;
  columns: TableColumn[];
  data: Array<Record<string, unknown>>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type TableTheme = "glass" | "clean" | "zebra" | "compact";

export interface TableProps {
  data: TableData;
  loading?: boolean;
  error?: string | null;
  onPageChange?: (page: number) => void;
  theme?: TableTheme;
}

const Table: React.FC<TableProps> = ({
  data,
  loading,
  error,
  onPageChange,
  theme = "glass",
}) => {
  if (loading) {
    return (
      <div className="pw-data-grid__state">
        <div className="pw-data-grid__spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pw-data-grid__state pw-data-grid__state--error">{error}</div>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return <div className="pw-data-grid__state">No data available</div>;
  }

  const startRow = (data.pagination.page - 1) * data.pagination.limit + 1;
  const endRow = Math.min(
    data.pagination.page * data.pagination.limit,
    data.pagination.total,
  );

  return (
    <div className={clsx("pw-data-grid", `pw-data-grid--${theme}`)}>
      <div className="pw-data-grid__head">
        <div className="pw-data-grid__title">{data.table}</div>
        <div className="pw-data-grid__meta">{data.pagination.total} total rows</div>
      </div>

      <div className="pw-data-grid__frame">
        <table className="pw-data-grid__table">
          <thead>
            <tr>
              {data.columns.map((column) => (
                <th key={column.column_name}>
                  {column.column_name.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {data.columns.map((column, colIndex) => {
                  const value = row[column.column_name];
                  return (
                    <td key={column.column_name}>
                      {value !== null && value !== undefined ? (
                        <span
                          className={clsx({
                            "pw-data-grid__cell-primary": colIndex === 0,
                          })}
                        >
                          {String(value)}
                        </span>
                      ) : (
                        <span className="pw-data-grid__null">NULL</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.pagination && (
        <div className="pw-data-grid__footer">
          <div className="pw-data-grid__meta">
            Showing {startRow} to {endRow} of {data.pagination.total} entries
          </div>
          <div className="pw-data-grid__pager">
            <button
              className="pw-data-grid__pager-btn"
              disabled={data.pagination.page <= 1}
              onClick={() => onPageChange?.(data.pagination.page - 1)}
            >
              Previous
            </button>
            <span className="pw-data-grid__page-info">
              Page {data.pagination.page} of {data.pagination.totalPages}
            </span>
            <button
              className="pw-data-grid__pager-btn"
              disabled={data.pagination.page >= data.pagination.totalPages}
              onClick={() => onPageChange?.(data.pagination.page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
