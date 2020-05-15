import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  // LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from "../constants";
import { AuthActionTypes, AuthState, SIGN_IN, SIGN_OUT } from "../store/types";
import { User } from "../types";


function isSignIned():boolean{

  const token =  localStorage.getItem("token")
  return token  ? true : false
}

function getUser() : User{
  const user = localStorage.getItem("user") 
  return user? JSON.parse(user) : {} as User
}

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export function authReducer(
  state: AuthState = {
    isFetching: false,
    isAuthenticated: isSignIned(),// localStorage.getItem("token") ? true : false,
    user: getUser()
  },
  action:AuthActionTypes
) {
  switch (action.type) {
    // case LOGIN_REQUEST:
    //   return Object.assign({}, state, {
    //     isFetching: true,
    //     isAuthenticated: false,
    //     user: action.creds
    //   });
    case SIGN_IN:
      if ( action.payload ){
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          errorMessage: "",
          user: action.payload
        });
      } 
      else {
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          errorMessage: action.error,
          user: undefined
        });
      }
      
    // case LOGIN_FAILURE:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     isAuthenticated: false,
    //     errorMessage: action.message
    //   });
    case SIGN_OUT:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    default:
      return state;
  }
}
