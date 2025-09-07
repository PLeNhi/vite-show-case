// src/pages/lazy.tsx (helper, optional)
import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyPage<T extends React.ComponentType<any>>(
  loader: () => Promise<{ default: T }>
) {
  const C = React.lazy(loader);
  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <React.Suspense fallback={<div>Loading…</div>}>
        <C {...props} />
      </React.Suspense>
    );
  };
}
