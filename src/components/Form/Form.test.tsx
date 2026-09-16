import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from "./Form";
import { FormField } from "./FormField";

describe("Form", () => {
  it("calls onSubmit when submitted", () => {
    const onSubmit = vi.fn((e) => e.preventDefault());
    render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>,
    );

    fireEvent.click(screen.getByText("Submit"));

    expect(onSubmit).toHaveBeenCalled();
  });
});

describe("FormField", () => {
  it("renders label and children", () => {
    render(
      <FormField label="Name" htmlFor="name">
        <input id="name" />
      </FormField>,
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders error message with alert role", () => {
    render(
      <FormField label="Name" error="Required">
        <input />
      </FormField>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("shows required marker when required", () => {
    render(
      <FormField label="Name" required>
        <input />
      </FormField>,
    );

    expect(screen.getByLabelText("required")).toBeInTheDocument();
  });
});
