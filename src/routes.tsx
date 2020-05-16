import React from 'react';
// import { Route, IndexRoute } from "react-router";
import { Route, BrowserRouter as Router, Link, Switch, Redirect } from 'react-router-dom';
// import App0 from './App';
import NotFoundPage from './containers/NotFoundPage.js';
import FormPage from './containers/FormPage';
// import Dashboard from './containers/DashboardPage';
import App from './containers/App';
import AboutPage from './containers/AboutPage';
import CustomerListPage from './containers/CustomerListPage';
import SignInPage from './containers/SignInPage';
// import CustomerFormPage from './containers/CustomerFormPage';

// import OrderListPage from './containers/OrderListPage';
// import OrderFormPage from './containers/OrderFormPage';
// import ProductFormPage from './containers/ProductFormPage';
// import ProductListPage from './containers/ProductListPage';


export const routes = (
  <div>
    <Switch>
      {/* <Route exact path="/app" component={App0} /> */}
      <Route path="/" component={App} />
      <Route path="/customers" component={CustomerListPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/login" component={SignInPage} />
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
             <Redirect from="/"     to="/app/dashboard" />
    </Switch>
  </div>
);

// export default getRoutes
