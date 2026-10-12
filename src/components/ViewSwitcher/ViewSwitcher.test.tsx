import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ViewSwitcher, useViewMode } from "./ViewSwitcher";

function Harness() {
  const [mode, setMode] = useViewMode("images", "grid", ["grid", "table"] as const);
  return (
    <>
      <ViewSwitcher value={mode} onChange={setMode} options={["grid", "table"]} />
      <output>{mode}</output>
    </>
  );
}

describe("ViewSwitcher", () => {
  beforeEach(() => window.localStorage.clear());

  it("switches view and remembers the choice", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Harness />);
    expect(screen.getByRole("status")).toHaveTextContent("grid");
    await user.click(screen.getByRole("radio", { name: "Table" }));
    expect(screen.getByRole("status")).toHaveTextContent("table");
    unmount();
    render(<Harness />);
    expect(screen.getByRole("status")).toHaveTextContent("table");
  });

  it("ignores a stored view that is not offered", () => {
    window.localStorage.setItem("pw.view.images", JSON.stringify("list"));
    render(<Harness />);
    expect(screen.getByRole("status")).toHaveTextContent("grid");
  });
});
