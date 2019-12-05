var _jsxFileName = "src\\components\\InfoContainer\\InflectionsArea\\InflectionArea.js",
    _this = this;

import React from "react";

import utilities from "../../../utilities/utilities";
import * as inflections from "../../../utilities/inflections";
import "./InflectionArea.css";

var inflectionArea = function inflectionArea(props) {
  var inflectionsListExpanded = props.isVerb ? inflections.EXPANDED_KEYS.verbs : inflections.EXPANDED_KEYS.nouns;

  var inflectionsListMinimal = props.isVerb ? inflections.MINIMAL_KEYS.verbs : inflections.MINIMAL_KEYS.nouns;

  return React.createElement(
    "div",
    { id: "sanastorm-inflections", __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      },
      __self: _this
    },
    inflectionsListExpanded.map(function (inflection) {
      // check if inflection is in minimal list
      var isInMinimalList = inflectionsListMinimal.includes(inflection);

      // add plural to inflection name if plural is toggled
      var inflectionName = inflection;
      if (props.pluralToggled) {
        inflection = "pl_" + inflection;
        inflectionName = inflections.nounPlurCodeToDescription(inflection);
      }

      // component to display
      var inflectionRow = null;

      if (props.expandedInflections || isInMinimalList) {
        inflectionRow = React.createElement(
          "div",
          {
            className: "sanastorm-inflection " + inflection + " " + (inflection === props.currentInflection ? "sanastorm-selected" : "") + " " + utilities.CONTAINER_CLASS,
            key: inflection,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 34
            },
            __self: _this
          },
          React.createElement(
            "div",
            {
              className: "sanastorm-inflection-type " + (props.isVerb ? "verb" : "") + " " + utilities.CONTAINER_CLASS,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 42
              },
              __self: _this
            },
            props.isVerb ? inflections.verbCodeToDescription(inflection) : inflectionName
          ),
          React.createElement(
            "div",
            {
              className: "sanastorm-inflection-value " + (props.isVerb ? "verb" : "") + " " + utilities.CONTAINER_CLASS,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 51
              },
              __self: _this
            },
            props.wordData[inflection] ? utilities.csvToNewlines(props.wordData[inflection]) : "-"
          )
        );
      }

      return inflectionRow;
    })
  );
};

export default inflectionArea;