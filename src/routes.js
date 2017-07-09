import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
// import LoginPage from './containers/LoginPage';
import FormPage from './containers/FormPage';
// import TablePage from './containers/TablePage';
import Dashboard from './containers/DashboardPage';
// import ReduxFormPage from './containers/ReduxFormPage';
import AboutPage from './containers/AboutPage';
// import LoginPage from './containers/LoginPage';
import CustomerListPage from './containers/CustomerListPage';
import CustomerFormPage from './containers/CustomerFormPage';

import OrderListPage from './containers/OrderListPage';
import OrderFormPage from './containers/OrderFormPage';

export default (
  <Route>
    {/*<Route path="login" component={LoginPage}/>*/}
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="form" component={FormPage}/>
      <Route path="customer" component={CustomerFormPage}/>
      <Route path="customer/:id" component={CustomerFormPage}/>
      <Route path="order" component={OrderFormPage}/>
      <Route path="order/:id" component={OrderFormPage}/>
      {/*<Route path="table" component={TablePage}/>*/}
      <Route path="customers" component={CustomerListPage}/>
            <Route path="orders" component={OrderListPage}/>
      {/*<Route path="reduxform" component={ReduxFormPage}/>*/}
      <Route path="about" component={AboutPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
