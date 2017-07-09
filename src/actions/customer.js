import { CALL_API } from '../middleware/api'
import {  
  CUSTOMERS_REQUEST, CUSTOMERS_SUCCESS, CUSTOMERS_FAILURE,
  CUSTOMER_REQUEST, CUSTOMER_SUCCESS, CUSTOMER_FAILURE,
  UPDATE_CUSTOMER_REQUEST, UPDATE_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAILURE,
  ADD_CUSTOMER_REQUEST, ADD_CUSTOMER_SUCCESS, ADD_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAILURE,

  UPDATE_CUSTOMER_RESET, ADD_CUSTOMER_RESET, DELETE_CUSTOMER_RESET
} from '../constants'



// Customer actions

export function loadCustomers(filters) {
  return {
    [CALL_API]: {
      endpoint: 'customers',
      customers:[],
      filters:filters,
      types: [CUSTOMERS_REQUEST, CUSTOMERS_SUCCESS, CUSTOMERS_FAILURE]
    }
  }
}

export function getCustomer(id) {
  return {
    [CALL_API]: {
      endpoint: `customers/${id}`,
      customer:{},
      types: [CUSTOMER_REQUEST, CUSTOMER_SUCCESS, CUSTOMER_FAILURE]
    }
  }
}

export function updateCustomer(customer) {
  return {
    [CALL_API]: {
      endpoint: `customers/${customer.id}`,
      data: customer,
      method: 'PUT',
      authenticated: true,
      updateSuccess: false,
      types: [UPDATE_CUSTOMER_REQUEST, UPDATE_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAILURE]
    }
  }
}

export function addCustomer(customer) {
  return {
    [CALL_API]: {
      endpoint: `customers`,
      data: customer,
      method: 'POST',
      authenticated: true,
      addSuccess: false,
      types: [ADD_CUSTOMER_REQUEST, ADD_CUSTOMER_SUCCESS, ADD_CUSTOMER_FAILURE]
    }
  }
}

export function deleteCustomer(id) {
  return {
    [CALL_API]: {
      endpoint: `customers/${id}`,
      method: 'DELETE',
      authenticated: true,
      types: [DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAILURE]
    }
  }
}

export function resetUpdate(){
  return { type:  UPDATE_CUSTOMER_RESET }
}

export function resetAdd(){
  return { type:  ADD_CUSTOMER_RESET  }
}

export function resetDelete(){
  return { type:  DELETE_CUSTOMER_RESET  }
}

