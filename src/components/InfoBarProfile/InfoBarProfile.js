import React from "react";

import "./InfoBarProfile.css";

const InfoBarProfile = (props) => {
  return (
    <div className="infoBarProfile">
      <div className="info-name">{props.name}</div>
      <div className="info-status">Online</div>
    </div>
  );
};

export default InfoBarProfile;
