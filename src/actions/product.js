import { CALL_API } from '../middleware/api'
import {  
  LOAD_CATEGORYS_REQUEST, LOAD_CATEGORYS_SUCCESS, LOAD_CATEGORYS_FAILURE,
  LOAD_PRODUCTS_REQUEST, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAILURE,
   GET_PRODUCT_REQUEST,  GET_PRODUCT_SUCCESS,  GET_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE


} from '../constants'



// Product actions

export function loadProducts(filters) {
  return {
    [CALL_API]: {
      endpoint: 'products?_expand=category',
      products:[],
      filters:filters,
      types: [ LOAD_PRODUCTS_REQUEST, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAILURE]
    }
  }
}

export function getProduct(id) {
  return {
    [CALL_API]: {
      endpoint: `products/${id}?_expand=category`,
      product:{},
      types: [  GET_PRODUCT_REQUEST,  GET_PRODUCT_SUCCESS,  GET_PRODUCT_FAILURE]
    }
  }
}

export function loadCategories(filters) {
  return {
    [CALL_API]: {
      endpoint: `categories`,
      categoryList:[],
      filters:filters,
      types: [ LOAD_CATEGORYS_REQUEST,  LOAD_CATEGORYS_SUCCESS,  LOAD_CATEGORYS_FAILURE]
    }
  }
}

export function updateProduct(product) {
  return {
    [CALL_API]: {
      endpoint: `products/${product.id}`,
      data: product,
      method: 'PUT',
      authenticated: true,
      updateSuccess: false,
      types: [UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE]
    }
  }
}

export function addProduct(product) {
  return {
    [CALL_API]: {
      endpoint: `products`,
      data: product,
      method: 'POST',
      authenticated: true,
      addSuccess: false,
      types: [ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE]
    }
  }
}

export function deleteProduct(id) {
  return {
    [CALL_API]: {
      endpoint: `products/${id}`,
      method: 'DELETE',
      authenticated: true,
      types: [DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE]
    }
  }
}
