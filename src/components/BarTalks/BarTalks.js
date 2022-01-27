import React, { useState } from "react";

import "./BarTalks.css";

const BarTalks = ({
  rooms,
  chats,
  selectRoom,
  setChat,
  setRoom,
  selectChat,
  room,
  createNewRoom,
  createNewChat,
  name,
  showChats,
  showRooms,
  setShowChats,
  setShowRooms,
}) => {
  return (
    <div className="barTalks">
      <div className="buttons">
        {showRooms ? (
          <button
            onClick={() => {
              setShowRooms(true);
              setShowChats(false);
            }}
            className="button-room selected"
          >
            Rooms
          </button>
        ) : (
          <button
            onClick={() => {
              setShowRooms(true);
              setShowChats(false);
            }}
            className="button-room "
          >
            Rooms
          </button>
        )}
        {showChats ? (
          <button
            onClick={() => {
              setShowRooms(false);
              //setShowChats(true);
              alert("not working for now");
            }}
            className="button-chat selected"
          >
            Chats
          </button>
        ) : (
          <button
            onClick={() => {
              setShowRooms(false);
              //setShowChats(true);
              alert("not working for now");
            }}
            className="button-chat"
          >
            Chats
          </button>
        )}
      </div>

      <div
        onClick={() => {
          showRooms && createNewRoom();
          showChats && createNewChat();
        }}
        className="new-room"
      >
        ⠀Criar novo +
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
              ⠀{room.title}
            </div>
          ))}

        {showChats &&
          chats.map((chat, i) => (
            <div
              className="room"
              onClick={() => {
                selectChat(chat);
                setRoom();
              }}
              key={i}
            >
              ⠀
              {chat.participants[0].name == name
                ? chat.participants[1].name
                : name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BarTalks;
