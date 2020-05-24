import {
  CustomerState, CustomerActionTypes,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  GET_CUSTOMER,
  LIST_CUSTOMER,
  NEW_CUSTOMER
} from '../store/types';
import { Customer, CustomerModel } from '../types';

export function customerReducer(
  state: CustomerState = {
    isFetching: true,
    customer: new CustomerModel() as Customer, 
    customerList: [],
    deleted: false,
    updated: false,
  },
  action: CustomerActionTypes
) {
  
  switch (action.type) {
    case LIST_CUSTOMER:
      return Object.assign({}, state, {
        isFetching: false,
        customerList: action.payload,
        errorMessage: "",
        deleted: false

      });
    case NEW_CUSTOMER:
      return Object.assign({}, state, {
        isFetching: false,
        customer: action.payload, 
        errorMessage: action.error,
        deleted: false,
        updated: false,
      });
    case GET_CUSTOMER:
      return Object.assign({}, state, {
        isFetching: false,
        customer: action.payload,
        errorMessage: action.error,
        deleted: false,
        updated: false
      });
    case CREATE_CUSTOMER:
    case UPDATE_CUSTOMER:
      return Object.assign({}, state, {
        isFetching: false,
        customer: action.payload,
        errorMessage: action.error,
        deleted: false,
        updated: true
      });
    case DELETE_CUSTOMER:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error,
        deleted: !action.error && action.payload ? true : false,
        updated: false
      });

    default:
      return state;
  }
}
