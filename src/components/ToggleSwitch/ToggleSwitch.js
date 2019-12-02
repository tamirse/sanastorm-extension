import React from "react";
import "./ToggleSwitch.css";

const toggleSwitch = props => {
  return (
    <input
      className="sanastorm-ct sanastorm-toggle"
      type="checkbox"
      checked={props.checked}
      onChange={props.changed}
    />
  );
};

export default toggleSwitch;
