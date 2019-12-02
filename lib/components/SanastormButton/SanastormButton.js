var _jsxFileName = "src\\components\\SanastormButton\\SanastormButton.js",
    _this = this;

import React from "react";
import "./SanastormButton.css";

var LOGO_PATH = "images/finland32.png";

var button = function button(props) {
  var button = React.createElement(
    "div",
    {
      id: "sanastorm",
      onClick: props.clicked,
      style: {
        position: "absolute",
        left: props.coords.x,
        top: props.coords.y
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      },
      __self: _this
    },
    React.createElement("img", {
      className: "sanastorm-icon",
      src: chrome.runtime.getURL(LOGO_PATH),
      alt: "logo",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: _this
    })
  );

  return button;
};

export default button;