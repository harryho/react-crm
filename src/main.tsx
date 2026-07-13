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

// Each page route is code-split via React Router's `lazy` route API rather
// than plain React.lazy(): every page module also exports a loader function
// from the same file, and a static top-level import of that loader (the
// React.lazy() + Suspense approach) would still pull the whole page's code
// into this file's chunk, defeating the split entirely. `lazy` dynamically
// imports the Component and its loader together, so nothing loads until the
// route is actually visited.
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

// This app has no real backend - every /api/* route is served by the MSW
// worker below, in every environment. That's why mocking is started
// unconditionally rather than gated to dev: without it, a production build
// has nothing to serve API requests at all.
async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  return worker.start({ onUnhandledRequest: 'bypass' });
}

// createBrowserRouter() kicks off the initial route's loader synchronously,
// at construction time - not when <RouterProvider> renders. Any route with a
// fetch-backed loader would race the MSW worker's startup if the router were
// built up front, so it's built only after mocking is confirmed ready.
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
