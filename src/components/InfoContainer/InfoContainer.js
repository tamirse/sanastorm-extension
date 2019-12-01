import React, { Component, Fragment } from "react";
import { Textfit } from "react-textfit"; // used for dynamic font size to fit container

import utilities from "../../utilities/utilities";
import * as inflections from "../../utilities/inflections";

const WIDTH = 260;
const HEIGHT = "auto";

const CONTAINER_CLASS = "sanastorm-ct";

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

  isVerb() {
    return this.props.partOfSpeech === "verb";
  }

  isNounPlural() {
    return utilities.isNounPlural(this.props.selectedText, this.props.wordData);
  }

  calculateWidth() {
    return (
      WIDTH + this.props.selectedText.length * 2 + (this.isVerb() ? 90 : 0)
    );
  }

  render() {
    let word = utilities.getWordNominativeOrInfinitive(this.props.wordData);

    let addedWordDescription = "";
    if (this.isVerb()) {
      addedWordDescription = inflections.verbCodeToDescription(
        this.props.currentInflection
      );
    } else if (this.isNounPlural()) {
      addedWordDescription = "plural";
    } else {
      addedWordDescription = "singular";
    }

    let topArea = (
      <Fragment>
        <div className={`sanastorm-title ${CONTAINER_CLASS}`}>
          <div className={`sanastorm-finnish-title ${CONTAINER_CLASS}`}>
            FINNISH
          </div>
          <div className={`sanastorm-title-text ${CONTAINER_CLASS}`}>
            {this.isVerb() || this.isNounPlural()
              ? this.props.selectedText
              : word}
          </div>
        </div>
        <div className={`sanastorm-english ${CONTAINER_CLASS}`}>
          <div className={`sanastorm-english-title ${CONTAINER_CLASS}`}>
            ENGLISH
          </div>
          <Textfit max={20} className={CONTAINER_CLASS}>
            {this.props.wordEnglish}
          </Textfit>
          {this.props.noData ? null : (
            <div className={`sanastorm-verb ${CONTAINER_CLASS}`}>
              {addedWordDescription}
            </div>
          )}
        </div>
      </Fragment>
    );

    let inflectionsArea = (
      <div id="sanastorm-inflections">
        {Object.keys(this.props.wordData).map(inflection => {
          let isExpanded =
            this.state.expandedInflections &&
            inflections.EXPANDED_KEYS.includes(inflection);

          let isInflectionInMinimalList = inflections.MINIMAL_KEYS.includes(
            inflection
          );

          let inflectionName = inflection;
          if (this.isNounPlural()) {
            inflection = "pl_" + inflection;
            inflectionName = inflections.nounCodeToDescription(inflection);
          }

          let inflectionRow = null;

          if (isExpanded || isInflectionInMinimalList) {
            inflectionRow = (
              <div
                className={`sanastorm-inflection ${inflection} ${
                  inflection === this.props.currentInflection
                    ? "sanastorm-selected"
                    : ""
                } ${CONTAINER_CLASS}`}
                key={inflection}
              >
                <div
                  className={`sanastorm-inflection-type ${
                    this.isVerb() ? "verb" : ""
                  } ${CONTAINER_CLASS}`}
                >
                  {this.isVerb()
                    ? inflections.verbCodeToDescription(inflection)
                    : inflectionName}
                </div>
                <div
                  className={`sanastorm-inflection-value ${
                    this.isVerb() ? "verb" : ""
                  } ${CONTAINER_CLASS}`}
                >
                  {this.props.wordData[inflection]
                    ? utilities.csvToNewlines(this.props.wordData[inflection])
                    : "-"}
                </div>
              </div>
            );
          }

          return inflectionRow;
        })}
      </div>
    );

    let wiktLink = (
      <a
        className={`sanastorm-wikt ${CONTAINER_CLASS}`}
        href={
          "https://en.wiktionary.org/wiki/" +
          (word ? word : this.props.selectedText.toLowerCase())
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

    let container = (
      <div
        id="sanastorm-info-container"
        className={`${CONTAINER_CLASS} ${
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
        <div id="sanastorm-text" className={CONTAINER_CLASS}>
          {topArea}
          <hr className={CONTAINER_CLASS}></hr>
          {inflectionsArea}
        </div>
        <div className={`sanastorm-footer ${CONTAINER_CLASS}`}>
          {expand}
          {wiktLink}
        </div>
      </div>
    );

    return container;
  }
}

export default InfoContainer;
