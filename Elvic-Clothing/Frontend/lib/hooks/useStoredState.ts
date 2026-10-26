'use client';

import { useEffect, useRef, useState } from 'react';

/** Hydrate after mounting so browser storage cannot change server-rendered HTML. */
export function useStoredState<T>(key: string, initialValue: T, decode: (raw: string | null) => T) {
  const fallback = useRef(initialValue);
  const [value, setValue] = useState(initialValue);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setValue(decode(window.localStorage.getItem(key)));
    } catch {
      setValue(fallback.current);
    }
    setReady(true);
  }, [key, decode]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // In-memory shopping remains available when browser storage is blocked.
    }
  }, [key, ready, value]);

  return [value, setValue] as const;
}
