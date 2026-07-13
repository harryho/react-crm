import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import App from './App';
import Layout from './layouts/Dashboard';
import { NotFoundView } from './pages/NotFoundView';
import { HelmetProvider } from 'react-helmet-async';
import SignInView from './pages/SignInView';
import { CartProvider } from './contexts/CartContext';

// ponytail: each route uses React Router's `lazy` (not React.lazy + Suspense) so a static import of a page's loader wouldn't pull its component into this chunk. `lazy` loads Component + loader together on first visit.
function createRouter() {
  return createBrowserRouter([
    {
      Component: App,
      children: [
        {
          path: '',
          Component: Layout,
          children: [
            {
              path: '',
              lazy: () =>
                import('./pages/OverviewAnalyticsView').then((mod) => ({
                  Component: mod.OverviewAnalyticsView,
                  loader: mod.analyticsLoader,
                })),
            },
            {
              path: 'orders',
              lazy: () =>
                import('./pages/OrdersView').then((mod) => ({
                  Component: mod.default,
                  loader: mod.ordersLoader,
                })),
            },
            {
              path: 'orders/:id',
              lazy: () =>
                import('./pages/OrderDetailView').then((mod) => ({
                  Component: mod.default,
                  loader: mod.orderDetailLoader,
                })),
            },
            {
              path: 'products',
              lazy: () =>
                import('./pages/ProductsView').then((mod) => ({
                  Component: mod.default,
                  loader: mod.productsLoader,
                })),
            },
            {
              path: 'product-form',
              lazy: () =>
                import('./pages/ProductForm').then((mod) => ({
                  Component: mod.default,
                  loader: mod.productFormLoader,
                })),
            },
            {
              path: 'edit-product/:id',
              lazy: () =>
                import('./pages/ProductForm').then((mod) => ({
                  Component: mod.default,
                  loader: mod.productFormLoader,
                })),
            },
            {
              path: 'users',
              lazy: () =>
                import('./pages/UsersView').then((mod) => ({
                  Component: mod.UsersView,
                  loader: mod.usersLoader,
                })),
            },
            {
              path: 'blogs',
              lazy: () => import('./pages/BlogView').then((mod) => ({ Component: mod.BlogView })),
            },
            {
              path: 'agents',
              lazy: () => import('./pages/AgentView').then((mod) => ({ Component: mod.AgentView })),
            },
            {
              path: 'agent-form',
              lazy: () => import('./pages/AgentForm').then((mod) => ({ Component: mod.default })),
            },
            {
              path: 'edit-agent/:id',
              lazy: () =>
                import('./pages/AgentForm').then((mod) => ({
                  Component: mod.default,
                  loader: mod.agentLoader,
                })),
            },
            {
              path: 'user-form',
              lazy: () => import('./pages/UserForm').then((mod) => ({ Component: mod.default })),
            },
            {
              path: 'edit-user/:id',
              lazy: () =>
                import('./pages/UserForm').then((mod) => ({
                  Component: mod.default,
                  loader: mod.userLoader,
                })),
            },
            {
              path: 'cart',
              lazy: () =>
                import('./pages/CartView').then((mod) => ({
                  Component: mod.default,
                  loader: mod.cartLoader,
                })),
            },
            {
              path: 'checkout',
              lazy: () =>
                import('./pages/CheckoutView').then((mod) => ({
                  Component: mod.default,
                  loader: mod.checkoutLoader,
                })),
            },
            {
              path: 'inventory',
              lazy: () =>
                import('./pages/InventoryView').then((mod) => ({
                  Component: mod.default,
                  loader: mod.inventoryLoader,
                })),
            },
            {
              path: '*',
              Component: NotFoundView
            }
          ]
        },
        {
          path: '/sign-in',
          Component: SignInView
        },
        {
          path: '*',
          Component: NotFoundView
        }
      ],
    },
  ]);
}

// ponytail: MSW is the only thing serving /api/* in every environment, so mocking starts unconditionally - gating it to dev would leave the prod build with no backend.
async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  return worker.start({ onUnhandledRequest: 'bypass' });
}

// ponytail: createBrowserRouter() runs the initial loader synchronously at construction; build the router only after MSW is ready so the first fetch doesn't race the worker.
enableMocking().then(() => {
  const router = createRouter();
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <HelmetProvider >
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
});
