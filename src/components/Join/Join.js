import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";

import "./Join.css";

let socket;

const Join = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const ENDPOINT = "localhost:5000";

  document.title = "Register";

  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT]);

  const registerUser = () => {
    socket.emit("register", { name, password }, (callback) => {
      if (!callback.error) {
        const { name, password } = callback;
        navigate("/chat", {
          replace: true,
          state: { name: name, password: password },
        });
      }
    });
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading"> Register </h1>
        <div>
          <input
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
            type="text"
            className="joinInput"
          />
        </div>
        <div>
          <input
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            type="text"
            className="joinInput mt-20"
          />
        </div>
        <br />
        <a href="/login" className="link-login">
          I already have an account
        </a>
        <button onClick={registerUser} className="button mt-20" type="submit">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Join;
