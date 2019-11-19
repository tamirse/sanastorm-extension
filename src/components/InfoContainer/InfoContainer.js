import React from "react";
import { Textfit } from "react-textfit"; // used for dynamic font size to fit container

const WIDTH = 250;
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
          <div className={`sanastorm-title ${INFO_CONTAINER_CLASS}`}>
            <div className="sanastorm-finnish-title">FINNISH</div>
            <div className="sanastorm-title-text">{props.selectedText}</div>
          </div>
          <div className={`sanastorm-english ${INFO_CONTAINER_CLASS}`}>
            <div className="sanastorm-english-title">ENGLISH</div>
            <Textfit mode="single">{props.wordEnglish.join(", ")}</Textfit>
          </div>
          <hr></hr>
          <div id="sanastorm-inflections">
            {Object.keys(props.wordData).map((key, index) => (
              <div
                className={`sanastorm-inflection  ${key} ${
                  props.wordData[key] === props.selectedText
                    ? "sanastorm-selected"
                    : ""
                }`}
                key={key}
              >
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
