import { Entity, Customer, UserInfo, User } from "../types";

// Describing the shape of the chat's slice of state
export interface Message {
  user: string;
  message: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
}

// Describing the different ACTION NAMES available
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

interface SendMessageAction {
  type: typeof SEND_MESSAGE;
  payload: Message;
}

interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE;
  meta: {
    timestamp: number;
  };
}

// Describing the shape of the system's slice of state
export interface SystemState {
  loggedIn: boolean;
  session: string;
  userName: string;
}

// Describing the different ACTION NAMES available
export const UPDATE_SESSION = 'UPDATE_SESSION';

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION;
  payload: SystemState;
}

export type SystemActionTypes = UpdateSessionAction;

export type ChatActionTypes = SendMessageAction | DeleteMessageAction;

export enum HttpMethod {
  GET,
  POST,
  PUT,
  DELETE
}

export interface ApiAction {
  type: TODO,
  endpoint: string,
  method: HttpMethod,
  data?: TODO,
  filters?: TODO,
}

export const SIGN_IN ="SIGN_IN"
export const SIGN_OUT ="SIGN_OUT"

export interface AuthState {
  isFetching: boolean;
  user: User,
  token: string | undefined | null,
  isAuthenticated: boolean;
  errorMessage?: null
} 
interface SignInAction {
  type: typeof SIGN_IN;
  payload: { user?:User, token?:string}
  error?: string
}

interface SignOutAction {
  type: typeof SIGN_OUT;
  payload: { user?:User, token?:string},
  error?: string
}

export type AuthActionTypes =  SignInAction | SignOutAction;

export const LIST_CUSTOMER = "LIST_CUSTOMER";
export const GET_CUSTOMER = "GET_CUSTOMER";
export const NEW_CUSTOMER = "NEW_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";


export interface CustomerState {
  isFetching: boolean;
  customer: Entity,
  customerList: [];
  error?: null
}

interface GetCustomerAction {
  type: typeof GET_CUSTOMER;
  payload: Customer,
  error?: string
}

interface ListCustomerAction {
  type: typeof LIST_CUSTOMER;
  payload: Entity[]
}

interface NewCustomerAction {
  type: typeof NEW_CUSTOMER;
  payload: Customer,
  error?: string
}

interface UpdateCustomerAction {
  type: typeof UPDATE_CUSTOMER;
  payload: Customer,
  error?: string
}

interface DeleteCustomerAction {
  type: typeof DELETE_CUSTOMER;
  payload: number,
  error?: string
}

export type CusomerActionTypes = NewCustomerAction | GetCustomerAction |
  ListCustomerAction | UpdateCustomerAction | DeleteCustomerAction;

