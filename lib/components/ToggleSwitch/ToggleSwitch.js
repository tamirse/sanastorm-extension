var _jsxFileName = "src\\components\\ToggleSwitch\\ToggleSwitch.js",
    _this = this;

import React from "react";
import "./ToggleSwitch.css";

var toggleSwitch = function toggleSwitch(props) {
  return React.createElement("input", {
    className: "sanastorm-ct sanastorm-toggle",
    type: "checkbox",
    checked: props.checked,
    onChange: props.changed,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: _this
  });
};

export default toggleSwitch;