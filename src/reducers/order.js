import { 
  ORDERS_REQUEST, ORDERS_SUCCESS, ORDERS_FAILURE,
  
  ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILURE,
  UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILURE,
  ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, ADD_ORDER_FAILURE,
  DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILURE,

  UPDATE_ORDER_RESET, DELETE_ORDER_RESET, ADD_ORDER_RESET
} from '../constants';
// import { CALL_API } from '../middleware/api'


export function loadOrders(state = {
    isFetching: false,
    orderList: [],
    authenticated: localStorage.getItem('token') ? true : false,
  }, action) {
  switch (action.type) {
    case ORDERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        filters: action.filters
      })
    case ORDERS_SUCCESS:

      return Object.assign({}, state, {
        isFetching: false,
        orderList: JSON.parse(action.response).filter( (e) => {
          if (action.filters){
          if (action.filters.product)
            return ( e.product.indexOf(action.filters.product)> -1 )
          }          
          return true;
        }),
        // orders: JSON.parse(action.response),
        authenticated: action.authenticated || false
      })
    case ORDERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
    default:
      return state
  }
}


export function getOrder (state = {
    isFetching: false,
    order:{},
    authenticated: localStorage.getItem('token') ? true : false,
  }, action) {
  switch (action.type) {
    case ORDER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        authenticated: action.authenticated || false
      })
    case ORDER_SUCCESS:

      return Object.assign({}, state, {
        isFetching: false,
        order: JSON.parse(action.response), 
        authenticated: action.authenticated || false
      })
    case ORDER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
      
    default:
      return state
  }
}

export function updateOrder (state = {
    isFetching: false,
    authenticated: localStorage.getItem('token') ? true : false,
    updateSuccess: false
  }, action) {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case UPDATE_ORDER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        // order:{},
        // order: order,
        updateSuccess: true,
        authenticated: action.authenticated || false
      })
    case UPDATE_ORDER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        order:{},
        errorMessage: action.message,
        updateSuccess: false
      })
    case UPDATE_ORDER_RESET:
        return Object.assign({}, state, {
                  order:{},
          isFetching: false,
          // addSuccess: false,
          updateSuccess: false,
          // initSuccess:true
        });
    default:
      return state
  }
}


export function addOrder (state = {
    isFetching: false,
    authenticated: localStorage.getItem('token') ? true : false,
    addSuccess: false
  }, action) {
  switch (action.type) {
    case ADD_ORDER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ADD_ORDER_SUCCESS:
      // let order = JSON.parse(action.response);
      // order.actionDone = true;
      return Object.assign({}, state, {
        isFetching: false,
        // order: order,
        addSuccess: true,
        authenticated: action.authenticated || false
      });
    case ADD_ORDER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message,
        addSuccess: false
      });
      case ADD_ORDER_RESET:
        return Object.assign({}, state, {
                  order:{},
          isFetching: false,
          addSuccess: false,
          // updateSuccess: false,
          // initSuccess:true
        });
    default:
      return state
  }
}
  
export function deleteOrder (state = {
    isFetching: false,
    authenticated: localStorage.getItem('token') ? true : false,
    deleteSuccess: false
  }, action) {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case DELETE_ORDER_SUCCESS:
      // let order = JSON.parse(action.response);
      // order.actionDone = true;
      return Object.assign({}, state, {
        isFetching: false,
        // order: order,
        deleteSuccess: true,
        action:action,
        authenticated: action.authenticated || false
      });
    case DELETE_ORDER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message,
        deleteSuccess: false
      });
      case DELETE_ORDER_RESET:
        return Object.assign({}, state, {               
          isFetching: false,
          deleteSuccess: false,
        });
    default:
      return state
  }
}


