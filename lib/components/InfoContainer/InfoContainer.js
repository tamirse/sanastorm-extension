var _jsxFileName = "src\\components\\InfoContainer\\InfoContainer.js",
    _this = this;

import React from "react";
import { Textfit } from "react-textfit"; // used for dynamic font size to fit container

var WIDTH = 250;
var HEIGHT = "auto";

var INFO_CONTAINER_CLASS = "sanastorm-ct";

var infoContainer = function infoContainer(props) {
  var container = null;

  if (props.show) {
    container = React.createElement(
      "div",
      {
        id: "sanastorm-info-container",
        className: INFO_CONTAINER_CLASS,
        style: {
          position: "absolute",
          left: props.coords.x - Math.abs(WIDTH - props.coords.width) / 2,
          top: props.coords.y + 10,
          width: WIDTH,
          height: HEIGHT
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        },
        __self: _this
      },
      React.createElement(
        "div",
        { id: "sanastorm-text", className: INFO_CONTAINER_CLASS, __source: {
            fileName: _jsxFileName,
            lineNumber: 25
          },
          __self: _this
        },
        React.createElement(
          "div",
          { className: "sanastorm-title " + INFO_CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 26
            },
            __self: _this
          },
          React.createElement(
            "div",
            { className: "sanastorm-finnish-title", __source: {
                fileName: _jsxFileName,
                lineNumber: 27
              },
              __self: _this
            },
            "FINNISH"
          ),
          React.createElement(
            "div",
            { className: "sanastorm-title-text", __source: {
                fileName: _jsxFileName,
                lineNumber: 28
              },
              __self: _this
            },
            props.selectedText
          )
        ),
        React.createElement(
          "div",
          { className: "sanastorm-english " + INFO_CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 30
            },
            __self: _this
          },
          React.createElement(
            "div",
            { className: "sanastorm-english-title", __source: {
                fileName: _jsxFileName,
                lineNumber: 31
              },
              __self: _this
            },
            "ENGLISH"
          ),
          React.createElement(
            Textfit,
            { mode: "single", __source: {
                fileName: _jsxFileName,
                lineNumber: 32
              },
              __self: _this
            },
            props.wordEnglish.join(", ")
          )
        ),
        React.createElement("hr", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          },
          __self: _this
        }),
        React.createElement(
          "div",
          { id: "sanastorm-inflections", __source: {
              fileName: _jsxFileName,
              lineNumber: 35
            },
            __self: _this
          },
          Object.keys(props.wordData).map(function (key, index) {
            return React.createElement(
              "div",
              {
                className: "sanastorm-inflection  " + key + " " + (props.wordData[key] === props.selectedText ? "sanastorm-selected" : ""),
                key: key,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 37
                },
                __self: _this
              },
              React.createElement(
                "div",
                { className: "sanastorm-inflection-type", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 45
                  },
                  __self: _this
                },
                key
              ),
              React.createElement(
                "div",
                { className: "sanastorm-inflection-value", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 46
                  },
                  __self: _this
                },
                props.wordData[key] ? props.wordData[key] : "-"
              )
            );
          })
        )
      )
    );
  }

  return container;
};

export default infoContainer;