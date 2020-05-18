import {
  LIST_ORDER,
  GET_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  NEW_ORDER,
  HttpMethod,
  OrderActions,
  ApiAction,
  CREATE_ORDER
} from "../store/types";
import { Entity } from "../types";


export function listOrders(result?: TODO) {
  return {
    type: LIST_ORDER,
    payload: result
  }
}

export function getOrder(result?: TODO) {
  return {
    type: GET_ORDER,
    payload: result
  }
}

export function createOrder(result?: TODO) {
  return {
    type: CREATE_ORDER,
    payload: result
  }
}

export function updateOrder(result?: TODO) {
  return {
    type: UPDATE_ORDER,
    payload: result
  }
}

export function deleteOrder(id) {

  return {
    type: DELETE_ORDER,
    payload: id
  }
}

export function newOrder(result?: TODO) {
  return {
    type: NEW_ORDER,
    payload: result,
    // errorMessage: result?.error
  };
}

export function getAction(action: OrderActions,
  id = 0, data?: Entity, query?: string): ApiAction {

  switch (action) {
    case NEW_ORDER:
      return {
        type: NEW_ORDER,
        endpoint: 'orders/',
        method: HttpMethod.GET,
      }
    case GET_ORDER:
      return {
        type: GET_ORDER,
        endpoint: 'orders/' + id,
        method: HttpMethod.GET,
      }
    case LIST_ORDER:
      return {
        type: LIST_ORDER,
        endpoint: 'orders/',
        method: HttpMethod.GET,
      }
    case UPDATE_ORDER:
      return {
        type: UPDATE_ORDER,
        endpoint: 'orders/',
        method: HttpMethod.PUT,
        data
      }
    case CREATE_ORDER:
      return {
        type: CREATE_ORDER,
        endpoint: 'orders/',
        method: HttpMethod.POST,
        data
      }
    case DELETE_ORDER:
      return {
        type: DELETE_ORDER,
        endpoint: 'orders/' + id,
        method: HttpMethod.DELETE,

      }
  }

}
