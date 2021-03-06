import React from "react";
import "./SanastormButton.css";

const LOGO_PATH = "images/finland32.png";

const button = props => {
  let button = (
    <div
      id="sanastorm"
      style={{
        position: "absolute",
        left: props.coords.x,
        top: props.coords.y
      }}
    >
      <img
        className="sanastorm-icon"
        src={chrome.runtime.getURL(LOGO_PATH)}
        alt="logo"
      />
    </div>
  );

  return button;
};

export default button;
