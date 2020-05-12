import { CALL_API, callApi } from "../middleware/api";
// import {
//   LOAD_CUSTOMERS_REQUEST,

//   GET_CUSTOMER_REQUEST,
//   GET_CUSTOMER_SUCCESS,
//   GET_CUSTOMER_FAILURE,
//   UPDATE_CUSTOMER_REQUEST,
//   UPDATE_CUSTOMER_SUCCESS,
//   UPDATE_CUSTOMER_FAILURE,
//   ADD_CUSTOMER_REQUEST,
//   ADD_CUSTOMER_SUCCESS,
//   ADD_CUSTOMER_FAILURE,
//   DELETE_CUSTOMER_REQUEST,
//   DELETE_CUSTOMER_SUCCESS,
//   DELETE_CUSTOMER_FAILURE,
//   NEW_CUSTOMER_REQUEST
// } from "../constants";
import {
  CusomerActionTypes, LOAD_CUSTOMERS_SUCCESS,
  LOAD_CUSTOMERS_FAILURE,
} from "./types";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

// Customer actions

// export function loadCustomers(filters?:TODO) {
//   return {
//     [CALL_API]: {
//       endpoint: "customers/",
//       customers: [],
//       filters: filters,
//       types: [
//         LOAD_CUSTOMERS_REQUEST,
//         LOAD_CUSTOMERS_SUCCESS,
//         LOAD_CUSTOMERS_FAILURE
//       ]
//     }

//   };
// }


export function listCustomers(result?: TODO) {
  return {
    type: LOAD_CUSTOMERS_SUCCESS,
    payload: result
  }
}

// export function getCustomer(id) {
//   return {
//     [CALL_API]: {
//       endpoint: `customers/${id}`,
//       customer: {},
//       types: [GET_CUSTOMER_REQUEST, GET_CUSTOMER_SUCCESS, GET_CUSTOMER_FAILURE]
//     }
//   };
// }

// export function updateCustomer(customer) {
//   return {
//     [CALL_API]: {
//       endpoint: `customers/${customer.id}`,
//       data: customer,
//       method: "PUT",
//       authenticated: true,
//       updateSuccess: false,
//       types: [
//         UPDATE_CUSTOMER_REQUEST,
//         UPDATE_CUSTOMER_SUCCESS,
//         UPDATE_CUSTOMER_FAILURE
//       ]
//     }
//   };
// }

// export function addCustomer(customer) {
//   return {
//     [CALL_API]: {
//       endpoint: `customers/`,
//       data: customer,
//       method: "POST",
//       authenticated: true,
//       addSuccess: false,
//       types: [ADD_CUSTOMER_REQUEST, ADD_CUSTOMER_SUCCESS, ADD_CUSTOMER_FAILURE]
//     }
//   };
// }

export function deleteCustomer(id) {

  return {
    type: LOAD_CUSTOMERS_SUCCESS,
    payload: ""
  }
}

// export function newCustomer() {
//   return {
//     type: NEW_CUSTOMER_REQUEST
//   };
// }
