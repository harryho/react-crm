/* eslint-disable import/default */

import React from 'react';
// import { combineReducers } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import { reducer as reduxFormReducer } from 'redux-form';
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
require('./favicon.ico');
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

import thunkMiddleware from 'redux-thunk';
import api from './middleware/api'

import reducers from './reducers';


injectTapEventPlugin();


let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);

let store = createStoreWithMiddleware(reducers);


// const showResults = values =>
//   new Promise(resolve => {
//     setTimeout(() => {  // simulate server latency
//       window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
//       resolve()
//     }, 500)
//   })

render(
    <Provider store={store}>
        {/*<MuiThemeProvider muiTheme={getMuiTheme()}>*/}
        <Router routes={routes} history={browserHistory} />
        {/*</MuiThemeProvider>*/}     
    </Provider>, 
    // <App />
    document.getElementById('root')
);
