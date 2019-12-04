import React, { Component, Fragment } from "react";
import { Textfit } from "react-textfit"; // used for dynamic font size to fit container

import utilities from "../../utilities/utilities";
import * as inflections from "../../utilities/inflections";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import WordDescription from "../WordDescription/WordDescription";
import "./InfoContainer.css";

const WIDTH = 260;
const HEIGHT = "auto";

class InfoContainer extends Component {
  state = {
    expandedInflections: false,
    pluralToggled: this.props.isPlural
  };

  constructor(props) {
    super(props);
    this.toggleInflections = this.toggleInflections.bind(this);
    this.togglePlural = this.togglePlural.bind(this);
  }

  toggleInflections() {
    this.setState((prev, props) => ({
      expandedInflections: !prev.expandedInflections
    }));
  }

  togglePlural() {
    this.setState((prev, props) => ({
      pluralToggled: !prev.pluralToggled
    }));
  }

  isVerb() {
    return this.props.partOfSpeech === "verb";
  }

  calculateWidth() {
    return (
      WIDTH + this.props.selectedText.length * 2 + (this.isVerb() ? 90 : 0)
    );
  }

  createWordDescriptions() {
    let descriptionText = "";
    let classes = [];

    // get verb description
    if (this.isVerb()) {
      return (
        <Fragment>
          <WordDescription description="verb" classes={["sanastorm-verb"]} />
          <WordDescription
            description={inflections.verbCodeToDescription(
              this.props.currentInflection
            )}
            classes={["sanastorm-verb-description"]}
          />
        </Fragment>
      );
    }

    // get non-verb description
    if (this.state.pluralToggled) {
      descriptionText = "plural";
      classes.push("sanastorm-plural");
    } else {
      descriptionText = "singular";
      classes.push("sanastorm-singular");
    }

    return (
      <Fragment>
        <WordDescription
          description={this.props.currentInflection}
          classes={["sanastorm-case"]}
        />
        <WordDescription description={descriptionText} classes={classes} />
      </Fragment>
    );
  }

  render() {
    let word = utilities.getWordNominativeOrInfinitive(this.props.wordData);

    let finnishDisplayWord = this.isVerb()
      ? this.props.selectedText
      : this.state.pluralToggled
      ? this.props.wordData[inflections.NOMINATIVE_PLURAL]
      : word;

    let topArea = (
      <Fragment>
        <div className={`sanastorm-title ${utilities.CONTAINER_CLASS}`}>
          <div
            className={`sanastorm-finnish-title ${utilities.CONTAINER_CLASS}`}
          >
            FINNISH
          </div>
          <div className={`sanastorm-title-text ${utilities.CONTAINER_CLASS}`}>
            {finnishDisplayWord}
          </div>
        </div>
        <div className={`sanastorm-english ${utilities.CONTAINER_CLASS}`}>
          <div
            className={`sanastorm-english-title ${utilities.CONTAINER_CLASS}`}
          >
            ENGLISH
          </div>
          <Textfit max={20} className={utilities.CONTAINER_CLASS}>
            {this.props.wordEnglish}
          </Textfit>
          {this.props.noData ? null : (
            <div
              className={`sanastorm-word-descriptions ${utilities.CONTAINER_CLASS}`}
            >
              {this.createWordDescriptions()}
            </div>
          )}
          {this.props.noData || this.isVerb() ? null : (
            <ToggleSwitch
              className="sanastorm-ct sanastorm-toggle"
              changed={this.togglePlural}
              checked={this.state.pluralToggled}
            />
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
          if (this.state.pluralToggled) {
            inflection = "pl_" + inflection;
            inflectionName = inflections.nounPlurCodeToDescription(inflection);
          }

          let inflectionRow = null;

          if (isExpanded || isInflectionInMinimalList) {
            inflectionRow = (
              <div
                className={`sanastorm-inflection ${inflection} ${
                  inflection === this.props.currentInflection
                    ? "sanastorm-selected"
                    : ""
                } ${utilities.CONTAINER_CLASS}`}
                key={inflection}
              >
                <div
                  className={`sanastorm-inflection-type ${
                    this.isVerb() ? "verb" : ""
                  } ${utilities.CONTAINER_CLASS}`}
                >
                  {this.isVerb()
                    ? inflections.verbCodeToDescription(inflection)
                    : inflectionName}
                </div>
                <div
                  className={`sanastorm-inflection-value ${
                    this.isVerb() ? "verb" : ""
                  } ${utilities.CONTAINER_CLASS}`}
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
          {topArea}
          <hr className={utilities.CONTAINER_CLASS}></hr>
          {inflectionsArea}
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
