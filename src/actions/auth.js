// import { CALL_API } from '../middleware/api'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  // LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from "../constants";
import { login } from "../middleware/api";

// Login actions

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.token,
    user: user
  };
}

// function loginError(message) {
//   return {
//     type: LOGIN_FAILURE,
//     isFetching: false,
//     isAuthenticated: false,
//     message: message
//   };
// }

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  //// Production setting
  //// Uncomment the code below for production or UAT
  // let config = {
  //   method: 'POST',
  //   headers: { 'Content-Type':'application/x-www-form-urlencoded' },
  //   body: `username=${creds.username}&password=${creds.password}`
  // }

  //// Development setting
  //// The code below is only for local fake api test
  const config = {
    method: "GET",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  };
  const tokenUrl = "http://localhost:5354/token";

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));
    return login(tokenUrl, config)
      .then(({ user, access_token }) => {
        // If login was successful, set the token in local storage
        user = Object.assign({}, user);
        user.token = access_token;
        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
        // Dispatch the success action
        dispatch(receiveLogin(user));
      })
      .catch(err => console.log("Error: ", err));
  }
}

// Logout actions

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(receiveLogout());
  };
}
