import {
  createRootRouteWithContext,
  createRoute,
  createRouter, // dùng type cho augment
} from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';

import { fetchProduct, fetchProducts, productQueryKey, productsQueryKey } from './apis/api';
import ProductsPage from './pages/products';
import ProductDetailPage from './pages/product-detail';
import RootLayout from './layouts/root-layout';
import Loading from './components/loading';

// 1) Kiểu context
export type RouterContext = {
  queryClient: QueryClient;
};

// 2) Root route có context
const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Welcome</div>,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
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

export const routeTree = rootRoute.addChildren([indexRoute, productsRoute, productDetailRoute]);

// 3) Hàm factory tạo router khi có context
export function makeRouter(context: RouterContext) {
  return createRouter({
    routeTree,
    defaultPreload: 'intent',
    context,
  });
}

// 4) Augment type để devtools + hooks hiểu đúng kiểu router
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof makeRouter>;
  }
}
