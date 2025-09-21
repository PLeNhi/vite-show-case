// src/features/products/routes.tsx
import { createRoute, RootRoute, type AnyContext } from '@tanstack/react-router';
import { ProductsLayout } from '../../layouts/product-layout';
import { fetchProduct, fetchProducts, productQueryKey, productsQueryKey } from '../../apis/api';
import ProductDetailPage from '../../pages/product-detail';
import ProductsPage from '../../pages/products';
import Loading from '../../components/loading';
import type { RouterContext } from '../../router';
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
  // layout '/products'
  const productsLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/products',
    component: ProductsLayout,
  });

  // index '/products'
  const productsIndexRoute = createRoute({
    getParentRoute: () => productsLayoutRoute,
    path: '/', // full path sẽ là '/products'
    loader: async ({ context }) => {
      await context.queryClient.ensureQueryData({
        queryKey: productsQueryKey,
        queryFn: fetchProducts,
        staleTime: 30_000,
      });
      return null;
    },
    component: ProductsPage,
    pendingComponent: Loading,
    errorComponent: ({ error }) => <div>Failed to load: {error.message}</div>,
  });

  // detail '/product/$id'
  const productDetailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/product/$id',
    loader: async ({ context, params }) => {
      await context.queryClient.ensureQueryData({
        queryKey: productQueryKey(params.id),
        queryFn: () => fetchProduct(params.id),
        staleTime: 30_000,
      });
      return null;
    },
    component: ProductDetailPage,
    pendingComponent: Loading,
    errorComponent: ({ error }) => <div>Failed to load: {error.message}</div>,
  });

  // trả về mảng routes (layout + index đã được addChildren để gắn kết)
  return [productsLayoutRoute.addChildren([productsIndexRoute]), productDetailRoute];
}
