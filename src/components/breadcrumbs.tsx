import * as React from 'react';
import { Link, useRouterState } from '@tanstack/react-router';

export function Breadcrumbs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const segments = pathname.split('/').filter(Boolean);
  const crumbs = [
    { to: '/', label: 'Home' },
    ...segments.map((seg, idx) => {
      const to = '/' + segments.slice(0, idx + 1).join('/');
      return { to, label: decodeURIComponent(seg.replace('$', ':')) };
    }),
  ];

  return (
    <nav className="text-sm text-gray-500 flex items-center gap-2">
      {crumbs.map((c, i) => (
        <React.Fragment key={c.to}>
          {i > 0 && <span>/</span>}
          <Link
            to={c.to}
            className="hover:text-gray-700 underline-offset-2 hover:underline"
            activeOptions={{ exact: true }}
            activeProps={{ className: 'text-gray-900 font-medium' }}
          >
            {c.label || '—'}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
