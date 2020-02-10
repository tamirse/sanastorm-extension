import React from "react";
import PropTypes from "prop-types";

import "./WordDescription.css";

const wordDescription = props => {
  let classes = props.classes.toString().replace(/,/g, " ");

  if (
    props.description === null ||
    props.description === undefined ||
    props.description === ""
  ) {
    return null;
  }

  return (
    <div className={`sanastorm-description ${classes}`}>
      {props.description}
    </div>
  );
};

wordDescription.propTypes = {
  description: PropTypes.string,
  classes: PropTypes.arrayOf(PropTypes.string)
};

export default wordDescription;
