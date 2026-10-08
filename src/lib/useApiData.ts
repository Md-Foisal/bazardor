"use client";

import { useEffect, useState } from "react";

// same request is shared, so ticker and home grid dont call api twice
const requests = new Map<string, Promise<unknown>>();

type State<T> = {
  data: T | null;
  error: string | null;
  key: string;
};

export function useApiData<T>(key: string, loader: () => Promise<T>) {
  const [state, setState] = useState<State<T>>({ data: null, error: null, key });

  useEffect(() => {
    let alive = true;

    if (!requests.has(key)) {
      const req = loader().catch((err) => {
        requests.delete(key); // so next visit can try again
        throw err;
      });
      requests.set(key, req);
    }

    (requests.get(key) as Promise<T>)
      .then((data) => {
        if (alive) setState({ data, error: null, key });
      })
      .catch(() => {
        if (alive) setState({ data: null, error: "ডেটা লোড করা যায়নি", key });
      });

    return () => {
      alive = false;
    };
    // loader is a plain function from the caller, key is enough here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // when key change, old data should not show
  const fresh = state.key === key;
  return {
    data: fresh ? state.data : null,
    error: fresh ? state.error : null,
    loading: !fresh || (state.data === null && state.error === null),
  };
}
