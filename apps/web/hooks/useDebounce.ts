import { useEffect, useState } from "react";

/**
 * Debounce delay in ms.
 */
export const DEBOUNCE_MS = 600;

/**
 * Hook for debounced operations.
 * @param value Value linked to the delay time
 * @param delay Delay time in ms. Defaults to DEBOUNCE_MS.
 */
export function useDebounce<T>(value: T, delay: number = DEBOUNCE_MS): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
