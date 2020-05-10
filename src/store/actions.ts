import { Message, SEND_MESSAGE, DELETE_MESSAGE, UPDATE_SESSION, SystemState
 } from './types';

export function sendMessage(newMessage: Message) {
  return {
    type: SEND_MESSAGE,
    payload: newMessage
  };
}

export function deleteMessage(timestamp: number) {
  return {
    type: DELETE_MESSAGE,
    meta: {
      timestamp
    }
  };
}

export function updateSession(newSession: SystemState) {
  return {
    type: UPDATE_SESSION,
    payload: newSession
  };
}
