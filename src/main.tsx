import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import App from './App';
import Layout from './layouts/Dashboard';
import ProductsView, { productsLoader } from './pages/ProductsView';
import ProductForm, { productFormLoader } from './pages/ProductForm';
import OrdersView, { ordersLoader } from './pages/OrdersView';
import OrderDetailView, { orderDetailLoader } from './pages/OrderDetailView';
import { OverviewAnalyticsView } from './pages/OverviewAnalyticsView';
import { BlogView } from './pages/BlogView';
import { NotFoundView } from './pages/NotFoundView';
import { HelmetProvider } from 'react-helmet-async';
import { AgentView } from './pages/AgentView';
import { UsersView, usersLoader } from './pages/UsersView';
import AgentForm , { agentLoader  }from './pages/AgentForm';
import SignInView from './pages/SignInView';
import UserForm , { userLoader  } from './pages/UserForm';
import CartView, { cartLoader } from './pages/CartView';
import CheckoutView, { checkoutLoader } from './pages/CheckoutView';
import InventoryView, { inventoryLoader } from './pages/InventoryView';
import { CartProvider } from './contexts/CartContext';


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
              Component: OverviewAnalyticsView,
            },
            {
              path: 'orders',
              Component: OrdersView,
              loader: ordersLoader,
            },
            {
              path: 'orders/:id',
              Component: OrderDetailView,
              loader: orderDetailLoader,
            },
            {
              path: 'products',
              Component: ProductsView,
              loader: productsLoader,
            },
            {
              path: 'product-form',
              Component: ProductForm,
              loader: productFormLoader,
            },
            {
              path: 'edit-product/:id',
              Component: ProductForm,
              loader: productFormLoader,
            },
            {
              path: 'users',
              Component: UsersView,
              loader: usersLoader,
            },
            {
              path: 'blogs',
              Component: BlogView,
            },
            {
              path: 'agents',
              Component: AgentView,
            },
            {
              path: 'agent-form',
              Component: AgentForm,
            },
            {
              path: 'edit-agent/:id',
              Component: AgentForm,
              loader: agentLoader

            },
            {
              path: 'user-form',
              Component: UserForm,
            },
            {
              path: 'edit-user/:id',
              Component: UserForm,
              loader: userLoader

            },
            {
              path: 'cart',
              Component: CartView,
              loader: cartLoader,
            },
            {
              path: 'checkout',
              Component: CheckoutView,
              loader: checkoutLoader,
            },
            {
              path: 'inventory',
              Component: InventoryView,
              loader: inventoryLoader,
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

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }
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
