import React from "react";
import PropTypes from "prop-types";

import "./WordDescription.css";
import utilities from "../../utilities/utilities";

const wordDescription = props => {
  let classes = props.classes.toString().replace(/,/g, " ");

  return (
    <div
      className={`sanastorm-description ${classes} ${utilities.CONTAINER_CLASS}`}
    >
      {props.description}
    </div>
  );
};

wordDescription.propTypes = {
  description: PropTypes.string,
  classes: PropTypes.arrayOf(PropTypes.string)
};

export default wordDescription;
