import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useForm } from "./useForm";

interface Values extends Record<string, unknown> {
  name: string;
  agree: boolean;
}

describe("useForm", () => {
  it("initializes with initialValues", () => {
    const { result } = renderHook(() =>
      useForm<Values>({ initialValues: { name: "", agree: false }, onSubmit: vi.fn() }),
    );

    expect(result.current.values).toEqual({ name: "", agree: false });
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });

  it("updates a field value via setFieldValue", () => {
    const { result } = renderHook(() =>
      useForm<Values>({ initialValues: { name: "", agree: false }, onSubmit: vi.fn() }),
    );

    act(() => result.current.setFieldValue("name", "Ada"));

    expect(result.current.values.name).toBe("Ada");
  });

  it("runs validation and blocks submit when invalid", () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useForm<Values>({
        initialValues: { name: "", agree: false },
        validate: (v) => (v.name ? {} : { name: "Required" }),
        onSubmit,
      }),
    );

    act(() => result.current.handleSubmit());

    expect(result.current.errors.name).toBe("Required");
    expect(result.current.touched.name).toBe(true);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit when validation passes", async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useForm<Values>({
        initialValues: { name: "Ada", agree: true },
        validate: () => ({}),
        onSubmit,
      }),
    );

    await act(async () => result.current.handleSubmit());

    expect(onSubmit).toHaveBeenCalledWith({ name: "Ada", agree: true });
  });

  it("resets to initial values", () => {
    const { result } = renderHook(() =>
      useForm<Values>({ initialValues: { name: "", agree: false }, onSubmit: vi.fn() }),
    );

    act(() => result.current.setFieldValue("name", "Ada"));
    act(() => result.current.reset());

    expect(result.current.values.name).toBe("");
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });
});
