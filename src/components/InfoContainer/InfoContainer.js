import React, { Component } from "react";
import { Textfit } from "react-textfit"; // used for dynamic font size to fit container

const WIDTH = 260;
const HEIGHT = "auto";

const CONTAINER_CLASS = "sanastorm-ct";

const NARROW_KEYS = [
  "nominative",
  "genitive",
  "partitive",
  "illative",
  "infinitive",
  "imperative",
  "passive"
];

class InfoContainer extends Component {
  state = {
    expandedInflections: false
  };

  constructor(props) {
    super(props);
    this.toggleInflections = this.toggleInflections.bind(this);
  }

  toggleInflections() {
    this.setState((prev, props) => ({
      expandedInflections: !prev.expandedInflections
    }));
  }

  render() {
    let container = null;

    if (this.props.show) {
      let inflections = (
        <div id="sanastorm-inflections">
          {Object.keys(this.props.wordData).map((key, index) =>
            this.state.expandedInflections || NARROW_KEYS.includes(key) ? (
              <div
                className={`sanastorm-inflection ${key} ${
                  this.props.wordData[key] === this.props.selectedText
                    ? "sanastorm-selected"
                    : ""
                } ${CONTAINER_CLASS}`}
                key={key}
              >
                <div className={`sanastorm-inflection-type ${CONTAINER_CLASS}`}>
                  {key}
                </div>
                <div
                  className={`sanastorm-inflection-value ${CONTAINER_CLASS}`}
                >
                  {this.props.wordData[key] ? this.props.wordData[key] : "-"}
                </div>
              </div>
            ) : null
          )}
        </div>
      );

      let expand = !this.state.expandedInflections ? (
        <div
          className={`sanastorm-expand ${CONTAINER_CLASS}`}
          onClick={this.toggleInflections}
        >
          <div className={`sanastorm-expand-text ${CONTAINER_CLASS}`}>MORE</div>
          <div
            className={`sanastorm-arrow sanastorm-arrow-more ${CONTAINER_CLASS}`}
          ></div>
        </div>
      ) : (
        <div
          className={`sanastorm-expand ${CONTAINER_CLASS}`}
          onClick={this.toggleInflections}
        >
          <div className={`sanastorm-expand-text ${CONTAINER_CLASS}`}>LESS</div>
          <div
            className={`sanastorm-arrow sanastorm-arrow-less ${CONTAINER_CLASS}`}
          ></div>
        </div>
      );

      container = (
        <div
          id="sanastorm-info-container"
          className={`${CONTAINER_CLASS} ${
            this.state.expandedInflections ? "expanded" : ""
          }`}
          style={{
            position: "absolute",
            left:
              this.props.coords.x -
              Math.abs(WIDTH - this.props.coords.width) / 2,
            top: this.props.coords.y + 12,
            width: WIDTH,
            height: HEIGHT
          }}
        >
          <div id="sanastorm-text" className={CONTAINER_CLASS}>
            <div className={`sanastorm-title ${CONTAINER_CLASS}`}>
              <div className={`sanastorm-finnish-title ${CONTAINER_CLASS}`}>
                FINNISH
              </div>
              <div className={`sanastorm-title-text ${CONTAINER_CLASS}`}>
                {this.props.selectedText}
              </div>
            </div>
            <div className={`sanastorm-english ${CONTAINER_CLASS}`}>
              <div className={`sanastorm-english-title ${CONTAINER_CLASS}`}>
                ENGLISH
              </div>
              <Textfit mode="single" className={CONTAINER_CLASS}>
                {this.props.wordEnglish.join(", ")}
              </Textfit>
            </div>
            <hr className={CONTAINER_CLASS}></hr>
            {inflections}
          </div>
          <div className={`sanastorm-footer ${CONTAINER_CLASS}`}>
            {expand}
            <a
              className={`sanastorm-wikt ${CONTAINER_CLASS}`}
              href={
                "https://en.wiktionary.org/wiki/" +
                this.props.wordData.nominative
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={CONTAINER_CLASS}
                src={chrome.runtime.getURL("images/wikt.png")}
                alt="link to wiktionary"
              ></img>
            </a>
          </div>
        </div>
      );
    }

    return container;
  }
}

export default InfoContainer;
