import React, { Component } from "react";

import utilities from "../../utilities/utilities";
import InflectionArea from "./InflectionsArea/InflectionArea";
import TopArea from "./TopArea/TopArea";
import "./InfoContainer.css";

const WIDTH = 260;
const HEIGHT = "auto";

class InfoContainer extends Component {
  state = {
    expandedInflections: false,
    pluralToggled: this.props.isPlural
  };

  toggleInflections = () => {
    this.setState((prev, props) => ({
      expandedInflections: !prev.expandedInflections
    }));
  };

  togglePlural = () => {
    this.setState((prev, props) => ({
      pluralToggled: !prev.pluralToggled
    }));
  };

  isVerb() {
    return (
      this.props.partOfSpeech === "verb" ||
      this.props.partOfSpeech === "auxiliary verb"
    );
  }

  calculateWidth() {
    return (
      WIDTH + this.props.selectedText.length * 2 + (this.isVerb() ? 90 : 0)
    );
  }

  render() {
    let word = utilities.getWordNominativeOrInfinitive(this.props.wordData);

    let wiktLink = (
      <a
        className={`sanastorm-wikt ${utilities.CONTAINER_CLASS}`}
        href={
          "https://en.wiktionary.org/wiki/" +
          (word ? word : this.props.selectedText.toLowerCase())
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className={utilities.CONTAINER_CLASS}
          src={chrome.runtime.getURL("images/wikt.png")}
          alt="link to wiktionary"
        ></img>
      </a>
    );

    let expand = !this.state.expandedInflections ? (
      <div
        className={`sanastorm-expand ${utilities.CONTAINER_CLASS}`}
        onClick={this.toggleInflections}
      >
        <div className={`sanastorm-expand-text ${utilities.CONTAINER_CLASS}`}>
          MORE
        </div>
        <div
          className={`sanastorm-arrow sanastorm-arrow-more ${utilities.CONTAINER_CLASS}`}
        ></div>
      </div>
    ) : (
      <div
        className={`sanastorm-expand ${utilities.CONTAINER_CLASS}`}
        onClick={this.toggleInflections}
      >
        <div className={`sanastorm-expand-text ${utilities.CONTAINER_CLASS}`}>
          LESS
        </div>
        <div
          className={`sanastorm-arrow sanastorm-arrow-less ${utilities.CONTAINER_CLASS}`}
        ></div>
      </div>
    );

    let container = (
      <div
        id="sanastorm-info-container"
        className={`${utilities.CONTAINER_CLASS} ${
          this.state.expandedInflections ? "expanded" : ""
        }`}
        style={{
          position: "absolute",
          left:
            this.props.coords.x -
            Math.abs(this.calculateWidth() - this.props.coords.width) / 2,
          top: this.props.coords.y + 12,
          width: this.calculateWidth(),
          height: HEIGHT
        }}
      >
        <div id="sanastorm-text" className={utilities.CONTAINER_CLASS}>
          <TopArea
            isVerb={this.isVerb()}
            pluralToggled={this.state.pluralToggled}
            togglePlural={this.togglePlural}
            currentInflection={this.props.currentInflection}
            wordData={this.props.wordData}
            selectedText={this.props.selectedText}
            wordEnglish={this.props.wordEnglish}
            noData={this.props.noData}
            partOfSpeech={this.props.partOfSpeech}
          />
          <hr className={utilities.CONTAINER_CLASS}></hr>
          {this.props.noData ? null : (
            <InflectionArea
              isVerb={this.isVerb()}
              pluralToggled={this.state.pluralToggled}
              expandedInflections={this.state.expandedInflections}
              currentInflection={this.props.currentInflection}
              wordData={this.props.wordData}
            />
          )}
        </div>
        <div className={`sanastorm-footer ${utilities.CONTAINER_CLASS}`}>
          {expand}
          {wiktLink}
        </div>
      </div>
    );

    return container;
  }
}

export default InfoContainer;
