import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { sendMessage } from "../store/actions";
import { AppState } from "../store";

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
