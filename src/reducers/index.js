import { combineReducers } from 'redux';
import  {auth} from './auth';
import  {
    // loadCustomers, getCustomer, updateCustomer, addCustomer,deleteCustomer
    customerReducer
} from './customer';

    import  {
        //  loadOrders, getOrder, updateOrder, addOrder,deleteOrder
        orderReducer
    } from './order';

const reducers = combineReducers({
    auth,
    // loadCustomers,
    // getCustomer,
    // updateCustomer,
    // addCustomer,
    // deleteCustomer,
    customerReducer,
    // loadOrders,
    // getOrder,
    // updateOrder,
    // addOrder,
    // deleteOrder
    orderReducer

})

export default reducers