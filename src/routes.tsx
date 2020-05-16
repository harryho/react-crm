import React from 'react';
// import { Route, IndexRoute } from "react-router";
import { Route, BrowserRouter as Router, Link, Switch, Redirect } from 'react-router-dom';
// import App0 from './App';
import NotFoundPage from './pages/NotFoundPage.js';
import FormPage from './pages/FormPage';
// import Dashboard from './pages/DashboardPage';
import App from './pages/App';
import AboutPage from './pages/AboutPage';
import CustomerListPage from './pages/CustomerListPage';
import SignInPage from './pages/SignInPage';
// import CustomerFormPage from './pages/CustomerFormPage';

// import OrderListPage from './pages/OrderListPage';
// import OrderFormPage from './pages/OrderFormPage';
// import ProductFormPage from './pages/ProductFormPage';
// import ProductListPage from './pages/ProductListPage';


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
