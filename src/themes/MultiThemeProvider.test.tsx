import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultiThemeProvider, useMultiTheme } from "./MultiThemeProvider";

function ThemeConsumer() {
  const { currentThemeType, setThemeType, isDark, isLiquidGlass } = useMultiTheme();
  return (
    <div>
      <span data-testid="theme-type">{currentThemeType}</span>
      <span data-testid="is-dark">{String(isDark)}</span>
      <span data-testid="is-liquid-glass">{String(isLiquidGlass)}</span>
      <button onClick={() => setThemeType("dark")}>Set Dark</button>
      <button onClick={() => setThemeType("liquid-glass-light")}>Set Liquid Glass</button>
    </div>
  );
}

describe("MultiThemeProvider", () => {
  it("provides the requested default theme", () => {
    render(
      <MultiThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </MultiThemeProvider>,
    );
    expect(screen.getByTestId("theme-type")).toHaveTextContent("light");
    expect(screen.getByTestId("is-dark")).toHaveTextContent("false");
  });

  it("switches theme type via setThemeType", async () => {
    const user = userEvent.setup();
    render(
      <MultiThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </MultiThemeProvider>,
    );

    await user.click(screen.getByText("Set Dark"));
    expect(screen.getByTestId("theme-type")).toHaveTextContent("dark");
    expect(screen.getByTestId("is-dark")).toHaveTextContent("true");
  });

  it("recognizes liquid-glass themes", async () => {
    const user = userEvent.setup();
    render(
      <MultiThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </MultiThemeProvider>,
    );

    await user.click(screen.getByText("Set Liquid Glass"));
    expect(screen.getByTestId("is-liquid-glass")).toHaveTextContent("true");
  });

  it("applies the theme mode as a data attribute on the document root", () => {
    render(
      <MultiThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </MultiThemeProvider>,
    );
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("throws when useMultiTheme is used outside the provider", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ThemeConsumer />)).toThrow(
      "useMultiTheme must be used within a MultiThemeProvider",
    );
    errorSpy.mockRestore();
  });
});
