import React, { useState, useEffect, useCallback } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import InfoBarProfile from "../InfoBarProfile/InfoBarProfile";
import InfoBarChat from "../InfoBarChat/InfoBarChat";
import BarTalks from "../BarTalks/BarTalks";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

import "./Chat.css";
import { useLocation } from "react-router";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState();
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState();
  const [chats, setChats] = useState([]);
  const [showRooms, setShowRooms] = useState(true);
  const [showChats, setShowChats] = useState(false);

  const ENDPOINT = "localhost:5000";

  const location = useLocation();

  document.title = "CHAT";

  useEffect(() => {
    const name = location.state.name;
    setName(name);
    socket = io(ENDPOINT);
    socket.emit("join", { name }, (error) => {
      if (error) alert(error);
    });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("getRooms", ({ user, rooms }) => {
      setRooms(rooms);
    });
    socket.on("getChats", ({ chats }) => {
      setChats(chats);
    });
    socket.on("message", ({ messageCreated }) => {
      setMessages(messageCreated.messages);
    });
  });

  const refreshInfo = () => {
    socket.emit("refresh", () => {});
  };

  const selectRoom = (newRoom) => {
    let lastRoom = room;
    setRoom(newRoom);
    setChat();
    socket.emit("getRoom", { newRoom, lastRoom }, (callback) => {
      if (callback.error) alert(callback.error);
      else {
        setMessages(callback.messages);
      }
    });
    setMessages(newRoom.messages);
  };

  const selectChat = (newChat) => {
    let lastChat = chat;
    setChat(newChat);
    setRoom();
    socket.emit("getChat", { newChat, lastChat }, (callback) => {
      if (callback.error) alert(callback.error);
      else {
        setMessages(callback.messages);
      }
    });
    setMessages(newChat.messages);
  };

  const createNewRoom = () => {
    let room = prompt("Type name of room");
    if (room) {
      socket.emit("createRoom", { room }, (callback) => {
        if (callback.error) alert(callback.error);
        else setRooms([...rooms, callback]);
      });
    }
  };

  const createNewChat = () => {
    let chat = prompt("Type name of user");
    if (chat) {
      socket.emit("createChat", { chat }, (callback) => {
        if (callback.error) alert(callback.error);
        else setChats([...chats, callback]);
      });
    }
  };

  const sendMessageRoom = (event) => {
    event.preventDefault();
    socket.emit("sendMessageRoom", { room, message }, (callback) => {
      if (callback.error) alert(callback.error);
      else {
        setMessages(callback.messages);
        setMessage(null);
      }
    });
  };
  const sendMessageChat = (event) => {
    event.preventDefault();
    socket.emit("sendMessageChat", { chat, message }, (callback) => {
      if (callback.error) alert(callback.error);
      else {
        setMessages(callback.messages);
        setMessage(null);
      }
    });
  };
  /*
  const deleteMessageRoom = (message) => {
    socket.emit("deleteMessage", { room, message }, (callback) => {
      if (callback.error) alert(callback.error);
      else {
        setMessages(callback.messages);
      }
    });
  };*/

  const addUser = () => {
    let name = prompt("Type username");
    alert(typeof name);
    if (name) {
      socket.emit("addUserRoom", { room, name }, (callback) => {
        if (callback.error) console.log(callback.error);
        else alert("Success");
      });
    } else alert("erro");
  };

  return (
    <div className="container">
      <InfoBarProfile refreshInfo={refreshInfo} name={name} />

      <InfoBarChat room={room} chat={chat} addUser={addUser} />
      <BarTalks
        createNewRoom={createNewRoom}
        createNewChat={createNewChat}
        room={room}
        selectRoom={selectRoom}
        selectChat={selectChat}
        setChat={setChat}
        setRoom={setRoom}
        rooms={rooms}
        chats={chats}
        name={name}
        showChats={showChats}
        showRooms={showRooms}
        setShowChats={setShowChats}
        setShowRooms={setShowRooms}
      />
      <Messages messages={messages} name={name} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessageRoom={sendMessageRoom}
        sendMessageChat={sendMessageChat}
        showRooms={showRooms}
        showChats={showChats}
      />
    </div>
  );
};

export default Chat;
