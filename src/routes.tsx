import React from 'react';
// import { Route, IndexRoute } from "react-router";
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import App from './App';
import NotFoundPage from './containers/NotFoundPage.js';
import FormPage from './containers/FormPage';
// import Dashboard from './containers/DashboardPage';
import AboutPage from './containers/AboutPage';
import CustomerListPage from './containers/CustomerListPage';
// import CustomerFormPage from './containers/CustomerFormPage';

// import OrderListPage from './containers/OrderListPage';
// import OrderFormPage from './containers/OrderFormPage';
// import ProductFormPage from './containers/ProductFormPage';
// import ProductListPage from './containers/ProductListPage';

// export function getRoutes() {
//   return (
//     <div>
//       <Switch>
//         <Route path="/" component={App} />
//         <Route path="dashboard" component={Dashboard} />
//         <Route path="form" component={FormPage} />
//         <Route path="customer" component={CustomerFormPage} />
//         <Route path="customer/:id" component={CustomerFormPage} />
//         <Route path="order" component={OrderFormPage} />
//         <Route path="order/:id" component={OrderFormPage} />
//         <Route path="product" component={ProductFormPage} />
//         <Route path="product/:id" component={ProductFormPage} />
//         <Route path="customers" component={CustomerListPage} />
//         <Route path="orders" component={OrderListPage} />
//         <Route path="products" component={ProductListPage} />
//         <Route path="about" component={AboutPage} />
//         <Route path="*" component={NotFoundPage} />
//       </Switch>
//     </div>
//   );
// }

export const routes = (
  <div>
      <Switch>
        <Route path="/app0" component={App} />
        <Route exact path="/" component={CustomerListPage} />
        <Route exact path="/customers" component={CustomerListPage} />
        <Route path="/about" component={AboutPage} />
        {/* <Route path="dashboard" component={Dashboard} />
        <Route path="form" component={FormPage} />
        <Route path="customer" component={CustomerFormPage} />
        <Route path="customer/:id" component={CustomerFormPage} />
        <Route path="order" component={OrderFormPage} />
        <Route path="order/:id" component={OrderFormPage} />
        <Route path="product" component={ProductFormPage} />
        <Route path="product/:id" component={ProductFormPage} />
        <Route path="orders" component={OrderListPage} />
        <Route path="products" component={ProductListPage} />
      
        <Route path="*" component={NotFoundPage} /> */}
      </Switch>
    </div>
)

// export default getRoutes
