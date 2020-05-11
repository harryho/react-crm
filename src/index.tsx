import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import {
  BrowserRouter as Router, Switch, Route,
} from "react-router-dom";
import {routes }  from "./routes";
import thunkMiddleware from "redux-thunk";
import App from './App';
import api from "./middleware/api";
import reducers from "./reducers";
// import './index.css';
// require("./favicon.ico");
import "./styles.scss";
// import "font-awesome/css/font-awesome.css";
// import "flexboxgrid/css/flexboxgrid.css";


// const browserHistory = createHashHistory()
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(
  createStore
);


const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    {/*<MuiThemeProvider muiTheme={getMuiTheme()}>*/}
    {/* <App /> */}
    <Router>
      {routes}
    {/* <Switch>
      <Route path="/" component={App} />
      </Switch> */}

    </Router>

    {/* <Router>
        {routes}
      </Router> */}
    {/*</MuiThemeProvider>*/}
  </Provider>,
  document.getElementById("root")
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