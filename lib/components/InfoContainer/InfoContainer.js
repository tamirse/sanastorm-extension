var _jsxFileName = "src\\components\\InfoContainer\\InfoContainer.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import { Textfit } from "react-textfit"; // used for dynamic font size to fit container

var WIDTH = 250;
var HEIGHT = "auto";

var INFO_CONTAINER_CLASS = "sanastorm-ct";
var NARROW_KEYS = ["nominative", "genitive", "partitive"];

var InfoContainer = function (_Component) {
  _inherits(InfoContainer, _Component);

  function InfoContainer(props) {
    _classCallCheck(this, InfoContainer);

    var _this = _possibleConstructorReturn(this, (InfoContainer.__proto__ || Object.getPrototypeOf(InfoContainer)).call(this, props));

    _this.state = {
      expandedInflections: _this.props.expanded
    };

    _this.expandInflections = _this.expandInflections.bind(_this);
    return _this;
  }

  _createClass(InfoContainer, [{
    key: "expandInflections",
    value: function expandInflections() {
      console.log("EXPANDED OR NARROWED", this.state.expandedInflections);
      this.setState(function (prev, props) {
        return {
          expandedInflections: !prev.expandedInflections
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var container = null;

      if (this.props.show) {
        var inflections = React.createElement(
          "div",
          { id: "sanastorm-inflections", __source: {
              fileName: _jsxFileName,
              lineNumber: 32
            },
            __self: this
          },
          Object.keys(this.props.wordData).map(function (key, index) {
            return _this2.state.expandedInflections || NARROW_KEYS.includes(key) ? React.createElement(
              "div",
              {
                className: "sanastorm-inflection  " + key + " " + (_this2.props.wordData[key] === _this2.props.selectedText ? "sanastorm-selected" : ""),
                key: key,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 35
                },
                __self: _this2
              },
              React.createElement(
                "div",
                { className: "sanastorm-inflection-type", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 43
                  },
                  __self: _this2
                },
                key
              ),
              React.createElement(
                "div",
                { className: "sanastorm-inflection-value", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 44
                  },
                  __self: _this2
                },
                _this2.props.wordData[key] ? _this2.props.wordData[key] : "-"
              )
            ) : null;
          })
        );

        var expand = !this.state.expandedInflections ? React.createElement(
          "div",
          {
            className: "sanastorm-expand " + INFO_CONTAINER_CLASS,
            onClick: this.expandInflections,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 54
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: "sanastorm-expand-text " + INFO_CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 58
              },
              __self: this
            },
            "MORE"
          ),
          React.createElement("div", { className: "sanastorm-arrow sanastorm-arrow-more", __source: {
              fileName: _jsxFileName,
              lineNumber: 61
            },
            __self: this
          })
        ) : React.createElement(
          "div",
          {
            className: "sanastorm-expand " + INFO_CONTAINER_CLASS,
            onClick: this.expandInflections,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 64
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: "sanastorm-expand-text " + INFO_CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 68
              },
              __self: this
            },
            "LESS"
          ),
          React.createElement("div", { className: "sanastorm-arrow sanastorm-arrow-less", __source: {
              fileName: _jsxFileName,
              lineNumber: 71
            },
            __self: this
          })
        );

        container = React.createElement(
          "div",
          {
            id: "sanastorm-info-container",
            className: INFO_CONTAINER_CLASS,
            style: {
              position: "absolute",
              left: this.props.coords.x - Math.abs(WIDTH - this.props.coords.width) / 2,
              top: this.props.coords.y + 10,
              width: WIDTH,
              height: HEIGHT
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 76
            },
            __self: this
          },
          React.createElement(
            "div",
            { id: "sanastorm-text", className: INFO_CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 89
              },
              __self: this
            },
            React.createElement(
              "div",
              { className: "sanastorm-title " + INFO_CONTAINER_CLASS, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 90
                },
                __self: this
              },
              React.createElement(
                "div",
                { className: "sanastorm-finnish-title", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 91
                  },
                  __self: this
                },
                "FINNISH"
              ),
              React.createElement(
                "div",
                { className: "sanastorm-title-text", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 92
                  },
                  __self: this
                },
                this.props.selectedText
              )
            ),
            React.createElement(
              "div",
              { className: "sanastorm-english " + INFO_CONTAINER_CLASS, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 96
                },
                __self: this
              },
              React.createElement(
                "div",
                { className: "sanastorm-english-title", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 97
                  },
                  __self: this
                },
                "ENGLISH"
              ),
              React.createElement(
                Textfit,
                { mode: "single", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 98
                  },
                  __self: this
                },
                this.props.wordEnglish.join(", ")
              )
            ),
            React.createElement("hr", {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 102
              },
              __self: this
            }),
            inflections
          ),
          expand
        );
      }

      return container;
    }
  }]);

  return InfoContainer;
}(Component);

export default InfoContainer;