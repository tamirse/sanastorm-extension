var _jsxFileName = "src\\components\\InfoContainer\\WordDescription\\WordDescription.js",
    _this = this;

import React from "react";
import PropTypes from "prop-types";

import "./WordDescription.css";
import utilities from "../../../utilities/utilities";

var wordDescription = function wordDescription(props) {
  var classes = props.classes.toString().replace(/,/g, " ");

  return React.createElement(
    "div",
    {
      className: "sanastorm-description " + classes + " " + utilities.CONTAINER_CLASS,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      },
      __self: _this
    },
    props.description
  );
};

wordDescription.propTypes = {
  description: PropTypes.string,
  classes: PropTypes.arrayOf(PropTypes.string)
};

export default wordDescription;