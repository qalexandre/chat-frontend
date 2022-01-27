import React from "react";

import "./Input.css";

const Input = ({
  message,
  setMessage,
  sendMessageRoom,
  sendMessageChat,
  showRooms,
  showChats,
}) => (
  <form className="form">
    {showRooms && (
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessageRoom(event) : null
        }
      />
    )}
    {showRooms && (
      <button
        className="sendButton"
        onClick={(event) => sendMessageRoom(event)}
      >
        Send
      </button>
    )}
    {showChats && (
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessageChat(event) : null
        }
      />
    )}
    {showChats && (
      <button
        className="sendButton"
        onClick={(event) => sendMessageChat(event)}
      >
        Send
      </button>
    )}
  </form>
);

export default Input;
