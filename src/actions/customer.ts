import {
  LIST_CUSTOMER,
  GET_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
  NEW_CUSTOMER,
  HttpMethod,
  CustomerActions,
  ApiAction,
  CREATE_CUSTOMER
} from "../store/types";
import { Entity } from "../types";


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

export function createCustomer(result?: TODO) {
  return {
    type: CREATE_CUSTOMER,
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
    payload: result,
    // errorMessage: result?.error
  };
}

export function getAction(action: CustomerActions,
  id = 0, data?: Entity, query?: string): ApiAction {

  switch (action) {
    case NEW_CUSTOMER:
      return {
        type: NEW_CUSTOMER,
        endpoint: 'customers/',
        method: HttpMethod.GET,
      }
    case GET_CUSTOMER:
      return {
        type: GET_CUSTOMER,
        endpoint: 'customers/' + id,
        method: HttpMethod.GET,
      }
    case LIST_CUSTOMER:
      return {
        type: LIST_CUSTOMER,
        endpoint: `customers?_embed=orders&${query}`,
        method: HttpMethod.GET,
      }
    case UPDATE_CUSTOMER:
      return {
        type: UPDATE_CUSTOMER,
        endpoint: 'customers/',
        method: HttpMethod.PUT,
        data
      }
    case CREATE_CUSTOMER:
      return {
        type: CREATE_CUSTOMER,
        endpoint: 'customers/',
        method: HttpMethod.POST,
        data
      }
    case DELETE_CUSTOMER:
      return {
        type: DELETE_CUSTOMER,
        endpoint: 'customers/' + id,
        method: HttpMethod.DELETE,

      }
  }

}
