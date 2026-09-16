import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("does not show the tooltip content until hovered", () => {
    render(
      <Tooltip content="Helpful hint">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows the tooltip on hover and hides it after mouse leave", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Helpful hint" showDelay={0} hideDelay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText("Hover me"));
    await waitFor(() => expect(screen.getByRole("tooltip")).toHaveTextContent("Helpful hint"));

    await user.unhover(screen.getByText("Hover me"));
    await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  });

  it("never renders content when disabled", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Helpful hint" disabled showDelay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText("Hover me"));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
