import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  document.title = "Chat";

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading"> Join </h1>
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
            placeholder="Room"
            onChange={(event) => setRoom(event.target.value)}
            type="text"
            className="joinInput mt-20"
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">
            Sign in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
