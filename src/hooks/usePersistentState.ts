import { useCallback, useState } from "react";

/**
 * useState that remembers its value in localStorage under `key`.
 * Falls back to in-memory state when storage is unavailable (private mode,
 * blocked cookies) and ignores stored values that fail `isValid`.
 */
export function usePersistentState<T>(
  key: string,
  initial: T,
  isValid: (value: unknown) => value is T = (_v): _v is T => true,
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return initial;
      const parsed: unknown = JSON.parse(raw);
      return isValid(parsed) ? parsed : initial;
    } catch {
      return initial;
    }
  });

  const update = useCallback(
    (next: T) => {
      setValue(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* storage unavailable: keep the value for this session only */
      }
    },
    [key],
  );

  return [value, update] as const;
}
