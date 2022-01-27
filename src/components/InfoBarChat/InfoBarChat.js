import React from "react";

import "./InfoBarChat.css";
import addIcon from "../../icons/add.png";

const InfoBarChat = ({ room, chat, addUser }) => {
  return (
    <div className="infoBarChat">
      <div className="info-room">
        {room && room.title}
        {chat && chat.participants[0].name}
      </div>
      {room && (
        <button className="add-user">
          <img src={addIcon} onClick={addUser} alt="Icon-Adicionar" />
        </button>
      )}
    </div>
  );
};

export default InfoBarChat;
