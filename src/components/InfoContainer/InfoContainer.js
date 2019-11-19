import React, { Component } from "react";
import { Textfit } from "react-textfit"; // used for dynamic font size to fit container

const WIDTH = 250;
const HEIGHT = "auto";

const INFO_CONTAINER_CLASS = "sanastorm-ct";

class InfoContainer extends Component {
  state = {
    expandedInflections: false
  };

  constructor(props) {
    super(props);
    this.expandInflections = this.expandInflections.bind(this);
  }

  expandInflections() {
    console.log("EXPANDED OR NARROWED", this.state.expandedInflections);
    this.setState((prev, props) => ({
      expandedInflections: !prev.expandedInflections
    }));
  }

  render() {
    let container = null;

    if (this.props.show) {
      let expand = !this.state.expandedInflections ? (
        <div
          className={`sanastorm-expand ${INFO_CONTAINER_CLASS}`}
          onClick={this.expandInflections}
        >
          <div className={`sanastorm-expand-text ${INFO_CONTAINER_CLASS}`}>
            MORE
          </div>
          <div className="sanastorm-arrow sanastorm-arrow-more"></div>
        </div>
      ) : (
        <div
          className={`sanastorm-expand ${INFO_CONTAINER_CLASS}`}
          onClick={this.expandInflections}
        >
          <div className={`sanastorm-expand-text ${INFO_CONTAINER_CLASS}`}>
            LESS
          </div>
          <div className="sanastorm-arrow sanastorm-arrow-less"></div>
        </div>
      );

      container = (
        <div
          id="sanastorm-info-container"
          className={INFO_CONTAINER_CLASS}
          style={{
            position: "absolute",
            left:
              this.props.coords.x -
              Math.abs(WIDTH - this.props.coords.width) / 2,
            top: this.props.coords.y + 10,
            width: WIDTH,
            height: HEIGHT
          }}
        >
          <div id="sanastorm-text" className={INFO_CONTAINER_CLASS}>
            <div className={`sanastorm-title ${INFO_CONTAINER_CLASS}`}>
              <div className="sanastorm-finnish-title">FINNISH</div>
              <div className="sanastorm-title-text">
                {this.props.selectedText}
              </div>
            </div>
            <div className={`sanastorm-english ${INFO_CONTAINER_CLASS}`}>
              <div className="sanastorm-english-title">ENGLISH</div>
              <Textfit mode="single">
                {this.props.wordEnglish.join(", ")}
              </Textfit>
            </div>
            <hr></hr>
            <div id="sanastorm-inflections">
              {Object.keys(this.props.wordData).map((key, index) => (
                <div
                  className={`sanastorm-inflection  ${key} ${
                    this.props.wordData[key] === this.props.selectedText
                      ? "sanastorm-selected"
                      : ""
                  }`}
                  key={key}
                >
                  <div className="sanastorm-inflection-type">{key}</div>
                  <div className="sanastorm-inflection-value">
                    {this.props.wordData[key] ? this.props.wordData[key] : "-"}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {expand}
        </div>
      );
    }

    return container;
  }
}

export default InfoContainer;
