// src/features/home/routes.tsx
import { createRoute, RootRoute, type AnyContext } from '@tanstack/react-router';
import type { RouterContext } from '../../router';
import Loading from '../../components/loading';
import CartPage from '../../pages/cart-context-page';

export function buildRoutes(
  rootRoute: RootRoute<
    undefined,
    RouterContext,
    AnyContext,
    AnyContext,
    object,
    undefined,
    unknown,
    unknown
  >
) {
  const cartsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/carts',
    component: CartPage,
    pendingComponent: Loading,
    errorComponent: ({ error }) => <div>Failed to load: {error.message}</div>,
  });

  return [cartsRoute];
}
