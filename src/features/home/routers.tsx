// src/features/home/routes.tsx
import { createRoute, RootRoute, type AnyContext } from '@tanstack/react-router';
import type { RouterContext } from '../../router';
import HomePage from './home-page';

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
  const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: () => <HomePage />,
  });
  return aboutRoute;
}
