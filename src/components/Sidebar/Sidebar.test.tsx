import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sidebar } from "./Sidebar";

const sections = [
  {
    title: "Workloads",
    items: [
      { id: "containers", label: "Containers", href: "/containers", active: true, badge: 4 },
      { id: "images", label: "Images", href: "/images" },
    ],
  },
];

describe("Sidebar", () => {
  it("marks the active page and names the landmark", () => {
    render(<Sidebar sections={sections} ariaLabel="Primary" />);
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Containers/ })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Images" })).not.toHaveAttribute("aria-current");
  });

  it("toggles collapse with the button and with Ctrl+B", async () => {
    const user = userEvent.setup();
    const onCollapsedChange = vi.fn();
    render(<Sidebar sections={sections} collapsed={false} onCollapsedChange={onCollapsedChange} />);
    await user.click(screen.getByRole("button", { name: "Collapse sidebar" }));
    expect(onCollapsedChange).toHaveBeenLastCalledWith(true);
    await user.keyboard("{Control>}b{/Control}");
    expect(onCollapsedChange).toHaveBeenCalledTimes(2);
  });

  it("closes the mobile drawer on Escape and after navigating", async () => {
    const user = userEvent.setup();
    const onMobileClose = vi.fn();
    render(<Sidebar sections={sections} mobileOpen onMobileClose={onMobileClose} renderLink={({ item, children, ...rest }) => (
      <button type="button" {...rest}>{children}{item.id === "images" ? "" : ""}</button>
    )} />);
    await user.keyboard("{Escape}");
    expect(onMobileClose).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("button", { name: "Images" }));
    expect(onMobileClose).toHaveBeenCalledTimes(2);
  });
});
