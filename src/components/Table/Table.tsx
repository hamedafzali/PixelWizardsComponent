import React from "react";

export interface TableColumn {
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
}

export interface TableData {
  table: string;
  columns: TableColumn[];
  data: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TableProps {
  data: TableData;
  loading?: boolean;
  error?: string | null;
  onPageChange?: (page: number) => void;
}

const Table: React.FC<TableProps> = ({
  data,
  loading,
  error,
  onPageChange,
}) => {
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            width: "2rem",
            height: "2rem",
            border: "2px solid var(--glass-text-primary)",
            borderTop: "2px solid transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          color: "var(--glass-text-primary)",
        }}
      >
        <div>{error}</div>
      </div>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          color: "var(--glass-text-primary)",
        }}
      >
        <div>No data available</div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            margin: 0,
            color: "var(--glass-text-primary)",
          }}
        >
          {data.table}
        </div>
        <div
          style={{
            fontSize: "0.875rem",
            color: "var(--glass-text-secondary)",
          }}
        >
          {data.pagination.total} total rows
        </div>
      </div>

      <div
        style={{
          flex: 1,
          background: "var(--glass-bg-secondary)",
          backdropFilter: "var(--glass-blur-medium)",
          border: "1px solid rgba(0, 0, 0, 0.15)",
          borderRadius: "16px",
          height: "70vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "1rem",
            borderBottom: "1px solid var(--glass-border)",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              margin: 0,
              color: "var(--glass-text-primary)",
            }}
          >
            Columns
          </div>
        </div>
        <div
          style={{
            height: "calc(70vh - 180px)",
            overflow: "auto",
            borderRadius: "8px",
            border: "1px solid var(--glass-border-secondary)",
            background: "var(--glass-bg-primary)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.875rem",
              background: "var(--glass-bg-primary)",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              border: "1px solid var(--glass-border-primary)",
            }}
          >
            <thead>
              <tr
                style={{
                  background:
                    "linear-gradient(135deg, var(--glass-bg-primary), var(--glass-bg-secondary))",
                }}
              >
                {data.columns.map((column) => (
                  <th
                    key={column.column_name}
                    style={{
                      padding: "1rem 0.75rem",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      minWidth: "120px",
                      color: "var(--glass-text-primary)",
                      borderBottom: "2px solid var(--glass-border-primary)",
                      textAlign: "left",
                      letterSpacing: "0.025em",
                      position: "sticky",
                      top: 0,
                      zIndex: 10,
                      whiteSpace: "nowrap",
                      textTransform: "capitalize",
                    }}
                  >
                    {column.column_name.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.data.map((row, rowIndex) => (
                <tr
                  key={`row-${rowIndex}`}
                  style={{
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "var(--glass-bg-secondary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {data.columns.map((column, colIndex) => (
                    <td
                      key={column.column_name}
                      style={{
                        padding: "0.875rem 0.75rem",
                        color: "var(--glass-text-primary)",
                        borderBottom: "1px solid var(--glass-border-secondary)",
                        textAlign: "left",
                        verticalAlign: "middle",
                        position: "relative",
                        ...(colIndex === 0 && {
                          fontWeight: "500",
                        }),
                      }}
                    >
                      {row[column.column_name] !== null ? (
                        <span>{String(row[column.column_name])}</span>
                      ) : (
                        <span
                          style={{
                            color: "var(--glass-text-tertiary)",
                            fontStyle: "italic",
                            fontSize: "0.875rem",
                          }}
                        >
                          NULL
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {data.pagination && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1.5rem",
            padding: "1rem",
            background: "var(--glass-bg-primary)",
            borderRadius: "8px",
            border: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--glass-text-secondary)",
            }}
          >
            Showing {(data.pagination.page - 1) * data.pagination.limit + 1} to{" "}
            {Math.min(
              data.pagination.page * data.pagination.limit,
              data.pagination.total
            )}{" "}
            of {data.pagination.total} entries
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <button
              disabled={data.pagination.page <= 1}
              onClick={() => onPageChange?.(data.pagination.page - 1)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor:
                  data.pagination.page <= 1
                    ? "var(--glass-bg-tertiary)"
                    : "var(--glass-bg-primary)",
                color:
                  data.pagination.page <= 1
                    ? "var(--glass-text-tertiary)"
                    : "var(--glass-text-primary)",
                border: "1px solid var(--glass-border-secondary)",
                borderRadius: "6px",
                cursor: data.pagination.page <= 1 ? "not-allowed" : "pointer",
                fontSize: "0.875rem",
                fontWeight: "500",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => {
                if (data.pagination.page > 1) {
                  e.currentTarget.style.backgroundColor =
                    "var(--glass-bg-secondary)";
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                }
              }}
              onMouseLeave={(e) => {
                if (data.pagination.page > 1) {
                  e.currentTarget.style.backgroundColor =
                    "var(--glass-bg-primary)";
                }
              }}
            >
              ← Previous
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0 1rem",
              }}
            >
              <span
                style={{
                  color: "var(--glass-text-primary)",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                Page {data.pagination.page} of {data.pagination.totalPages}
              </span>
            </div>

            <button
              disabled={data.pagination.page >= data.pagination.totalPages}
              onClick={() => onPageChange?.(data.pagination.page + 1)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor:
                  data.pagination.page >= data.pagination.totalPages
                    ? "var(--glass-bg-tertiary)"
                    : "var(--glass-bg-primary)",
                color:
                  data.pagination.page >= data.pagination.totalPages
                    ? "var(--glass-text-tertiary)"
                    : "var(--glass-text-primary)",
                border: "1px solid var(--glass-border-secondary)",
                borderRadius: "6px",
                cursor:
                  data.pagination.page >= data.pagination.totalPages
                    ? "not-allowed"
                    : "pointer",
                fontSize: "0.875rem",
                fontWeight: "500",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => {
                if (data.pagination.page < data.pagination.totalPages) {
                  e.currentTarget.style.backgroundColor =
                    "var(--glass-bg-secondary)";
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                }
              }}
              onMouseLeave={(e) => {
                if (data.pagination.page < data.pagination.totalPages) {
                  e.currentTarget.style.backgroundColor =
                    "var(--glass-bg-primary)";
                }
              }}
            >
              Next →
            </button>
          </div>
          <div style={{ width: "200px" }} /> {/* Spacer for alignment */}
        </div>
      )}
    </div>
  );
};

export default Table;
