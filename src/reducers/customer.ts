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
    customer: new CustomerModel() as Customer, // {} as Customer,
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
        // ? JSON.parse(action.payload).filter(e => {
        //     if (action.filters) {
        //       if (action.filters.firstname && action.filters.lastname)
        //         return (
        //           e.firstname.indexOf(action.filters.firstname) > -1 &&
        //           e.lastname.indexOf(action.filters.lastname) > -1
        //         );
        //       else if (action.filters.firstname)
        //         return e.firstname.indexOf(action.filters.firstname) > -1;
        //       else if (action.filters.lastname)
        //         return e.lastname.indexOf(action.filters.lastname) > -1;
        //     }
        //     return true"error";
        //   })
        // : [],

      });
    case NEW_CUSTOMER:
      return Object.assign({}, state, {
        isFetching: false,
        customer: action.payload, // new CustomerModel("","","","","",false,0) as Customer, 
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
      // return Object.assign({}, state, {
      //   isFetching: false,
      //   customer: action.payload,
      //   errorMessage: action.error,
      //   deleted: false,
      //   updated: false
      // });
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
