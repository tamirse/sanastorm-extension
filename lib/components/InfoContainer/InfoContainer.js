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
import "./InfoContainer.css";

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
      pluralToggled: _this.props.isPlural
    };

    _this.toggleInflections = _this.toggleInflections.bind(_this);
    _this.togglePlural = _this.togglePlural.bind(_this);
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
      } else if (this.state.pluralToggled) {
        addedWordDescription = "plural";
      } else {
        addedWordDescription = "singular";
      }

      var finnishDisplayWord = this.isVerb() ? this.props.selectedText : this.state.pluralToggled ? this.props.wordData[inflections.NOMINATIVE_PLURAL] : word;

      var topArea = React.createElement(
        Fragment,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 69
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "sanastorm-title " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 70
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: "sanastorm-finnish-title " + CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 71
              },
              __self: this
            },
            "FINNISH"
          ),
          React.createElement(
            "div",
            { className: "sanastorm-title-text " + CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 74
              },
              __self: this
            },
            finnishDisplayWord
          )
        ),
        React.createElement(
          "div",
          { className: "sanastorm-english " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 78
            },
            __self: this
          },
          React.createElement(
            "div",
            { className: "sanastorm-english-title " + CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 79
              },
              __self: this
            },
            "ENGLISH"
          ),
          React.createElement(
            Textfit,
            { max: 20, className: CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 82
              },
              __self: this
            },
            this.props.wordEnglish
          ),
          this.props.noData ? null : React.createElement(
            "div",
            { className: "sanastorm-verb " + CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 86
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
            lineNumber: 95
          },
          __self: this
        },
        this.props.noData || this.isVerb() ? null : React.createElement(ToggleSwitch, {
          className: "sanastorm-ct sanastorm-toggle",
          changed: this.togglePlural,
          checked: this.state.pluralToggled,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 97
          },
          __self: this
        }),
        Object.keys(this.props.wordData).map(function (inflection) {
          var isExpanded = _this2.state.expandedInflections && inflections.EXPANDED_KEYS.includes(inflection);

          var isInflectionInMinimalList = inflections.MINIMAL_KEYS.includes(inflection);

          var inflectionName = inflection;
          if (_this2.state.pluralToggled) {
            inflection = "pl_" + inflection;
            inflectionName = inflections.nounPlurCodeToDescription(inflection);
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
                  lineNumber: 122
                },
                __self: _this2
              },
              React.createElement(
                "div",
                {
                  className: "sanastorm-inflection-type " + (_this2.isVerb() ? "verb" : "") + " " + CONTAINER_CLASS,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 130
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
                    lineNumber: 139
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
            lineNumber: 158
          },
          __self: this
        },
        React.createElement("img", {
          className: CONTAINER_CLASS,
          src: chrome.runtime.getURL("images/wikt.png"),
          alt: "link to wiktionary",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 167
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
            lineNumber: 176
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "sanastorm-expand-text " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 180
            },
            __self: this
          },
          "MORE"
        ),
        React.createElement("div", {
          className: "sanastorm-arrow sanastorm-arrow-more " + CONTAINER_CLASS,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 181
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
            lineNumber: 186
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "sanastorm-expand-text " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 190
            },
            __self: this
          },
          "LESS"
        ),
        React.createElement("div", {
          className: "sanastorm-arrow sanastorm-arrow-less " + CONTAINER_CLASS,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 191
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
            lineNumber: 198
          },
          __self: this
        },
        React.createElement(
          "div",
          { id: "sanastorm-text", className: CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 213
            },
            __self: this
          },
          topArea,
          React.createElement("hr", { className: CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 215
            },
            __self: this
          }),
          inflectionsArea
        ),
        React.createElement(
          "div",
          { className: "sanastorm-footer " + CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 218
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