import { combineReducers } from "redux";
import { auth } from "./auth";
import { customerReducer } from "./customer";

import { orderReducer } from "./order";

import { productReducer } from "./product";

const reducers = combineReducers({
  auth,
  customerReducer,
  orderReducer,
  productReducer
});

export default reducers;
