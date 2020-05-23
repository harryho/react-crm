import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import configureStore from "./store";



import './styles.scss';

require("./favicon.ico");
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>

         <Router>{routes}</Router>

  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
