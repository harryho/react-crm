import {
  CusomerActionTypes, LIST_CUSTOMER,
  GET_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
  NEW_CUSTOMER
} from "../store/types";


export function listCustomers(result?: TODO) {
  return {
    type: LIST_CUSTOMER,
    payload: result
  }
}

export function getCustomer(result?: TODO) {
  return {
    type: GET_CUSTOMER,
    payload: result
  }
}

export function updateCustomer(result?: TODO) {
  return {
    type: UPDATE_CUSTOMER,
    payload: result
  }
}

export function deleteCustomer(id) {

  return {
    type: DELETE_CUSTOMER,
    payload: id
  }
}

export function newCustomer(result?: TODO) {
  return {
    type: NEW_CUSTOMER,
    payload: result?.data,
    errorMessage: result?.error
  };
}
