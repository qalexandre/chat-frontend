import React from "react";

import "./InfoBarChat.css";

const InfoBarChat = ({ room, chat }) => {
  return (
    <div className="infoBarChat">
      <div className="info-room">
        {room && room.title}
        {chat && chat.participants[0].name}
      </div>
    </div>
  );
};

export default InfoBarChat;
