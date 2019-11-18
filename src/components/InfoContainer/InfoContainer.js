import React from "react";

const infoContainer = props => {
  let container = null;

  if (props.show) {
    container = (
      <div id="sanastorm-info-container">
        <div
          id="sanastorm-text"
          style={{
            position: "absolute",
            left: props.coords.x,
            top: props.coords.y
          }}
        >
          {props.selectedText}
        </div>
      </div>
    );
  }

  return container;
};

export default infoContainer;
