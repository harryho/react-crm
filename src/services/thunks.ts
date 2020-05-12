import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { sendMessage } from "../store/actions";
import { AppState } from "../store";
import { callApi } from "../middleware/api";
import { listCustomers, getCustomer, deleteCustomer } from "../actions/customer";
import { LIST_CUSTOMER, GET_CUSTOMER, DELETE_CUSTOMER } from "../store/types";
import { HttpMethod } from "../types";

export const thunkSendMessage = (
  message: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const asyncResp = await exampleAPI();
  dispatch(
    sendMessage({
      message,
      user: asyncResp,
      timestamp: new Date().getTime()
    })
  );
};

function exampleAPI() {
  return Promise.resolve("Async Chat Bot");
}

export interface ApiAction {
  type: TODO
  actionTypes: TODO,
  endpoint: string,
  method: HttpMethod,
  data?: TODO,
  filters?: TODO,
}


export const thunkSearch = (
  apiAction?: ApiAction
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const { type, endpoint, method, data, filters } = apiAction;
  const response = await callApi(endpoint, method, data, filters)
  console.log(response)

  dispatchReponse(type, dispatch, response);
};


function dispatchReponse(type, dispatch, response) {

  switch (type) {
    case LIST_CUSTOMER:
      dispatch(
        listCustomers(response.data)
      );
      break;
    case GET_CUSTOMER:
      dispatch(
        getCustomer(response.data)
      );
      break;
    case DELETE_CUSTOMER:
      dispatch(
        deleteCustomer(response.data)
      );
      break;

  }
}








