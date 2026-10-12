import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { DataTable } from "./DataTable";

type Row = { id: string; name: string; size: number };
const rows: Row[] = [
  { id: "a", name: "nginx", size: 10 },
  { id: "b", name: "redis", size: 20 },
];
const columns = [
  { key: "name", header: "Name" },
  { key: "size", header: "Size", align: "right" as const, render: (r: Row) => `${r.size} MB` },
];

describe("DataTable", () => {
  it("renders headers and cells with custom renderers", () => {
    render(<DataTable columns={columns} rows={rows} rowKey={(r) => r.id} caption="Images" />);
    expect(screen.getByRole("table", { name: "Images" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Size" })).toBeInTheDocument();
    expect(screen.getByText("20 MB")).toBeInTheDocument();
  });

  it("shows the empty message when there are no rows", () => {
    render(<DataTable columns={columns} rows={[]} rowKey={(r) => r.id} empty="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("renders labelled row groups", () => {
    render(
      <DataTable
        columns={columns}
        rowKey={(r) => r.id}
        groups={[
          { key: "web", label: "web", rows: [rows[0]] },
          { key: "cache", label: "cache", rows: [rows[1]] },
        ]}
      />,
    );
    const groupHeader = screen.getByRole("columnheader", { name: "cache" });
    const section = groupHeader.closest("tbody") as HTMLElement;
    expect(within(section).getByText("redis")).toBeInTheDocument();
  });
});
