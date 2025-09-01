// src/layouts/root-layout.tsx
import { Link, Outlet } from '@tanstack/react-router';

export default function RootLayout() {
  return (
    <div>
      <header>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </header>
      <Outlet />
    </div>
  );
}
