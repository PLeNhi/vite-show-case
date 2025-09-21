import { Outlet } from '@tanstack/react-router';

export function ProductsLayout() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Products</h2>
        <div className="flex items-center gap-2">
          {/* Placeholder cho filter/search */}
          <input className="border rounded px-2 py-1 text-sm" placeholder="Search…" />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
