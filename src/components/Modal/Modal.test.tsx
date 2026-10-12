import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";
import { ThemeProvider } from "../../themes";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe("Modal", () => {
  it("renders nothing when closed", () => {
    renderWithTheme(
      <Modal open={false} onClose={vi.fn()}>
        Content
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders as an accessible dialog when open", () => {
    renderWithTheme(
      <Modal open onClose={vi.fn()} title="Confirm">
        Content
      </Modal>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("calls onClose on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderWithTheme(
      <Modal open onClose={onClose}>
        Content
      </Modal>,
    );

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose on Escape when disableClose is set", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderWithTheme(
      <Modal open onClose={onClose} disableClose>
        Content
      </Modal>,
    );

    await user.keyboard("{Escape}");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("labels the dialog with a unique title id", () => {
    render(
      <>
        <Modal open onClose={vi.fn()} title="First">
          A
        </Modal>
        <Modal open onClose={vi.fn()} title="Second">
          B
        </Modal>
      </>,
    );
    expect(screen.getByRole("dialog", { name: "First" })).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "Second" })).toBeInTheDocument();
  });

  it("works without a theme provider and focuses the first field", () => {
    render(
      <Modal open onClose={vi.fn()} title="Edit">
        <input aria-label="Name" />
      </Modal>,
    );
    expect(screen.getByLabelText("Name")).toHaveFocus();
  });

  it("keeps Tab inside the dialog", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button>Outside</button>
        <Modal open onClose={vi.fn()} title="Edit" footer={<button>Save</button>}>
          <input aria-label="Name" />
        </Modal>
      </>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "Save" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Close dialog" })).toHaveFocus();
  });
});
