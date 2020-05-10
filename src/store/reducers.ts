import { ChatState, SEND_MESSAGE, DELETE_MESSAGE, ChatActionTypes, UPDATE_SESSION, SystemState, SystemActionTypes } from './types';

const initialState: ChatState = {
  messages: []
};

export function chatReducer(state = initialState, action: ChatActionTypes): ChatState {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        messages: [...state.messages, action.payload]
      };
    case DELETE_MESSAGE:
      return {
        messages: state.messages.filter(message => message.timestamp !== action.meta.timestamp)
      };
    default:
      return state;
  }
}

const sysInitialState: SystemState = {
  loggedIn: false,
  session: '',
  userName: ''
};

export function systemReducer(state = sysInitialState, action: SystemActionTypes): SystemState {
  switch (action.type) {
    case UPDATE_SESSION: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
}

//   declare module 'chat' {
//     export type Article = {
//       id: string;
//       title: string;
//       content: string;
//     };
//   }
