import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToggleGroup } from "./ToggleGroup";

const items = [
  { id: "all", label: "All", count: 5 },
  { id: "running", label: "Running", count: 3 },
  { id: "stopped", label: "Stopped", count: 2 },
];

describe("ToggleGroup", () => {
  it("exposes single selection as a radio group", () => {
    render(<ToggleGroup items={items} value="running" ariaLabel="Status" />);
    expect(screen.getByRole("radiogroup", { name: "Status" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Running/ })).toBeChecked();
    expect(screen.getByRole("radio", { name: /All/ })).toHaveAttribute("tabindex", "-1");
  });

  it("moves the selection with arrow keys", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ToggleGroup items={items} defaultValue="all" onChange={onChange} />);
    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith("running");
    expect(screen.getByRole("radio", { name: /Running/ })).toHaveFocus();
    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith("stopped");
  });

  it("uses pressed buttons for multiple selection", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ToggleGroup items={items} multiple defaultValue={["all"]} onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /Stopped/ }));
    expect(onChange).toHaveBeenLastCalledWith(["all", "stopped"]);
    expect(screen.getByRole("button", { name: /Stopped/ })).toHaveAttribute("aria-pressed", "true");
  });
});
