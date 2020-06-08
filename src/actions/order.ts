import {
  LIST_ORDER,
  GET_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  NEW_ORDER,
  HttpMethod,
  OrderActions,
  ApiAction,
  CREATE_ORDER,
  LIST_CATEGORY,
  LIST_PRODUCT,
  EDIT_ORDER,
  QActions
} from "../store/types";
import { Entity } from "../types";


export function listOrder(result?: TODO) {
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
  };
}

export function editOrder(result?: TODO) {
  return {
    type: EDIT_ORDER,
    payload: result,
  };
}

export function getAction(action: OrderActions,
  id = 0, data?: Entity, query?: string): ApiAction | QActions {

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
        endpoint: 'orders/' + id + "?_expand=customer",
        method: HttpMethod.GET,
      }
    case EDIT_ORDER:
      const actions = {
        order: {
          type: GET_ORDER,
          endpoint: "orders/" + id + "?_expand=customer",
          method: HttpMethod.GET,
        },
        categoryList: {
          type: LIST_CATEGORY,
          endpoint: "categories/",
          method: HttpMethod.GET,
        },
        productList: {
          type: LIST_PRODUCT,
          endpoint: "products?_expand=category",
          method: HttpMethod.GET,
        },
      };
      return {
        type: EDIT_ORDER,
        actions,
        method: HttpMethod.GET,
        // response: { product: {} as Entity, categoryList: [] },
      };
    case LIST_ORDER:
      return {
        type: LIST_ORDER,
        endpoint: `orders?_expand=customer&${query}`,
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
