import { CALL_API } from '../middleware/api'
import {  
  ORDERS_REQUEST, ORDERS_SUCCESS, ORDERS_FAILURE,
  ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILURE,
  UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILURE,
  ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, ADD_ORDER_FAILURE,
  DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILURE,

  UPDATE_ORDER_RESET, ADD_ORDER_RESET, DELETE_ORDER_RESET
} from '../constants'



// Order actions

export function loadOrders(filters) {
  return {
    [CALL_API]: {
      endpoint: 'orders?_expand=customer',
      orders:[],
      filters:filters,
      types: [ORDERS_REQUEST, ORDERS_SUCCESS, ORDERS_FAILURE]
    }
  }
}

export function getOrder(id) {
  return {
    [CALL_API]: {
      endpoint: `orders/${id}?_expand=customer`,
      order:{},
      types: [ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILURE]
    }
  }
}

export function updateOrder(order) {
  return {
    [CALL_API]: {
      endpoint: `orders/${order.id}`,
      data: order,
      method: 'PUT',
      authenticated: true,
      updateSuccess: false,
      types: [UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILURE]
    }
  }
}

export function addOrder(order) {
  return {
    [CALL_API]: {
      endpoint: `orders`,
      data: order,
      method: 'POST',
      authenticated: true,
      addSuccess: false,
      types: [ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, ADD_ORDER_FAILURE]
    }
  }
}

export function deleteOrder(id) {
  return {
    [CALL_API]: {
      endpoint: `orders/${id}`,
      method: 'DELETE',
      authenticated: true,
      types: [DELETE_ORDER_REQUEST, 
      DELETE_ORDER_SUCCESS,
      //  [ORDERS_REQUEST, ORDERS_SUCCESS, ORDERS_FAILURE],
       DELETE_ORDER_FAILURE]
    }
  }
}

export function resetUpdate(){
  return { type:  UPDATE_ORDER_RESET }
}

export function resetAdd(){
  return { type:  ADD_ORDER_RESET  }
}

export function resetDelete(){
  return { type:  DELETE_ORDER_RESET  }
}

