var _jsxFileName = "src\\components\\InfoContainer\\InfoContainer.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";

import utilities from "../../utilities/utilities";
import InflectionArea from "./InflectionsArea/InflectionArea";
import TopArea from "./TopArea/TopArea";
import "./InfoContainer.css";

var WIDTH = 260;
var HEIGHT = "auto";

var InfoContainer = function (_Component) {
  _inherits(InfoContainer, _Component);

  function InfoContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InfoContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InfoContainer.__proto__ || Object.getPrototypeOf(InfoContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expandedInflections: false,
      pluralToggled: _this.props.isPlural
    }, _this.toggleInflections = function () {
      _this.setState(function (prev, props) {
        return {
          expandedInflections: !prev.expandedInflections
        };
      });
    }, _this.togglePlural = function () {
      _this.setState(function (prev, props) {
        return {
          pluralToggled: !prev.pluralToggled
        };
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InfoContainer, [{
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
      var word = utilities.getWordNominativeOrInfinitive(this.props.wordData);

      var wiktLink = React.createElement(
        "a",
        {
          className: "sanastorm-wikt " + utilities.CONTAINER_CLASS,
          href: "https://en.wiktionary.org/wiki/" + (word ? word : this.props.selectedText.toLowerCase()),
          target: "_blank",
          rel: "noopener noreferrer",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 43
          },
          __self: this
        },
        React.createElement("img", {
          className: utilities.CONTAINER_CLASS,
          src: chrome.runtime.getURL("images/wikt.png"),
          alt: "link to wiktionary",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 52
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
            lineNumber: 61
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "sanastorm-expand-text " + utilities.CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 65
            },
            __self: this
          },
          "MORE"
        ),
        React.createElement("div", {
          className: "sanastorm-arrow sanastorm-arrow-more " + utilities.CONTAINER_CLASS,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 68
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
            lineNumber: 73
          },
          __self: this
        },
        React.createElement(
          "div",
          { className: "sanastorm-expand-text " + utilities.CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 77
            },
            __self: this
          },
          "LESS"
        ),
        React.createElement("div", {
          className: "sanastorm-arrow sanastorm-arrow-less " + utilities.CONTAINER_CLASS,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 80
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
            lineNumber: 87
          },
          __self: this
        },
        React.createElement(
          "div",
          { id: "sanastorm-text", className: utilities.CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 102
            },
            __self: this
          },
          React.createElement(TopArea, {
            isVerb: this.isVerb(),
            pluralToggled: this.state.pluralToggled,
            togglePlural: this.togglePlural,
            currentInflection: this.props.currentInflection,
            wordData: this.props.wordData,
            selectedText: this.props.selectedText,
            wordEnglish: this.props.wordEnglish,
            noData: this.props.noData,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 103
            },
            __self: this
          }),
          React.createElement("hr", { className: utilities.CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 113
            },
            __self: this
          }),
          this.props.noData ? null : React.createElement(InflectionArea, {
            isVerb: this.isVerb(),
            pluralToggled: this.state.pluralToggled,
            expandedInflections: this.state.expandedInflections,
            currentInflection: this.props.currentInflection,
            wordData: this.props.wordData,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 115
            },
            __self: this
          })
        ),
        React.createElement(
          "div",
          { className: "sanastorm-footer " + utilities.CONTAINER_CLASS, __source: {
              fileName: _jsxFileName,
              lineNumber: 124
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