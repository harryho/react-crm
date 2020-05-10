import {
  OrderState,
  OrderActionTypes,
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  GET_ORDER,
  LIST_ORDER,
  NEW_ORDER,
  EDIT_ORDER,
} from "../store/types";
import { Order, OrderModel } from "../types";

export function orderReducer(
  state: OrderState = {
    isFetching: true,
    order: new OrderModel() as Order, // {} as Order,
    orderList: [],
    deleted: false,
    updated: false,
  },
  action: OrderActionTypes
) {
  // 
  switch (action.type) {
    case LIST_ORDER:
      return Object.assign({}, state, {
        isFetching: false,
        orderList: action.payload,
        errorMessage: "",
        deleted: false,
        updated: false,
      });
    case NEW_ORDER:
      return Object.assign({}, state, {
        isFetching: false,
        order: action.payload, // new OrderModel("","","","","",false,0) as Order,
        errorMessage: action.error,
        deleted: false,
        updated: false,
      });
    case GET_ORDER:
      
      return Object.assign({}, state, {
        isFetching: false,
        order: action.payload,
        errorMessage: action.error,
        deleted: false,
        updated: false,
      });
    case EDIT_ORDER:
      
      const { order, productList, categoryList } = action.payload;
      return Object.assign({}, state, {
        isFetching: false,
        order,
        productList,
        categoryList,
        errorMessage: action.error,
        deleted: false,
        updated: false,
      });

    case CREATE_ORDER:
    case UPDATE_ORDER:
      return Object.assign({}, state, {
        isFetching: false,
        order: action.payload,
        errorMessage: action.error,
        deleted: false,
        updated: true,
      });
    case DELETE_ORDER:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error,
        deleted: !action.error && action.payload ? true : false,
        updated: false,
      });

    default:
      return state;
  }
}
