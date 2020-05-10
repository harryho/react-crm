
import { AuthActionTypes, AuthState, SIGN_IN, SIGN_OUT } from "../store/types";
import { User } from "../types";


function isSignIned(): boolean {
  const token = localStorage.getItem("react-crm-token")
  return token ? true : false
}

function getUser(): User {
  const user = localStorage.getItem("react-crm-user")
  return user ? JSON.parse(user) : {} as User
}
function getToken(): string | undefined {
  const token = localStorage.getItem("react-crm-token")
  return token ? token : undefined
}
function setTokenUser(token, user) {
  localStorage.setItem("react-crm-token", token);
  localStorage.setItem("react-crm-user", JSON.stringify(user));
}

function removeTokenUser(){
      localStorage.removeItem("react-crm-token");
    localStorage.removeItem("react-crm-user");
}



// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export function authReducer(
  state: AuthState = {
    isFetching: false,
    isAuthenticated: isSignIned(),// localStorage.getItem("token") ? true : false,
    user: getUser(),
    token: getToken()
  },
  action: AuthActionTypes
) {
  const payload = action.payload

  switch (action.type) {
    case SIGN_IN:
      if (payload.token && payload.user ) {
        setTokenUser(payload.token, payload.user)
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          errorMessage: "",
          user: action.payload.user,
          token: action.payload.token
        });
      }
      else {
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          errorMessage: action.error,
          user: undefined,
          token: undefined
        });
      }
    case SIGN_OUT:
      removeTokenUser()
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: undefined,
        token: undefined
      });
    default:
      return state;
  }
}
