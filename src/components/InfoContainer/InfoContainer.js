import React from "react";

const WIDTH = 200;
const HEIGHT = "auto";

const INFO_CONTAINER_CLASS = "sanastorm-ct";

const infoContainer = props => {
  let container = null;

  if (props.show) {
    container = (
      <div
        id="sanastorm-info-container"
        className={INFO_CONTAINER_CLASS}
        style={{
          position: "absolute",
          left: props.coords.x - Math.abs(WIDTH - props.coords.width) / 2,
          top: props.coords.y + 10,
          width: WIDTH,
          height: HEIGHT
        }}
      >
        <div id="sanastorm-text" className={INFO_CONTAINER_CLASS}>
          <div className={`sanastorm-selection ${INFO_CONTAINER_CLASS}`}>
            {props.selectedText}
          </div>
          <div className={`sanastorm-english ${INFO_CONTAINER_CLASS}`}>
            {props.wordEnglish.join(", ")}
          </div>
          <hr></hr>
          <div id="sanastorm-inflections">
            {Object.keys(props.wordData).map((key, index) => (
              <div className={`sanastorm-inflection ${key}`} key={key}>
                <div className="sanastorm-inflection-type">{key}</div>
                <div className="sanastorm-inflection-value">
                  {props.wordData[key] ? props.wordData[key] : "-"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return container;
};

export default infoContainer;
