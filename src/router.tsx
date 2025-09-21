// import {
//   createRootRouteWithContext,
//   createRoute,
//   createRouter, // dùng type cho augment
// } from '@tanstack/react-router';
// import type { QueryClient } from '@tanstack/react-query';

// import { fetchProduct, fetchProducts, productQueryKey, productsQueryKey } from './apis/api';
// import RootLayout from './layouts/root-layout';
// import Loading from './components/loading';
// import { lazyPage } from './components/page-lazy';
// import { ProductsLayout } from './layouts/product-layout';

// // 1) Kiểu context
// export type RouterContext = {
//   queryClient: QueryClient;
// };

// // 2) Root route có context
// const rootRoute = createRootRouteWithContext<RouterContext>()({
//   component: RootLayout,
// });

// const indexRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/',
//   component: () => (
//     <div className="prose">
//       <h1>Welcome</h1>
//       <p>Select a page in the sidebar.</p>
//     </div>
//   ),
// });

// const productsLayoutRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/products',
//   component: ProductsLayout,
// });

// const ProductsPage = lazyPage(() => import('./pages/products'));
// const ProductDetailPage = lazyPage(() => import('./pages/product-detail'));

// const productsIndexRoute = createRoute({
//   getParentRoute: () => productsLayoutRoute,
//   path: '/',
//   loader: async ({ context }) => {
//     await context.queryClient.ensureQueryData({
//       queryKey: productsQueryKey,
//       queryFn: fetchProducts,
//       staleTime: 30_000,
//     });
//     return null;
//   },
//   component: ProductsPage,
//   pendingComponent: Loading,
//   errorComponent: ({ error }) => <div>Failed to load: {error.message}</div>,
// });

// const productDetailRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/products/$id',
//   loader: async ({ context, params }) => {
//     await context.queryClient.ensureQueryData({
//       queryKey: productQueryKey(params.id),
//       queryFn: () => fetchProduct(params.id),
//       staleTime: 30_000,
//     });
//     return null;
//   },
//   component: ProductDetailPage,
//   pendingComponent: Loading,
//   errorComponent: ({ error }) => <div>Failed to load: {error.message}</div>,
// });

// export const routeTree = rootRoute.addChildren([
//   indexRoute,
//   productsLayoutRoute.addChildren([productsIndexRoute]),
//   productDetailRoute,
// ]);

// // 3) Hàm factory tạo router khi có context
// export function makeRouter(context: RouterContext) {
//   return createRouter({
//     routeTree,
//     defaultPreload: 'intent',
//     context,
//   });
// }

// // 4) Augment type để devtools + hooks hiểu đúng kiểu router
// declare module '@tanstack/react-router' {
//   interface Register {
//     router: ReturnType<typeof makeRouter>;
//   }
// }

/* Partent mới: Mỗi feature có thể có nhiều route, mỗi route có thể có nhiều cấp con.*/
// src/router.ts
import { createRootRouteWithContext, createRoute, createRouter } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import RootLayout from './layouts/root-layout';

// Context cho loaders
export type RouterContext = { queryClient: QueryClient };

// Root route
const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

// Index route (duy nhất path '/')
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <h1 className="text-xl font-semibold">Welcome</h1>,
});

// Quét tất cả feature routes.tsx và ghép
const modules = import.meta.glob('./features/**/routes.tsx', { eager: true }) as Record<
  string,
  {
    buildRoutes?: (
      root: typeof rootRoute
    ) => ReturnType<typeof createRoute> | ReturnType<typeof createRoute>[];
    default?: (
      root: typeof rootRoute
    ) => ReturnType<typeof createRoute> | ReturnType<typeof createRoute>[];
  }
>;

const featureRoutes = Object.values(modules).flatMap((m) => {
  // chấp nhận m.buildRoutes hoặc m.default
  const build = m.buildRoutes ?? m.default;
  if (typeof build !== 'function') return [];
  const built = build(rootRoute);
  // có thể trả về 1 route hoặc mảng
  return Array.isArray(built) ? built : [built];
});

// Lưu ý: KHÔNG tạo thêm route '/' ở feature để tránh đụng id '/'
export const routeTree = rootRoute.addChildren([indexRoute, ...featureRoutes]);

export function makeRouter(context: RouterContext) {
  return createRouter({ routeTree, defaultPreload: 'intent', context });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof makeRouter>;
  }
}
