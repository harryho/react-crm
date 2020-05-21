import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import configureStore from "./store";


// import './index.css';

import './styles.scss';

import ThemeDefault from './theme-default';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';

require("./favicon.ico");
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    {/* <MuiThemeProvider theme={ThemeDefault}><CssBaseline /> */}

         <Router>{routes}</Router>

    {/* </MuiThemeProvider> */}
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();

// import App from './App';
// import { Provider } from "react-redux";
// import configureStore from "./store";

// const store = configureStore();

// const Root = () => (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// ReactDOM.render(<Root />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

/* eslint-disable import/default */
