import { Entity, Customer } from "../types";
import { NEW_CUSTOMER_REQUEST } from "../constants";
// import * as constants from "../constants";

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

export const LIST_CUSTOMER = "LIST_CUSTOMER";
// export const LOAD_CUSTOMERS_FAILURE = "LOAD_CUSTOMERS_FAILURE";
// export const GET_CUSTOMER_REQUEST = "GET_CUSTOMER_REQUEST";
export const GET_CUSTOMER = "GET_CUSTOMER";
// export const GET_CUSTOMER_FAILURE = "GET_CUSTOMER_FAILURE";

export const NEW_CUSTOMER = "NEW_CUSTOMER";

// export const UPDATE_CUSTOMER_REQUEST = "UPDATE_CUSTOMER_REQUEST";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
// export const UPDATE_CUSTOMER_FAILURE = "UPDATE_CUSTOMER_FAILURE";

// export const ADD_CUSTOMER_REQUEST = "ADD_CUSTOMER_REQUEST";
export const ADD_CUSTOMER = "ADD_CUSTOMER";
// export const ADD_CUSTOMER_FAILURE = "ADD_CUSTOMER_FAILURE";

// export const DELETE_CUSTOMER_REQUEST = "DELETE_CUSTOMER_REQUEST";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";
// export const DELETE_CUSTOMER_FAILURE = "DELETE_CUSTOMER_FAILURE";


export interface CustomerState {
  isFetching: boolean;
  customer: Entity,
  customerList: [];
  errorMessage?: null
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

