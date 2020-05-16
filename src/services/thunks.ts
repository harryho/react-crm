import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { sendMessage } from "../store/actions";
import { AppState } from "../store";
import { callApi, login } from "../middleware/api";
import { listCustomers, getCustomer, deleteCustomer } from "../actions/customer";
import { signIn, signOut } from "../actions/auth";

import { LIST_CUSTOMER, 
  GET_CUSTOMER, DELETE_CUSTOMER, ApiAction, SIGN_IN, SIGN_OUT, UPDATE_CUSTOMER, NEW_CUSTOMER 
  , NewAction
} from "../store/types";
import { Customer } from "../types";

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


export const thunkAuth = (
  apiAction?: ApiAction
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const { type, endpoint, method, data, filters } = apiAction;
  let response = data
  if (type == SIGN_IN) {
    response = await login(endpoint, method, data)
  }

  console.log(response)
  // cosnt { user, token, error} = response;
  dispatchSignIn(dispatch, type, response);
};


function dispatchSignIn(dispatch, type, response) {

  switch (type) {
    case SIGN_IN:
      dispatch(
        signIn(response)
      );
      break;
    case SIGN_OUT:
      dispatch(
        signOut(response)
      );
      break;

  }
}

const isNewAction = (x: any): x is NewAction => x.toString().startsWith("NEW_")



function dispatchReponse(dispatch, type, response) {

  switch (type) {
    case LIST_CUSTOMER:
      dispatch(
        listCustomers(response.data)
      );
      break;
    case NEW_CUSTOMER:
    case GET_CUSTOMER:
    case UPDATE_CUSTOMER:
      dispatch(
        getCustomer( response.data )
      );
      break;

    case DELETE_CUSTOMER:
      dispatch(
        deleteCustomer(response.data)
      );
      break;
  }


  
}

function getNewEntity (newAction:NewAction){
  switch(newAction){
    case NEW_CUSTOMER:
      return {data:{} as Customer}
  }
}

export const thunkApiCall = (
  apiAction?: ApiAction
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const { type, endpoint, method, data, filters } = apiAction;
  let response = {} as TODO ;
  if (!isNewAction(type) ) {
   response = await callApi(endpoint, method, data, filters)
  }
  else {
    response = getNewEntity(type)
  }
  console.log(response)

  dispatchReponse(dispatch, type, response);
};









