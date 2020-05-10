import * as React from "react";
import { Message } from "../store/types";

interface ChatHistoryProps {
  messages: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <div className="chat-history">
      {messages.map(message => (
        <div className="message-item" key={message.timestamp}>
          <h3>From: {message.user}</h3>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
