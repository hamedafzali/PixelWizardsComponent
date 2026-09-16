import { useState, useCallback, ChangeEvent, FormEvent } from "react";

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type FormTouched<T> = Partial<Record<keyof T, boolean>>;

export interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => FormErrors<T>;
  onSubmit: (values: T) => void | Promise<void>;
}

export interface UseFormResult<T> {
  values: T;
  errors: FormErrors<T>;
  touched: FormTouched<T>;
  isSubmitting: boolean;
  setFieldValue: (field: keyof T, value: T[keyof T]) => void;
  setFieldTouched: (field: keyof T) => void;
  setValues: (values: T) => void;
  handleChange: (
    field: keyof T,
  ) => (value: T[keyof T] | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (field: keyof T) => () => void;
  handleSubmit: (event?: FormEvent) => void;
  reset: () => void;
}

function isChangeEvent(
  value: unknown,
): value is ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {
  return typeof value === "object" && value !== null && "target" in value;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>): UseFormResult<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<FormTouched<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldValue = useCallback((field: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setFieldTouched = useCallback((field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleChange = useCallback(
    (field: keyof T) =>
      (value: T[keyof T] | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (isChangeEvent(value)) {
          const target = value.target;
          const nextValue =
            target instanceof HTMLInputElement && target.type === "checkbox"
              ? target.checked
              : target.value;
          setFieldValue(field, nextValue as T[keyof T]);
        } else {
          setFieldValue(field, value);
        }
      },
    [setFieldValue],
  );

  const handleBlur = useCallback(
    (field: keyof T) => () => {
      setFieldTouched(field);
      if (validate) {
        setErrors(validate(values));
      }
    },
    [validate, values, setFieldTouched],
  );

  const handleSubmit = useCallback(
    (event?: FormEvent) => {
      event?.preventDefault();

      const allTouched = (Object.keys(values) as Array<keyof T>).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as FormTouched<T>,
      );
      setTouched(allTouched);

      const validationErrors = validate ? validate(values) : {};
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);
        Promise.resolve(onSubmit(values)).finally(() => setIsSubmitting(false));
      }
    },
    [values, validate, onSubmit],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
