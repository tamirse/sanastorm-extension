var _jsxFileName = "src\\components\\InfoContainer\\InfoContainer.js",
    _this = this;

import React from "react";

var infoContainer = function infoContainer(props) {
  var container = null;

  if (props.show) {
    container = React.createElement(
      "div",
      { id: "sanastorm-info-container", __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        },
        __self: _this
      },
      React.createElement(
        "div",
        {
          id: "sanastorm-text",
          style: {
            position: "absolute",
            left: props.coords.x,
            top: props.coords.y
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 9
          },
          __self: _this
        },
        props.selectedText
      )
    );
  }

  return container;
};

export default infoContainer;