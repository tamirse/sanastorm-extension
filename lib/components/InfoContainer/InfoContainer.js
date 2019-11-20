var _jsxFileName = "src\\components\\InfoContainer\\InfoContainer.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import { Textfit } from "react-textfit"; // used for dynamic font size to fit container

var WIDTH = 250;
var HEIGHT = "auto";

var CONTAINER_CLASS = "sanastorm-ct";

var NARROW_KEYS = ["nominative", "genitive", "partitive", "illative", "infinitive", "imperative", "passive"];

var InfoContainer = function (_Component) {
  _inherits(InfoContainer, _Component);

  function InfoContainer(props) {
    _classCallCheck(this, InfoContainer);

    var _this = _possibleConstructorReturn(this, (InfoContainer.__proto__ || Object.getPrototypeOf(InfoContainer)).call(this, props));

    _this.state = {
      expandedInflections: false
    };

    _this.toggleInflections = _this.toggleInflections.bind(_this);
    return _this;
  }

  _createClass(InfoContainer, [{
    key: "toggleInflections",
    value: function toggleInflections() {
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
              lineNumber: 40
            },
            __self: this
          },
          Object.keys(this.props.wordData).map(function (key, index) {
            return _this2.state.expandedInflections || NARROW_KEYS.includes(key) ? React.createElement(
              "div",
              {
                className: "sanastorm-inflection " + key + " " + (_this2.props.wordData[key] === _this2.props.selectedText ? "sanastorm-selected" : "") + " " + CONTAINER_CLASS,
                key: key,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 43
                },
                __self: _this2
              },
              React.createElement(
                "div",
                { className: "sanastorm-inflection-type " + CONTAINER_CLASS, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 51
                  },
                  __self: _this2
                },
                key
              ),
              React.createElement(
                "div",
                {
                  className: "sanastorm-inflection-value " + CONTAINER_CLASS,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 54
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
            className: "sanastorm-expand " + CONTAINER_CLASS,
            onClick: this.toggleInflections,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 66
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: "sanastorm-expand-text " + CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 70
              },
              __self: this
            },
            "MORE"
          ),
          React.createElement("div", {
            className: "sanastorm-arrow sanastorm-arrow-more " + CONTAINER_CLASS,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 71
            },
            __self: this
          })
        ) : React.createElement(
          "div",
          {
            className: "sanastorm-expand " + CONTAINER_CLASS,
            onClick: this.toggleInflections,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 76
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: "sanastorm-expand-text " + CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 80
              },
              __self: this
            },
            "LESS"
          ),
          React.createElement("div", {
            className: "sanastorm-arrow sanastorm-arrow-less " + CONTAINER_CLASS,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 81
            },
            __self: this
          })
        );

        container = React.createElement(
          "div",
          {
            id: "sanastorm-info-container",
            className: CONTAINER_CLASS + " " + (this.state.expandedInflections ? "expanded" : ""),
            style: {
              position: "absolute",
              left: this.props.coords.x - Math.abs(WIDTH - this.props.coords.width) / 2,
              top: this.props.coords.y + 12,
              width: WIDTH,
              height: HEIGHT
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 88
            },
            __self: this
          },
          React.createElement(
            "div",
            { id: "sanastorm-text", className: CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 103
              },
              __self: this
            },
            React.createElement(
              "div",
              { className: "sanastorm-title " + CONTAINER_CLASS, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 104
                },
                __self: this
              },
              React.createElement(
                "div",
                { className: "sanastorm-finnish-title " + CONTAINER_CLASS, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 105
                  },
                  __self: this
                },
                "FINNISH"
              ),
              React.createElement(
                "div",
                { className: "sanastorm-title-text " + CONTAINER_CLASS, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 108
                  },
                  __self: this
                },
                this.props.selectedText
              )
            ),
            React.createElement(
              "div",
              { className: "sanastorm-english " + CONTAINER_CLASS, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 112
                },
                __self: this
              },
              React.createElement(
                "div",
                { className: "sanastorm-english-title " + CONTAINER_CLASS, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 113
                  },
                  __self: this
                },
                "ENGLISH"
              ),
              React.createElement(
                Textfit,
                { mode: "single", className: CONTAINER_CLASS, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 116
                  },
                  __self: this
                },
                this.props.wordEnglish.join(", ")
              )
            ),
            React.createElement("hr", { className: CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 120
              },
              __self: this
            }),
            inflections
          ),
          React.createElement(
            "div",
            { className: "sanastorm-footer " + CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 123
              },
              __self: this
            },
            expand,
            React.createElement(
              "a",
              {
                className: "sanastorm-wikt " + CONTAINER_CLASS,
                href: "https://en.wiktionary.org/wiki/" + this.props.wordData.nominative,
                target: "_blank",
                rel: "noopener noreferrer",
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 125
                },
                __self: this
              },
              React.createElement("img", {
                className: CONTAINER_CLASS,
                src: chrome.runtime.getURL("images/wikt.png"),
                alt: "link to wiktionary",
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 134
                },
                __self: this
              })
            )
          )
        );
      }

      return container;
    }
  }]);

  return InfoContainer;
}(Component);

export default InfoContainer;