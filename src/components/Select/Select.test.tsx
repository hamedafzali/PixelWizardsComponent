import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./Select";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry", disabled: true },
];

describe("Select", () => {
  it("shows the placeholder when nothing is selected", () => {
    render(<Select options={options} placeholder="Pick a fruit" />);
    expect(screen.getByRole("button")).toHaveTextContent("Pick a fruit");
  });

  it("opens the option list on click and reports aria-expanded", async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);

    const trigger = screen.getByRole("button");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("selects an option and calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Banana"));

    expect(onChange).toHaveBeenCalledWith("banana");
    expect(screen.getByRole("button")).toHaveTextContent("Banana");
  });

  it("does not select a disabled option", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Cherry"));

    expect(onChange).not.toHaveBeenCalled();
  });

  it("is not focusable when disabled", () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole("button")).toHaveAttribute("tabIndex", "-1");
  });
});
