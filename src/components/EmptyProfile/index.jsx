import React from "react";
import Robot from "assets/icons/robot-happy.svg";

import "./styles.scss";

const EmptyProfile = () => {
  return (
    <div styleName="empty-profile">
      <h2>BEEP. BEEP. HELLO!</h2>
      <Robot />
      <p>Seems like this member doesn’t have much information to share yet.</p>
    </div>
  );
};

export default EmptyProfile;
