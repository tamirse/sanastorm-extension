var _jsxFileName = "src\\components\\InfoContainer\\InfoContainer.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from "react";
import { Textfit } from "react-textfit"; // used for dynamic font size to fit container

import utilities from "../../utilities/utilities";
import * as inflections from "../../utilities/inflections";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

var WIDTH = 260;
var HEIGHT = "auto";

var CONTAINER_CLASS = "sanastorm-ct";

var InfoContainer = function (_Component) {
  _inherits(InfoContainer, _Component);

  function InfoContainer(props) {
    _classCallCheck(this, InfoContainer);

    var _this = _possibleConstructorReturn(this, (InfoContainer.__proto__ || Object.getPrototypeOf(InfoContainer)).call(this, props));

    _this.state = {
      expandedInflections: false,
      pluralToggled: false
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
    key: "togglePlural",
    value: function togglePlural() {
      this.setState(function (prev, props) {
        return {
          pluralToggled: !prev.pluralToggled
        };
      });
    }
  }, {
    key: "isVerb",
    value: function isVerb() {
      return this.props.partOfSpeech === "verb";
    }
  }, {
    key: "isNounPlural",
    value: function isNounPlural() {
      return utilities.isNounPlural(this.props.selectedText, this.props.wordData);
    }
  }, {
    key: "calculateWidth",
    value: function calculateWidth() {
      return WIDTH + this.props.selectedText.length * 2 + (this.isVerb() ? 90 : 0);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var word = utilities.getWordNominativeOrInfinitive(this.props.wordData);

      var addedWordDescription = "";
      if (this.isVerb()) {
        addedWordDescription = inflections.verbCodeToDescription(this.props.currentInflection);
      } else if (this.isNounPlural()) {
        this.togglePlural(); // toggle from singular to plural
        addedWordDescription = "plural";
      } else {
        addedWordDescription = "singular";
      }

      var topArea = React.createElement(
        Fragment,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 66
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "sanastorm-title " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 67
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: "sanastorm-finnish-title " + CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 68
              },
              __self: this
            },
            "FINNISH"
          ),
          React.createElement(
            "div",
            { className: "sanastorm-title-text " + CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 71
              },
              __self: this
            },
            this.isVerb() || this.isNounPlural() ? this.props.selectedText : word
          )
        ),
        React.createElement(
          "div",
          { className: "sanastorm-english " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 77
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: "sanastorm-english-title " + CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 78
              },
              __self: this
            },
            "ENGLISH"
          ),
          React.createElement(
            Textfit,
            { max: 20, className: CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 81
              },
              __self: this
            },
            this.props.wordEnglish
          ),
          this.props.noData ? null : React.createElement(
            "div",
            { className: "sanastorm-verb " + CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 85
              },
              __self: this
            },
            addedWordDescription
          )
        )
      );

      var inflectionsArea = React.createElement(
        "div",
        { id: "sanastorm-inflections", __source: {
            fileName: _jsxFileName,
            lineNumber: 94
          },
          __self: this
        },
        Object.keys(this.props.wordData).map(function (inflection) {
          var isExpanded = _this2.state.expandedInflections && inflections.EXPANDED_KEYS.includes(inflection);

          var isInflectionInMinimalList = inflections.MINIMAL_KEYS.includes(inflection);

          var inflectionName = inflection;
          if (_this2.isNounPlural()) {
            inflection = "pl_" + inflection;
            inflectionName = inflections.nounCodeToDescription(inflection);
          }

          var inflectionRow = null;

          if (isExpanded || isInflectionInMinimalList) {
            inflectionRow = React.createElement(
              "div",
              {
                className: "sanastorm-inflection " + inflection + " " + (inflection === _this2.props.currentInflection ? "sanastorm-selected" : "") + " " + CONTAINER_CLASS,
                key: inflection,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 114
                },
                __self: _this2
              },
              React.createElement(
                "div",
                {
                  className: "sanastorm-inflection-type " + (_this2.isVerb() ? "verb" : "") + " " + CONTAINER_CLASS,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 122
                  },
                  __self: _this2
                },
                _this2.isVerb() ? inflections.verbCodeToDescription(inflection) : inflectionName
              ),
              React.createElement(
                "div",
                {
                  className: "sanastorm-inflection-value " + (_this2.isVerb() ? "verb" : "") + " " + CONTAINER_CLASS,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 131
                  },
                  __self: _this2
                },
                _this2.props.wordData[inflection] ? utilities.csvToNewlines(_this2.props.wordData[inflection]) : "-"
              )
            );
          }

          return inflectionRow;
        })
      );

      var wiktLink = React.createElement(
        "a",
        {
          className: "sanastorm-wikt " + CONTAINER_CLASS,
          href: "https://en.wiktionary.org/wiki/" + (word ? word : this.props.selectedText.toLowerCase()),
          target: "_blank",
          rel: "noopener noreferrer",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 150
          },
          __self: this
        },
        React.createElement("img", {
          className: CONTAINER_CLASS,
          src: chrome.runtime.getURL("images/wikt.png"),
          alt: "link to wiktionary",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 159
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
            lineNumber: 168
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "sanastorm-expand-text " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 172
            },
            __self: this
          },
          "MORE"
        ),
        React.createElement("div", {
          className: "sanastorm-arrow sanastorm-arrow-more " + CONTAINER_CLASS,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 173
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
            lineNumber: 178
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "sanastorm-expand-text " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 182
            },
            __self: this
          },
          "LESS"
        ),
        React.createElement("div", {
          className: "sanastorm-arrow sanastorm-arrow-less " + CONTAINER_CLASS,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 183
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
            left: this.props.coords.x - Math.abs(this.calculateWidth() - this.props.coords.width) / 2,
            top: this.props.coords.y + 12,
            width: this.calculateWidth(),
            height: HEIGHT
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 190
          },
          __self: this
        },
        React.createElement(
          "div",
          { id: "sanastorm-text", className: CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 205
            },
            __self: this
          },
          topArea,
          React.createElement(ToggleSwitch, { className: "sanastorm-ct sanastorm-toggle", __source: {
              fileName: _jsxFileName,
              lineNumber: 207
            },
            __self: this
          }),
          React.createElement("hr", { className: CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 208
            },
            __self: this
          }),
          inflectionsArea
        ),
        React.createElement(
          "div",
          { className: "sanastorm-footer " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 211
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