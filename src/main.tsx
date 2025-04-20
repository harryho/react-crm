import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Layout from './layouts/Dashboard';
import ProductsView from './pages/ProductsView';
import OrdersView from './pages/OrdersView';
import { OverviewAnalyticsView } from './pages/OverviewAnalyticsView';
import { BlogView } from './pages/BlogView';
import { NotFoundView } from './pages/NotFoundView';
import { HelmetProvider } from 'react-helmet-async';
import { AgentView } from './pages/AgentView';
import { CustomerView } from './pages/CustomerView';
import AgentForm , { agentLoader  }from './pages/AgentForm';
import SignInView from './pages/SignInView';
import CustomerForm , { customerLoader  } from './pages/CustomerForm';
import OrderForm , {orderLoader} from './pages/OrderForm';


const router = createBrowserRouter([
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
          },
          {
            path: 'products',
            Component: ProductsView,
          },
          {
            path: 'customers',
            Component: CustomerView,
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
            path: 'customer-form',
            Component: CustomerForm,
          },
          {
            path: 'edit-customer/:id',
            Component: CustomerForm,
            loader: customerLoader

          },
          {
            path: 'order-form',
            Component: OrderForm,
          },
          {
            path: 'edit-order/:id',
            Component: OrderForm,
            loader: orderLoader

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




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider >
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
