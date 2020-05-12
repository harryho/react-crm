import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { sendMessage } from "../store/actions";
import { AppState } from "../store";
import { callApi } from "../middleware/api";
import { listCustomers } from "../store/customer";

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

interface ApiAction {
  actionTypes: TODO,
  endpoint: string,
  method: string,
  data?: TODO,
  filters?: TODO,

}


export const thunkSearch = (
  filters?: TODO
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  
  const response = await callApi("customers/", 'GET', "filters")
  console.log(response)
  dispatch(
    listCustomers(response.data)
  );
};


export const thunkCreate = (
  filters?: TODO
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const response = await callApi("customers/", 'GET', "filters")
  console.log(response)
  dispatch(
    listCustomers(response.data)
  );
};


export const thunkUpdate = (
  filters?: TODO
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const response = await callApi("customers/", 'GET', "filters")
  console.log(response)
  dispatch(
    listCustomers(response.data)
  );
};


export const thunkDelete = (
  filters?: TODO
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const response = await callApi("customers/", 'GET', "filters")
  console.log(response)
  dispatch(
    listCustomers(response.data)
  );
};





