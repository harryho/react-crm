import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../store";
import { callApi, login } from "../middleware/api";
import {
  listCustomers,
  getCustomer,
  deleteCustomer,
  newCustomer,
  updateCustomer,
  createCustomer,
} from "../actions/customer";
import { signIn, signOut } from "../actions/auth";

import {
  ApiAction,
  SIGN_IN,
  SIGN_OUT,
  LIST_CUSTOMER,
  GET_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
  NEW_CUSTOMER,
  CREATE_CUSTOMER,
  LIST_ORDER,
  GET_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  NEW_ORDER,
  CREATE_ORDER,
  LIST_PRODUCT,
  GET_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  NEW_PRODUCT,
  CREATE_PRODUCT,
  NewAction,
  LIST_CATEGORY,
} from "../store/types";
import {
  Customer,
  CustomerModel,
  OrderModel,
  Product,
  ProductModel,
  Order, 
} from "../types";
import { listOrder, newOrder, getOrder, updateOrder,createOrder, deleteOrder } from "../actions/order";
import { listProduct, newProduct, getProduct, createProduct, updateProduct, deleteProduct, listCategory } from "../actions/product";

export const thunkAuth = (
  apiAction?: ApiAction
): ThunkAction<void, AppState, null, Action<string>> => async (dispatch) => {
  const { type, endpoint, method, data, filters } = apiAction;
  console.log(type);
  let response = data;
  if (type == SIGN_IN) {
    response = await login(endpoint, method, data);
  }

  console.log(response);
  // cosnt { user, token, error} = response;
  dispatchSignIn(dispatch, type, response);
};

function dispatchSignIn(dispatch, type, response) {
  switch (type) {
    case SIGN_IN:
      dispatch(signIn(response));
      break;
    case SIGN_OUT:
      dispatch(signOut(response));
      break;
  }
}

function getNewEntity(newAction: NewAction) {
  switch (newAction) {
    case NEW_CUSTOMER:
      return {
        data: new CustomerModel() as Customer,
      };
    case NEW_ORDER:
      return {
        data: new OrderModel() as Order,
      };
    case NEW_PRODUCT:
      return {
        data: new ProductModel() as Product,
      };
  }
}

export const thunkApiCall = (
  apiAction?: ApiAction
): ThunkAction<void, AppState, null, Action<string>> => async (dispatch) => {
  const { type, endpoint, method, data, filters } = apiAction;
  console.log(type);
  let response: TODO;
  if (!isNewAction(type)) {
    response = await callApi(endpoint, method, data, filters);
  } else {
    response = getNewEntity(type);
  }
  console.log(response);

  dispatchReponse(dispatch, type, response);
};

const isNewAction = (x: any): x is NewAction => x.toString().startsWith("NEW_");

function dispatchReponse(dispatch, type, response) {
  console.log(type) 
  switch (type) {
    case LIST_CUSTOMER:
      dispatch(listCustomers(response.data));
      break;
    case NEW_CUSTOMER:
      dispatch(newCustomer(response.data));
      break;
    case GET_CUSTOMER:
      dispatch(getCustomer(response.data));
      break;
    case CREATE_CUSTOMER:
      dispatch(createCustomer(response.data));
      break;
    case UPDATE_CUSTOMER:
      dispatch(updateCustomer(response.data));
      break;

    case DELETE_CUSTOMER:
      dispatch(deleteCustomer(response.data));
      break;
    //------------------------
    case LIST_ORDER:
      dispatch(listOrder(response.data));
      break;
    case NEW_ORDER:
      dispatch(newOrder(response.data));
      break;
    case GET_ORDER:
      dispatch(getOrder(response.data));
      break;
    case CREATE_ORDER:
      dispatch(createOrder(response.data));
      break;
    case UPDATE_ORDER:
      dispatch(updateOrder(response.data));
      break;

    case DELETE_ORDER:
      dispatch(deleteOrder(response.data));
      break;

    //------------------------
    case LIST_PRODUCT:
      dispatch(listProduct(response.data));
      break;
    case NEW_PRODUCT:
      dispatch(newProduct(response.data));
      break;
    case GET_PRODUCT:
      dispatch(getProduct(response.data));
      break;
    case CREATE_PRODUCT:
      dispatch(createProduct(response.data));
      break;
    case UPDATE_PRODUCT:
      dispatch(updateProduct(response.data));
      break;

    case DELETE_PRODUCT:
      dispatch(deleteProduct(response.data));
      break;

      case LIST_CATEGORY:
        dispatch(listCategory(response.data));
        break;
  }
}
