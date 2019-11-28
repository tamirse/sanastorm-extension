var _jsxFileName = "src\\components\\InfoContainer\\InfoContainer.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from "react";
import { Textfit } from "react-textfit"; // used for dynamic font size to fit container

import utilities from "../../utilities/utilities";
import * as inflections from "../../utilities/inflections";

var WIDTH = 260;
var HEIGHT = "auto";

var CONTAINER_CLASS = "sanastorm-ct";

var MINIMAL_KEYS = [inflections.NOMINATIVE, inflections.GENITIVE, inflections.PARTITIVE, inflections.ILLATIVE, inflections.INFINITIVE, inflections.IMPERATIVE, inflections.PASSIVE];

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
    key: "getWordNominativeOrInfinitive",
    value: function getWordNominativeOrInfinitive() {
      var word = null;

      if (this.props.wordData) {
        if (inflections.NOMINATIVE in this.props.wordData) {
          word = this.props.wordData.nominative;
        } else if (inflections.INFINITIVE in this.props.wordData) {
          word = this.props.wordData.infinitive;
        }
      }

      return word;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var word = this.getWordNominativeOrInfinitive();

      var topArea = React.createElement(
        Fragment,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 56
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "sanastorm-title " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 57
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: "sanastorm-finnish-title " + CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 58
              },
              __self: this
            },
            "FINNISH"
          ),
          React.createElement(
            "div",
            { className: "sanastorm-title-text " + CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 61
              },
              __self: this
            },
            this.props.partOfSpeech === "verb" ? this.props.selectedText : word
          )
        ),
        React.createElement(
          "div",
          { className: "sanastorm-english " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 67
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: "sanastorm-english-title " + CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 68
              },
              __self: this
            },
            "ENGLISH"
          ),
          React.createElement(
            Textfit,
            { max: 20, className: CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 71
              },
              __self: this
            },
            this.props.wordEnglish
          )
        )
      );

      var inflections = React.createElement(
        "div",
        { id: "sanastorm-inflections", __source: {
            fileName: _jsxFileName,
            lineNumber: 79
          },
          __self: this
        },
        Object.keys(this.props.wordData).map(function (inflection) {
          return _this2.state.expandedInflections || MINIMAL_KEYS.includes(inflection) ? React.createElement(
            "div",
            {
              className: "sanastorm-inflection " + inflection + " " + (inflection === _this2.props.currentInflection ? "sanastorm-selected" : "") + " " + CONTAINER_CLASS,
              key: inflection,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 83
              },
              __self: _this2
            },
            React.createElement(
              "div",
              { className: "sanastorm-inflection-type " + CONTAINER_CLASS, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 91
                },
                __self: _this2
              },
              inflection
            ),
            React.createElement(
              "div",
              { className: "sanastorm-inflection-value " + CONTAINER_CLASS, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 94
                },
                __self: _this2
              },
              _this2.props.wordData[inflection] ? utilities.csvToNewlines(_this2.props.wordData[inflection]) : "-"
            )
          ) : null;
        })
      );

      var wiktLink = React.createElement(
        "a",
        {
          className: "sanastorm-wikt " + CONTAINER_CLASS,
          href: "https://en.wiktionary.org/wiki/" + (word ? word : this.props.selectedText),
          target: "_blank",
          rel: "noopener noreferrer",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 106
          },
          __self: this
        },
        React.createElement("img", {
          className: CONTAINER_CLASS,
          src: chrome.runtime.getURL("images/wikt.png"),
          alt: "link to wiktionary",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 115
          },
          __self: this
        })
      );

      var expand = !this.state.expandedInflections ? React.createElement(
        "div",
        {
          className: "sanastorm-expand " + CONTAINER_CLASS,
          onClick: this.toggleInflections,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 124
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "sanastorm-expand-text " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 128
            },
            __self: this
          },
          "MORE"
        ),
        React.createElement("div", {
          className: "sanastorm-arrow sanastorm-arrow-more " + CONTAINER_CLASS,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 129
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
            lineNumber: 134
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "sanastorm-expand-text " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 138
            },
            __self: this
          },
          "LESS"
        ),
        React.createElement("div", {
          className: "sanastorm-arrow sanastorm-arrow-less " + CONTAINER_CLASS,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 139
          },
          __self: this
        })
      );

      var container = React.createElement(
        "div",
        {
          id: "sanastorm-info-container",
          className: CONTAINER_CLASS + " " + (this.state.expandedInflections ? "expanded" : ""),
          style: {
            position: "absolute",
            left: this.props.coords.x - Math.abs(WIDTH - this.props.coords.width) / 2,
            top: this.props.coords.y + 12,
            width: WIDTH + this.props.selectedText.length * 2,
            height: HEIGHT
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 146
          },
          __self: this
        },
        React.createElement(
          "div",
          { id: "sanastorm-text", className: CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 160
            },
            __self: this
          },
          topArea,
          React.createElement("hr", { className: CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 162
            },
            __self: this
          }),
          inflections
        ),
        React.createElement(
          "div",
          { className: "sanastorm-footer " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 165
            },
            __self: this
          },
          expand,
          wiktLink
        )
      );

      return container;
    }
  }]);

  return InfoContainer;
}(Component);

export default InfoContainer;