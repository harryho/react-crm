import {
  LOAD_CUSTOMERS_REQUEST,
  LOAD_CUSTOMERS_SUCCESS,
  LOAD_CUSTOMERS_FAILURE,
  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAILURE,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE,
  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE,
  NEW_CUSTOMER_REQUEST
} from "../constants";

export function customerReducer(
  state = {
    isFetching: false,
    customerList: [],
    authenticated: localStorage.getItem("token") ? true : false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    updateSuccess: false,
    addSuccess: false,
    deleteSuccess: false,
    errorMessage: null
  },
  action
) {
  switch (action.type) {
    case LOAD_CUSTOMERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        filters: action.filters
      });
    case LOAD_CUSTOMERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        customerList: action.response
          ? JSON.parse(action.response).filter(e => {
              if (action.filters) {
                if (action.filters.firstName && action.filters.lastName)
                  return (
                    e.firstName.indexOf(action.filters.firstName) > -1 &&
                    e.lastName.indexOf(action.filters.lastName) > -1
                  );
                else if (action.filters.firstName)
                  return e.firstName.indexOf(action.filters.firstName) > -1;
                else if (action.filters.lastName)
                  return e.lastName.indexOf(action.filters.lastName) > -1;
              }
              return true;
            })
          : [],
        updateSuccess: false,
        addSuccess: false,
        deleteSuccess: false,
        errorMessage: null
      });
    case LOAD_CUSTOMERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    case GET_CUSTOMER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        authenticated: action.authenticated || false
      });
    case GET_CUSTOMER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        customer: JSON.parse(action.response),
        authenticated: action.authenticated || false
      });
    case GET_CUSTOMER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    case UPDATE_CUSTOMER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case UPDATE_CUSTOMER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        updateSuccess: true,
        authenticated: action.authenticated || false,
        updateError: null
      });
    case UPDATE_CUSTOMER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        customer: {},
        errorMessage: action.error.statusText || action.error.status,
        updateSuccess: false,
        updateError: action.message
      });
    case NEW_CUSTOMER_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
        customer: {},
        errorMessage: action.message
      });
    case ADD_CUSTOMER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ADD_CUSTOMER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        addSuccess: true,
        authenticated: action.authenticated || false
      });
    case ADD_CUSTOMER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error.statusText || action.error.status,
        addSuccess: false
      });
    case DELETE_CUSTOMER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case DELETE_CUSTOMER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        // customer: customer,
        deleteSuccess: true,
        action: action,
        authenticated: action.authenticated || false
      });
    case DELETE_CUSTOMER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error.statusText || action.error.status,
        deleteSuccess: false
      });
    default:
      return state;
  }
}
