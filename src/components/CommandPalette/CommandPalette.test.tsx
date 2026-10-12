import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommandPalette } from "./CommandPalette";

const setup = () => {
  const onClose = vi.fn();
  const openDb = vi.fn();
  const items = [
    { id: "dash", group: "Pages", label: "Dashboard", onSelect: vi.fn() },
    { id: "db", group: "Containers", label: "postgres", keywords: ["database"], onSelect: openDb },
  ];
  render(<CommandPalette open onClose={onClose} items={items} />);
  return { onClose, openDb };
};

describe("CommandPalette", () => {
  it("filters by label and keywords and runs the active item on Enter", async () => {
    const user = userEvent.setup();
    const { onClose, openDb } = setup();
    expect(screen.getAllByRole("option")).toHaveLength(2);
    await user.type(screen.getByRole("combobox"), "database");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    await user.keyboard("{Enter}");
    expect(onClose).toHaveBeenCalled();
    expect(openDb).toHaveBeenCalled();
  });

  it("moves the active option with arrow keys and closes on Escape", async () => {
    const user = userEvent.setup();
    const { onClose } = setup();
    const [first, second] = screen.getAllByRole("option");
    expect(first).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowDown}");
    expect(second).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("shows the empty text when nothing matches", async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByRole("combobox"), "zzz");
    expect(screen.getByText("No results")).toBeInTheDocument();
  });
});
