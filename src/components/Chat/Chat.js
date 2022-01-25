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
  const [room, setRoom] = useState({});
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState();
  const [chats, setChats] = useState([]);

  const ENDPOINT = "https://chat-backend-nod.herokuapp.com/";

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
  });

  const selectRoom = (room) => {
    setRoom(room);
    socket.emit("getRoom", { room }, (callback) => {
      if (callback.error) alert(callback.error);
      else {
        setMessages(callback.messages);
      }
    });
    setMessages(room.messages);
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

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", { room, message }, (callback) => {
      if (callback.error) alert(callback.error);
      else {
        setMessages(callback.messages);
        setMessage("");
      }
    });
  };

  useEffect(() => {
    socket.on("message", ({ messageCreated }) => {
      console.log("oi");
      setMessages(messageCreated.messages);
    });
  }, [messages]);
  /*const ENDPOINT = "https://chat-backend-nod.herokuapp.com/";

  

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    document.title = `Room: ${room}`;
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
*/
  return (
    <div className="container">
      <InfoBarProfile name={name} />

      <InfoBarChat room={room} chat={chat} />
      <BarTalks
        createNewRoom={createNewRoom}
        createNewChat={createNewChat}
        room={room}
        selectRoom={selectRoom}
        setChat={setChat}
        rooms={rooms}
        chats={chats}
      />
      <Messages messages={messages} name={name} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
