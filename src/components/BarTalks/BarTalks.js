import React, { useState } from "react";

import "./BarTalks.css";

const BarTalks = ({
  rooms,
  chats,
  selectRoom,
  setChat,
  room,
  createNewRoom,
  createNewChat,
}) => {
  const [showRooms, setShowRooms] = useState(true);
  const [showChats, setShowChats] = useState(false);

  return (
    <div className="barTalks">
      <div className="buttons">
        <button
          onClick={() => {
            setShowRooms(true);
            setShowChats(false);
          }}
          className="button-room"
        >
          Rooms
        </button>
        <button
          onClick={() => {
            setShowRooms(false);
            setShowChats(true);
          }}
          className="button-chat"
        >
          Chats
        </button>
      </div>

      <div
        onClick={() => {
          showRooms && createNewRoom();
          showChats && createNewChat();
        }}
        className="new-room"
      >
        Criar novo
      </div>
      <div className="rooms">
        {showRooms &&
          rooms.map((room, i) => (
            <div
              className="room"
              onClick={() => {
                selectRoom(room);
                setChat();
              }}
              key={i}
            >
              {room.title}
            </div>
          ))}

        {showChats &&
          chats.map((chat, i) => (
            <div
              className="room"
              onClick={() => {
                setChat(chat);
                selectRoom();
              }}
              key={i}
            >
              {chat.participants[0].name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BarTalks;
