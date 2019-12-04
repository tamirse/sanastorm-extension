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
import WordDescription from "../WordDescription/WordDescription";
import "./InfoContainer.css";

var WIDTH = 260;
var HEIGHT = "auto";

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
    key: "createWordDescriptions",
    value: function createWordDescriptions() {
      var descriptionText = "";
      var classes = [];

      // get verb description
      if (this.isVerb()) {
        return React.createElement(
          Fragment,
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 54
            },
            __self: this
          },
          React.createElement(WordDescription, { description: "verb", classes: ["sanastorm-verb"], __source: {
              fileName: _jsxFileName,
              lineNumber: 55
            },
            __self: this
          }),
          React.createElement(WordDescription, {
            description: inflections.verbCodeToDescription(this.props.currentInflection),
            classes: ["sanastorm-verb-description"],
            __source: {
              fileName: _jsxFileName,
              lineNumber: 56
            },
            __self: this
          })
        );
      }

      // get non-verb description
      if (this.state.pluralToggled) {
        descriptionText = "plural";
        classes.push("sanastorm-plural");
      } else {
        descriptionText = "singular";
        classes.push("sanastorm-singular");
      }

      return React.createElement(
        Fragment,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 76
          },
          __self: this
        },
        React.createElement(WordDescription, {
          description: this.props.currentInflection,
          classes: ["sanastorm-case"],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 77
          },
          __self: this
        }),
        React.createElement(WordDescription, { description: descriptionText, classes: classes, __source: {
            fileName: _jsxFileName,
            lineNumber: 81
          },
          __self: this
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var word = utilities.getWordNominativeOrInfinitive(this.props.wordData);

      var finnishDisplayWord = this.isVerb() ? this.props.selectedText : this.state.pluralToggled ? this.props.wordData[inflections.NOMINATIVE_PLURAL] : word;

      var topArea = React.createElement(
        Fragment,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 96
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "sanastorm-title " + utilities.CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 97
            },
            __self: this
          },
          React.createElement(
            "div",
            {
              className: "sanastorm-finnish-title " + utilities.CONTAINER_CLASS,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 98
              },
              __self: this
            },
            "FINNISH"
          ),
          React.createElement(
            "div",
            { className: "sanastorm-title-text " + utilities.CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 103
              },
              __self: this
            },
            finnishDisplayWord
          )
        ),
        React.createElement(
          "div",
          { className: "sanastorm-english " + utilities.CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 107
            },
            __self: this
          },
          React.createElement(
            "div",
            {
              className: "sanastorm-english-title " + utilities.CONTAINER_CLASS,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 108
              },
              __self: this
            },
            "ENGLISH"
          ),
          React.createElement(
            Textfit,
            { max: 20, className: utilities.CONTAINER_CLASS, __source: {
                fileName: _jsxFileName,
                lineNumber: 113
              },
              __self: this
            },
            this.props.wordEnglish
          ),
          this.props.noData ? null : React.createElement(
            "div",
            {
              className: "sanastorm-word-descriptions " + utilities.CONTAINER_CLASS,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 117
              },
              __self: this
            },
            this.createWordDescriptions()
          ),
          this.props.noData || this.isVerb() ? null : React.createElement(ToggleSwitch, {
            className: "sanastorm-ct sanastorm-toggle",
            changed: this.togglePlural,
            checked: this.state.pluralToggled,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 124
            },
            __self: this
          })
        )
      );

      var inflectionsArea = React.createElement(
        "div",
        { id: "sanastorm-inflections", __source: {
            fileName: _jsxFileName,
            lineNumber: 135
          },
          __self: this
        },
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
                className: "sanastorm-inflection " + inflection + " " + (inflection === _this2.props.currentInflection ? "sanastorm-selected" : "") + " " + utilities.CONTAINER_CLASS,
                key: inflection,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 155
                },
                __self: _this2
              },
              React.createElement(
                "div",
                {
                  className: "sanastorm-inflection-type " + (_this2.isVerb() ? "verb" : "") + " " + utilities.CONTAINER_CLASS,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 163
                  },
                  __self: _this2
                },
                _this2.isVerb() ? inflections.verbCodeToDescription(inflection) : inflectionName
              ),
              React.createElement(
                "div",
                {
                  className: "sanastorm-inflection-value " + (_this2.isVerb() ? "verb" : "") + " " + utilities.CONTAINER_CLASS,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 172
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
          className: "sanastorm-wikt " + utilities.CONTAINER_CLASS,
          href: "https://en.wiktionary.org/wiki/" + (word ? word : this.props.selectedText.toLowerCase()),
          target: "_blank",
          rel: "noopener noreferrer",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 191
          },
          __self: this
        },
        React.createElement("img", {
          className: utilities.CONTAINER_CLASS,
          src: chrome.runtime.getURL("images/wikt.png"),
          alt: "link to wiktionary",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 200
          },
          __self: this
        })
      );

      var expand = !this.state.expandedInflections ? React.createElement(
        "div",
        {
          className: "sanastorm-expand " + utilities.CONTAINER_CLASS,
          onClick: this.toggleInflections,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 209
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "sanastorm-expand-text " + utilities.CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 213
            },
            __self: this
          },
          "MORE"
        ),
        React.createElement("div", {
          className: "sanastorm-arrow sanastorm-arrow-more " + utilities.CONTAINER_CLASS,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 216
          },
          __self: this
        })
      ) : React.createElement(
        "div",
        {
          className: "sanastorm-expand " + utilities.CONTAINER_CLASS,
          onClick: this.toggleInflections,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 221
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "sanastorm-expand-text " + utilities.CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 225
            },
            __self: this
          },
          "LESS"
        ),
        React.createElement("div", {
          className: "sanastorm-arrow sanastorm-arrow-less " + utilities.CONTAINER_CLASS,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 228
          },
          __self: this
        })
      );

      var container = React.createElement(
        "div",
        {
          id: "sanastorm-info-container",
          className: utilities.CONTAINER_CLASS + " " + (this.state.expandedInflections ? "expanded" : ""),
          style: {
            position: "absolute",
            left: this.props.coords.x - Math.abs(this.calculateWidth() - this.props.coords.width) / 2,
            top: this.props.coords.y + 12,
            width: this.calculateWidth(),
            height: HEIGHT
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 235
          },
          __self: this
        },
        React.createElement(
          "div",
          { id: "sanastorm-text", className: utilities.CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 250
            },
            __self: this
          },
          topArea,
          React.createElement("hr", { className: utilities.CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 252
            },
            __self: this
          }),
          inflectionsArea
        ),
        React.createElement(
          "div",
          { className: "sanastorm-footer " + utilities.CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 255
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