import React from "react";

const WIDTH = 100;
const HEIGHT = 100;

const infoContainer = props => {
  let container = null;

  if (props.show) {
    container = (
      <div
        id="sanastorm-info-container"
        style={{
          position: "absolute",
          left: props.coords.x - Math.abs(WIDTH - props.coords.width) / 2,
          top: props.coords.y + 10,
          width: WIDTH,
          height: HEIGHT
        }}
      >
        <div id="sanastorm-text">{props.selectedText}</div>
      </div>
    );
  }

  return container;
};

export default infoContainer;
