import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";
import { ThemeProvider } from "../../themes";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe("Input", () => {
  it("renders with a label", () => {
    renderWithTheme(<Input label="Name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("accepts typed input and reports changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithTheme(<Input label="Name" onChange={onChange} />);

    const input = screen.getByLabelText("Name");
    await user.type(input, "Hamed");

    expect(input).toHaveValue("Hamed");
    expect(onChange).toHaveBeenCalled();
  });

  it("exposes an error message via aria-describedby", () => {
    renderWithTheme(<Input label="Email" error="Email is required" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("respects the disabled prop", () => {
    renderWithTheme(<Input label="Name" disabled />);
    expect(screen.getByLabelText("Name")).toBeDisabled();
  });
});
