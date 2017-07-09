import { combineReducers } from 'redux';
import  {auth} from './auth';
import  {
    loadCustomers, getCustomer, updateCustomer, addCustomer,deleteCustomer
} from './customer';

import  {
     loadOrders, getOrder, updateOrder, addOrder,deleteOrder
} from './order';

const reducers = combineReducers({
    auth,
    loadCustomers,
    getCustomer,
    updateCustomer,
    addCustomer,
    deleteCustomer,

    loadOrders,
    getOrder,
    updateOrder,
    addOrder,
    deleteOrder

})

export default reducers