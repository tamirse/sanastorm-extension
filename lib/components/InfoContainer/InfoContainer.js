var _jsxFileName = "src\\components\\InfoContainer\\InfoContainer.js",
    _this = this;

import React from "react";

var WIDTH = 100;
var HEIGHT = 100;

var infoContainer = function infoContainer(props) {
  var container = null;

  if (props.show) {
    container = React.createElement(
      "div",
      {
        id: "sanastorm-info-container",
        style: {
          position: "absolute",
          left: props.coords.x - Math.abs(WIDTH - props.coords.width) / 2,
          top: props.coords.y + 10,
          width: WIDTH,
          height: HEIGHT
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        },
        __self: _this
      },
      React.createElement(
        "div",
        { id: "sanastorm-text", __source: {
            fileName: _jsxFileName,
            lineNumber: 21
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