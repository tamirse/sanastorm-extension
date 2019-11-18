var _jsxFileName = "src\\components\\SanastormButton.js",
    _this = this;

import React from "react";

var LOGO_PATH = "images/finland32.png";

var button = function button(props) {
  var button = null;

  if (props.show) {
    button = React.createElement(
      "div",
      {
        id: "sanastorm",
        style: {
          position: "absolute",
          left: props.coords.x,
          top: props.coords.y
        },
        onClick: function onClick() {
          return props.clicked();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        },
        __self: _this
      },
      React.createElement("img", {
        className: "sanastorm-icon",
        src: chrome.runtime.getURL(LOGO_PATH),
        alt: "logo",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        },
        __self: _this
      })
    );
  }

  return button;
};

export default button;