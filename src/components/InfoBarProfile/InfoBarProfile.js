import React from "react";

import "./InfoBarProfile.css";

import Refresh from "../../icons/refresh-button.png";

const InfoBarProfile = ({ name, refreshInfo }) => {
  return (
    <div className="infoBarProfile">
      <div className="info-name">{name}</div>
      <div onClick={refreshInfo} className="refresh">
        <img src={Refresh} alt="Refresh-info" />
      </div>
    </div>
  );
};

export default InfoBarProfile;
