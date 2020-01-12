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

  function App() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      showButton: false,
      showInfoContainer: false,
      selectedText: "",
      selectedElement: null,
      buttonCoords: { x: 0, y: 0 },
      infoContainerCoords: { x: 0, y: 0 },
      wordData: null,
      wordEnglish: null,
      partOfSpeech: null,
      noData: false
    }, _this.buttonClickedHandler = function () {
      var coords = utilities.getSelectionPosition(_this.state.selectedElement);

      _this.getWordData().then(function (data) {
        var partOfSpeech = data.partOfSpeech;

        if (data["omorfi"] !== undefined) {
          if (data["omorfi"]["UPOS"] !== undefined) {
            partOfSpeech = data["omorfi"]["UPOS"];
          }
        }

        _this.setState({
          showButton: false,
          showInfoContainer: true,
          infoContainerCoords: coords,
          wordData: data.inflections,
          wordEnglish: data.english ? data.english : "-",
          partOfSpeech: partOfSpeech,
          noData: data.noData
        });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // bind functionality to document.onmousedown
      // if selection already exists when pressing mouse button, don't display sanastorm button
      document.onmousedown = function (event) {
        var selection = utilities.getSelection();

        if (selection && !utilities.isTargetSanastormButton(event)) {
          _this2.hideButton();
        } else if (selection && utilities.isTargetSanastormButton(event)) {
          _this2.buttonClickedHandler();
        } else if (!selection) {
          _this2.hideButton();
        }
      };

      // bind functionality to document.onmouseup
      document.onmouseup = function (event) {
        // get text selection
        var selection = utilities.getSelection();
        var selectedElement = utilities.getSelectedElement();

        if (selection && !utilities.isTargetInfoContainer(event)) {
          // we save the selection object
          // because the selection may disappear, and we need to extract
          // the selection position from the selection object
          _this2.setState({
            selectedText: selection,
            selectedElement: selectedElement
          });

          if (selection && !_this2.state.showButton && utilities.isSelectionValid(selection)) {
            _this2.getAndSetButtonCoords(event); // set button coordinates (updates state)
            _this2.showButton();
          } else {
            _this2.hideButton();
          }
        }

        // if pressing outside of info container, hide it
        if (!utilities.isTargetInfoContainer(event)) {
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
    key: "fetchResource",
    value: function fetchResource(input, init) {
      return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage({ input: input, init: init }, function (messageResponse) {
          resolve(messageResponse);
        });
      });
    }
  }, {
    key: "getWordData",
    value: function getWordData() {
      var _this5 = this;

      var word = this.state.selectedText;
      var baseURL = "http://3.125.249.95:3000/api/sana/";

      return new Promise(function (resolve, reject) {
        _this5.fetchResource(baseURL + word).then(function (res) {
          var noDataResponse = {
            inflections: {
              Alert: "No data, sorry!",
              Partitive: "No dataa, sorrya!"
            },
            english: "No data, sorry!",
            noData: true
          };

          if (res) {
            res = JSON.parse(res);
            if (Object.keys(res).length === 0) {
              resolve(noDataResponse);
            }
            resolve(res);
          } else {
            resolve(noDataResponse);
          }
        }).catch(function (e) {
          return console.log(e);
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
            lineNumber: 173
          },
          __self: this
        },
        this.state.showButton ? React.createElement(SanastormButton, { coords: this.state.buttonCoords, __source: {
            fileName: _jsxFileName,
            lineNumber: 175
          },
          __self: this
        }) : null,
        this.state.showInfoContainer ? React.createElement(SanastormInfoContainer, {
          coords: this.state.infoContainerCoords,
          selectedText: this.state.selectedText,
          wordData: this.state.wordData,
          wordEnglish: this.state.wordEnglish,
          partOfSpeech: this.state.partOfSpeech,
          currentInflection: utilities.getSelectedWordInflection(this.state.selectedText, this.state.wordData),
          noData: this.state.noData,
          isPlural: utilities.isNounPlural(this.state.selectedText, this.state.wordData),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 178
          },
          __self: this
        }) : null
      );
    }
  }]);

  return App;
}(Component);

export default App;