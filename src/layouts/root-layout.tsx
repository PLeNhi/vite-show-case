import { Link, Outlet } from '@tanstack/react-router';
import { Breadcrumbs } from '../components/breadcrumbs';

export default function RootLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-semibold">
              MyShop
            </Link>
            <span className="text-xs rounded-full bg-gray-100 px-2 py-0.5">Demo</span>
          </div>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{ className: 'font-medium' }}
              className="hover:underline"
            >
              Home
            </Link>
            <Link
              to="/products"
              activeProps={{ className: 'font-medium' }}
              className="hover:underline"
            >
              Products
            </Link>
          </nav>
        </div>
      </header>

      {/* Body: Sidebar + Main */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-6">
        {/* Sidebar */}
        <aside className="bg-white border rounded-xl p-4 h-fit sticky top-20">
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Navigation</div>
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                activeOptions={{ exact: true }}
                activeProps={{ className: 'font-medium' }}
                className="block px-2 py-1 rounded hover:bg-gray-50"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                activeProps={{ className: 'font-medium' }}
                className="block px-2 py-1 rounded hover:bg-gray-50"
              >
                Products
              </Link>
            </li>
          </ul>

          <div className="mt-6 text-xs uppercase tracking-wider text-gray-500 mb-2">Shortcuts</div>
          <ul className="space-y-1">
            <li>
              <Link
                to="/products/$id"
                params={{ id: 'demo-id' }}
                className="block px-2 py-1 rounded hover:bg-gray-50"
              >
                Sample product
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main content */}
        <main className="space-y-4">
          <Breadcrumbs />
          <div className="bg-white border rounded-xl p-4">
            {/* If you also pass children from a parent mount, render here. Usually not needed with Outlet. */}
            {children}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
