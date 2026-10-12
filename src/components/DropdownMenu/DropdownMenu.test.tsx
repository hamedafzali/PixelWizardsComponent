import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DropdownMenu } from "./DropdownMenu";

const items = (onDelete = vi.fn()) => [
  { label: "Edit", onClick: vi.fn() },
  { label: "Archive", disabled: true },
  { label: "Delete", onClick: onDelete, danger: true, dividerAbove: true },
];

describe("DropdownMenu", () => {
  it("gives an icon-only trigger an accessible name", () => {
    render(<DropdownMenu items={items()} triggerLabel="Project actions" />);
    expect(screen.getByRole("button", { name: "Project actions" })).toHaveAttribute(
      "aria-haspopup",
      "menu",
    );
  });

  it("focuses the first item and skips disabled items with arrow keys", async () => {
    const user = userEvent.setup();
    render(<DropdownMenu items={items()} />);
    await user.click(screen.getByRole("button", { name: "More actions" }));
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("runs the action, closes and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<DropdownMenu items={items(onDelete)} />);
    const trigger = screen.getByRole("button", { name: "More actions" });
    await user.click(trigger);
    await user.click(screen.getByRole("menuitem", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<DropdownMenu items={items()} />);
    await user.click(screen.getByRole("button", { name: "More actions" }));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
