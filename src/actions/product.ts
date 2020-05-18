import {
  LIST_PRODUCT,
  GET_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  NEW_PRODUCT,
  HttpMethod,
  ProductActions,
  ApiAction,
  CREATE_PRODUCT
} from "../store/types";
import { Entity } from "../types";


export function listProduct(result?: TODO) {
  return {
    type: LIST_PRODUCT,
    payload: result
  }
}

export function getProduct(result?: TODO) {
  return {
    type: GET_PRODUCT,
    payload: result
  }
}

export function createProduct(result?: TODO) {
  return {
    type: CREATE_PRODUCT,
    payload: result
  }
}

export function updateProduct(result?: TODO) {
  return {
    type: UPDATE_PRODUCT,
    payload: result
  }
}

export function deleteProduct(id) {

  return {
    type: DELETE_PRODUCT,
    payload: id
  }
}

export function newProduct(result?: TODO) {
  return {
    type: NEW_PRODUCT,
    payload: result,
    // errorMessage: result?.error
  };
}

export function getAction(action: ProductActions,
  id = 0, data?: Entity, query?: string): ApiAction {

  switch (action) {
    case NEW_PRODUCT:
      return {
        type: NEW_PRODUCT,
        endpoint: 'products/',
        method: HttpMethod.GET,
      }
    case GET_PRODUCT:
      return {
        type: GET_PRODUCT,
        endpoint: 'products/' + id,
        method: HttpMethod.GET,
      }
    case LIST_PRODUCT:
      return {
        type: LIST_PRODUCT,
        endpoint: 'products/',
        method: HttpMethod.GET,
      }
    case UPDATE_PRODUCT:
      return {
        type: UPDATE_PRODUCT,
        endpoint: 'products/',
        method: HttpMethod.PUT,
        data
      }
    case CREATE_PRODUCT:
      return {
        type: CREATE_PRODUCT,
        endpoint: 'products/',
        method: HttpMethod.POST,
        data
      }
    case DELETE_PRODUCT:
      return {
        type: DELETE_PRODUCT,
        endpoint: 'products/' + id,
        method: HttpMethod.DELETE,

      }
  }

}
