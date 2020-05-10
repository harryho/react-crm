import {
  SIGN_IN,
  SIGN_OUT,
  AuthActions,
  ApiAction,
  HttpMethod,
} from "../store/types";
import { Entity } from "../types";

// Login actions

export function signIn(result?: TODO) {
  return {
    type: SIGN_IN,
    payload: result,
  };
}

export function signOut(result?: TODO) {
  return {
    type: SIGN_OUT,
    payload: result,
  };
}

export function getAction(
  action: AuthActions,
  id = 0,
  data?: Entity,
  query?: string
): ApiAction {
  switch (action) {
    case SIGN_IN:
      return {
        type: SIGN_IN,
        endpoint: "login/",
        method: HttpMethod.POST,
      };
    case SIGN_OUT:
      return {
        type: SIGN_OUT,
        endpoint: "logout/" + id,
        method: HttpMethod.GET,
      };
  }
}

// // Calls the API to get a token and
// // dispatches actions along the way
// export function loginUser(creds) {
//   //// Production setting
//   //// Uncomment the code below for production or UAT
//   // let config = {
//   //   method: 'POST',
//   //   headers: { 'Content-Type':'application/x-www-form-urlencoded' },
//   //   body: `username=${creds.username}&password=${creds.password}`
//   // }

//   //// Development setting
//   //// The code below is only for local fake api test
//   const config = {
//     method: "GET",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" }
//   };
//   const tokenUrl = "http://localhost:5354/token";

//   return dispatch => {
//     // We dispatch requestLogin to kickoff the call to the API
//     dispatch(requestLogin(creds));
//     return login(tokenUrl, config)
//       .then(({ user, access_token }) => {
//         // If login was successful, set the token in local storage
//         user = Object.assign({}, user);
//         user.token = access_token;
//         localStorage.setItem("token", access_token);
//         localStorage.setItem("user", JSON.stringify(user));
//         // Dispatch the success action
//         dispatch(receiveLogin(user));
//       })
//       .catch(err => console.log("Error: ", err));
//   }
// }
