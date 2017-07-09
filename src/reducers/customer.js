import { 
  CUSTOMERS_REQUEST, CUSTOMERS_SUCCESS, CUSTOMERS_FAILURE,
  CUSTOMER_REQUEST, CUSTOMER_SUCCESS, CUSTOMER_FAILURE,
  UPDATE_CUSTOMER_REQUEST, UPDATE_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAILURE,
  ADD_CUSTOMER_REQUEST, ADD_CUSTOMER_SUCCESS, ADD_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAILURE,

  UPDATE_CUSTOMER_RESET, ADD_CUSTOMER_RESET, DELETE_CUSTOMER_RESET
} from '../constants';
// import { CALL_API } from '../middleware/api'


export function loadCustomers(state = {
    isFetching: false,
    customerList: [],
    authenticated: localStorage.getItem('token') ? true : false,
    
  }, action) {
  switch (action.type) {
    case CUSTOMERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        filters: action.filters
      })
    case CUSTOMERS_SUCCESS:

      return Object.assign({}, state, {
        isFetching: false,
        customerList: JSON.parse(action.response).filter( (e) => {
          if (action.filters){
          if (action.filters.firstName && action.filters.lastName)
              return (e.firstName.indexOf(action.filters.firstName)> -1
              && e.lastName.indexOf(action.filters.lastName)> -1 )
            else  if (action.filters.firstName )
            return(e.firstName.indexOf(action.filters.firstName)> -1)
            else  if ( action.filters.lastName)
            return ( e.lastName.indexOf(action.filters.lastName)> -1 )
          }          
          return true;
        }) 
      })
    case CUSTOMERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
    default:
      return state
  }
}


export function getCustomer (state = {
    isFetching: false,
    customer:{},
    authenticated: localStorage.getItem('token') ? true : false,
  }, action) {
  switch (action.type) {
    case CUSTOMER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        authenticated: action.authenticated || false
      })
    case CUSTOMER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        customer: JSON.parse(action.response),
        authenticated: action.authenticated || false
      })
    case CUSTOMER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
      
    default:
      return state
  }
}

export function updateCustomer (state = {
    isFetching: false,
    authenticated: localStorage.getItem('token') ? true : false,
    updateSuccess: false,
    updateError: null
  }, action) {
  switch (action.type) {
    case UPDATE_CUSTOMER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case UPDATE_CUSTOMER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        // customer:{},
        // customer: customer,
        updateSuccess: true,
        authenticated: action.authenticated || false,
        updateError: null
      })
    case UPDATE_CUSTOMER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        customer:{},
        errorMessage: action.message,
        updateSuccess: false,
        updateError:  action.message
      })
    case UPDATE_CUSTOMER_RESET:
        return Object.assign({}, state, {
                  customer:{},
          isFetching: false,
          updateSuccess: false,
          updateError: null,
          // initSuccess:true
        });
    default:
      return state
  }
}


export function addCustomer (state = {
    isFetching: false,
    authenticated: localStorage.getItem('token') ? true : false,
    addSuccess: false
  }, action) {
  switch (action.type) {
    case ADD_CUSTOMER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ADD_CUSTOMER_SUCCESS:
      // let customer = JSON.parse(action.response);
      // customer.actionDone = true;
      return Object.assign({}, state, {
        isFetching: false,
        // customer: customer,
        addSuccess: true,
        authenticated: action.authenticated || false
      });
    case ADD_CUSTOMER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message,
        addSuccess: false
      });
      case ADD_CUSTOMER_RESET:
        return Object.assign({}, state, {
                  customer:{},
          isFetching: false,
          addSuccess: false,
          // updateSuccess: false,
          // initSuccess:true
        });
    default:
      return state
  }
}
  
export function deleteCustomer (state = {
    isFetching: false,
    authenticated: localStorage.getItem('token') ? true : false,
    deleteSuccess: false
  }, action) {
  switch (action.type) {
    case DELETE_CUSTOMER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case DELETE_CUSTOMER_SUCCESS:
      // let customer = JSON.parse(action.response);
      // customer.actionDone = true;
      return Object.assign({}, state, {
        isFetching: false,
        // customer: customer,
        deleteSuccess: true,
        action:action,
        authenticated: action.authenticated || false
      });
    case DELETE_CUSTOMER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message,
        deleteSuccess: false
      });
      case DELETE_CUSTOMER_RESET:
        return Object.assign({}, state, {               
          isFetching: false,
          deleteSuccess: false,
        });
    default:
      return state
  }
}


