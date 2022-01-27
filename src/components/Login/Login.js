import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";

import "./Login.css";

let socket;

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const ENDPOINT = "https://chat-backend-nod.herokuapp.com/";

  document.title = "Login";

  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT]);

  const getUser = async () => {
    socket.emit("login", { name, password }, (callback) => {
      if (!callback.error) {
        if (callback.name) {
          const { name, password } = callback;
          console.log(callback);
          navigate("/chat", {
            replace: true,
            state: { name: name, password: password },
          });
        } else alert("erro");
      } else alert(callback.error);
    });
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading"> Login </h1>
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
        <a href="/" className="link-register">
          I don't have an account
        </a>
        <button onClick={getUser} className="button mt-20" type="submit">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;
