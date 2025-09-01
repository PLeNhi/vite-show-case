import { Link } from '@tanstack/react-router';

export default function Nav() {
  return (
    <nav style={{ display: 'flex', gap: 12 }}>
      <Link to="/" preload="intent">
        Home
      </Link>
      <Link to="/products" preload="intent">
        Products
      </Link>
    </nav>
  );
}
