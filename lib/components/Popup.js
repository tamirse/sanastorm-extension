var _jsxFileName = "src\\components\\Popup.js",
    _this = this;

import React from "react";

var popup = function popup(props) {
  return React.createElement(
    "div",
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 5
      },
      __self: _this
    },
    React.createElement(
      "div",
      {
        id: "sanasto-text",
        style: {
          position: "absolute",
          left: props.coords.x,
          top: props.coords.y
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 6
        },
        __self: _this
      },
      props.selectedText
    )
  );
};

export default popup;