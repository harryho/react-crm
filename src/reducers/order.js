import { 
  LOAD_ORDERS_REQUEST, LOAD_ORDERS_SUCCESS, LOAD_ORDERS_FAILURE,
  
   GET_ORDER_REQUEST,  GET_ORDER_SUCCESS,  GET_ORDER_FAILURE,
  UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILURE,
  ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, ADD_ORDER_FAILURE,
  DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILURE,

  // UPDATE_ORDER_RESET, DELETE_ORDER_RESET, ADD_ORDER_RESET
} from '../constants';

export function orderReducer (state={
  isFetching: false,
  orderList: [],
  isAuthenticated: localStorage.getItem('token') ? true : false,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  updateSuccess: false,
  addSuccess: false,
  deleteSuccess: false,
  errorMessage:null
}, action){
  switch (action.type) {
    case LOAD_ORDERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        filters: action.filters
      })
    case LOAD_ORDERS_SUCCESS:

      return Object.assign({}, state, {
        isFetching: false,
        orderList: JSON.parse(action.response).filter( (e) => {
          if (action.filters){
          if (action.filters.product)
            return ( e.product.indexOf(action.filters.product)> -1 )
          }          
          return true;
        }),
        authenticated: action.authenticated || false,
        updateSuccess: false,
        addSuccess: false,
        deleteSuccess: false,
        errorMessage: null,
      })
    case LOAD_ORDERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
  
    case  GET_ORDER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        authenticated: action.authenticated || false
      })
    case  GET_ORDER_SUCCESS:

      return Object.assign({}, state, {
        isFetching: false,
        order: JSON.parse(action.response), 
        authenticated: action.authenticated || false
      })
    case  GET_ORDER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })

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
        errorMessage: action.error.statusText || action.error.status,
        updateSuccess: false
      })
    case ADD_ORDER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ADD_ORDER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        addSuccess: true,
        authenticated: action.authenticated || false
      });
    case ADD_ORDER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error.statusText || action.error.status,
        addSuccess: false
      });
    case DELETE_ORDER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case DELETE_ORDER_SUCCESS:
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
        deleteSuccess: false,
        errorMessage: action.error.statusText || action.error.status,
      });
    default:
      return state
  }
}
