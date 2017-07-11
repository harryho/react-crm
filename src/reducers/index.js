import {combineReducers} from 'redux';
import {auth} from './auth';
import {customerReducer} from './customer';

import {orderReducer} from './order';

const reducers = combineReducers({auth, customerReducer, orderReducer})

export default reducers