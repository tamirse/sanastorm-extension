var _jsxFileName = "src\\App.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from "react";

import SanastormButton from "./components/SanastormButton/SanastormButton";
import SanastormInfoContainer from "./components/InfoContainer/InfoContainer";
import utilities from "./utilities/utilities";

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      showButton: false,
      showInfoContainer: false,
      selectedText: "",
      buttonCoords: { x: 0, y: 0 },
      infoContainerCoords: { x: 0, y: 0 },
      wordData: null,
      wordEnglish: null
    };

    _this.buttonClickedHandler = _this.buttonClickedHandler.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      console.log("Hei!");

      // bind functionality to document.onmouseup
      document.onmouseup = function (event) {
        // get text selection
        var selection = utilities.getSelection();

        if (selection && !_this2.isTargetInfoContainer(event)) {
          _this2.setState({ selectedText: selection });
          console.log(_this2.state.selectedText);

          if (selection && !_this2.state.showButton && utilities.isSelectionValid(selection)) {
            _this2.getAndSetButtonCoords(event); // set button coordinates (updates state)
            _this2.showButton();
          } else {
            _this2.hideButton();
          }
        }

        if (!_this2.isTargetInfoContainer(event)) {
          _this2.hideInfoContainer();
        }
      };
    }
  }, {
    key: "hideButton",
    value: function hideButton() {
      var _this3 = this;

      setTimeout(function () {
        _this3.setState({ showButton: false });
      }, 10);
    }
  }, {
    key: "showButton",
    value: function showButton() {
      this.setState({ showButton: true });
    }
  }, {
    key: "hideInfoContainer",
    value: function hideInfoContainer() {
      this.setState({ showInfoContainer: false });
    }
  }, {
    key: "isTargetInfoContainer",
    value: function isTargetInfoContainer(event) {
      return event.target.classList.contains("sanastorm-ct");
    }
  }, {
    key: "setButtonCoordinates",
    value: function setButtonCoordinates(x, y) {
      this.setState({
        buttonCoords: { x: x, y: y }
      });
    }
  }, {
    key: "getAndSetButtonCoords",
    value: function getAndSetButtonCoords(event) {
      var _this4 = this;

      var x = event.pageX;
      var y = event.pageY;

      setTimeout(function () {
        var googleTranslateDiv = document.getElementById("gtx-trans");

        if (googleTranslateDiv) {
          var OFFSET = 36;
          x = googleTranslateDiv.style.left;
          y = googleTranslateDiv.style.top;

          _this4.setButtonCoordinates(+x.substring(0, x.length - 2) + OFFSET, y);
        } else {
          _this4.setButtonCoordinates(x, y - 50);
        }
      }, 25);
    }
  }, {
    key: "getWordData",
    value: function getWordData() {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          console.log("FETCHING DATA!");
          var dummyInflections = {
            nominative: "huone",
            genitive: "huoneen",
            partitive: "huonetta",
            inessive: "huonessa",
            elative: "huoneesta",
            illative: "huoneeseen",
            adessive: "huoneella",
            ablative: "huoneelta",
            allative: "huoneelle",
            essive: "huoneena",
            translative: "huoneeksi",
            instructive: null,
            abessive: "huoneetta",
            comitative: null
          };
          var dummyData = {
            inflections: dummyInflections,
            english: ["room", "house (dynasty)", "house(astrology)"]
          };
          resolve(dummyData);
        }, 200);
      });
    }
  }, {
    key: "buttonClickedHandler",
    value: function buttonClickedHandler() {
      var _this5 = this;

      var coords = utilities.getSelectionPosition();

      this.getWordData().then(function (data) {
        console.log(data);

        _this5.setState({
          showButton: false,
          showInfoContainer: true,
          infoContainerCoords: coords,
          wordData: data.inflections,
          wordEnglish: data.english
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        Fragment,
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 143
          },
          __self: this
        },
        React.createElement(SanastormButton, {
          show: this.state.showButton,
          coords: this.state.buttonCoords,
          clicked: this.buttonClickedHandler,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 144
          },
          __self: this
        }),
        React.createElement(SanastormInfoContainer, {
          show: this.state.showInfoContainer,
          coords: this.state.infoContainerCoords,
          selectedText: this.state.selectedText,
          wordData: this.state.wordData,
          wordEnglish: this.state.wordEnglish,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 149
          },
          __self: this
        })
      );
    }
  }]);

  return App;
}(Component);

export default App;