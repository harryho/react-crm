// import {
//   LOAD_CUSTOMERS_REQUEST,
//   // LOAD_CUSTOMERS,
//   // LOAD_CUSTOMERS_FAILURE,
//   GET_CUSTOMER_REQUEST,
//   GET_CUSTOMER,
//   GET_CUSTOMER_FAILURE,
//   UPDATE_CUSTOMER_REQUEST,
//   UPDATE_CUSTOMER,
//   UPDATE_CUSTOMER_FAILURE,
//   ADD_CUSTOMER_REQUEST,
//   ADD_CUSTOMER,
//   ADD_CUSTOMER_FAILURE,
//   DELETE_CUSTOMER_REQUEST,
//   DELETE_CUSTOMER,
//   DELETE_CUSTOMER_FAILURE,
//   NEW_CUSTOMER_REQUEST
// } from "../constants";


import {
  CustomerState, CusomerActionTypes, 
  ADD_CUSTOMER,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  GET_CUSTOMER,
  LIST_CUSTOMER
} from '../store/types';
import { Entity } from '../types';

export function customerReducer(
  state: CustomerState = {
    isFetching: false,
    customer: {} as Entity,
    customerList: []
  },
  action: CusomerActionTypes
) {
  console.log(action)
  switch (action.type) {
    // case LOAD_CUSTOMERS_REQUEST:
    //   return Object.assign({}, state, {
    //     isFetching: true,
    //     filters: null // action.filters
    //   });
    case LIST_CUSTOMER:
      debugger;
      return Object.assign({}, state, {
        isFetching: false,
        customerList: action.payload,
        // ? JSON.parse(action.payload).filter(e => {
        //     if (action.filters) {
        //       if (action.filters.firstName && action.filters.lastName)
        //         return (
        //           e.firstName.indexOf(action.filters.firstName) > -1 &&
        //           e.lastName.indexOf(action.filters.lastName) > -1
        //         );
        //       else if (action.filters.firstName)
        //         return e.firstName.indexOf(action.filters.firstName) > -1;
        //       else if (action.filters.lastName)
        //         return e.lastName.indexOf(action.filters.lastName) > -1;
        //     }
        //     return true"error";
        //   })
        // : [],

      });
    // case LOAD_CUSTOMERS_FAILURE:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     errorMessage:  action.payload // action.message
    //   });
    // case GET_CUSTOMER_REQUEST:
    //   return Object.assign({}, state, {
    //     isFetching: true,
    //     authenticated: action.authenticated || false
    //   });
    case GET_CUSTOMER:
      return Object.assign({}, state, {
        isFetching: false,
        customer: action.payload,
        errorMessage: action.error
      });
    // case GET_CUSTOMER_FAILURE:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     errorMessage: action.message
    //   });
    // case UPDATE_CUSTOMER_REQUEST:
    //   return Object.assign({}, state, {
    //     isFetching: true
    //   });
    case UPDATE_CUSTOMER:
      return Object.assign({}, state, {
        isFetching: false,
        customer: action.payload,
        errorMessage: action.error
      });
    // case UPDATE_CUSTOMER_FAILURE:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     customer: {},
    //     errorMessage: action.error.statusText || action.error.status,
    //     updateSuccess: false,
    //     updateError: action.message
    //   });
    // case NEW_CUSTOMER_REQUEST:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     customer: {},
    //     errorMessage: action.message
    //   });
    // case ADD_CUSTOMER_REQUEST:
    //   return Object.assign({}, state, {
    //     isFetching: true
    //   });
    // case ADD_CUSTOMER:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     addSuccess: true,
    //     authenticated: action.authenticated || false
    //   });
    // case ADD_CUSTOMER_FAILURE:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     errorMessage: action.error.statusText || action.error.status,
    //     addSuccess: false
    //   });
    // case DELETE_CUSTOMER_REQUEST:
    //   return Object.assign({}, state, {
    //     isFetching: true
    //   });
    case DELETE_CUSTOMER:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error
        
      });
    // case DELETE_CUSTOMER_FAILURE:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     errorMessage: action.error.statusText || action.error.status,
    //     deleteSuccess: false
    //   });
    default:
      return state;
  }
}
