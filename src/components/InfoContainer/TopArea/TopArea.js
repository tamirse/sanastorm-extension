import React, { Component, Fragment } from "react";
import { Textfit } from "react-textfit"; // used for dynamic font size to fit container

import utilities from "../../../utilities/utilities";
import * as inflections from "../../../utilities/inflections";
import WordDescription from "../WordDescription/WordDescription";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";
import "./TopArea.css";

class topArea extends Component {
  createWordDescriptions() {
    let descriptionText = "";
    let classes = [];

    if (this.props.isVerb) {
      // get verb description
      descriptionText = inflections.verbCodeToDescription(
        this.props.currentInflection
      );
      classes = ["sanastorm-verb-description"];
    } else {
      // get non-verb description
      if (this.props.pluralToggled) {
        descriptionText = "plural";
        classes.push("sanastorm-plural");
      } else {
        descriptionText = "singular";
        classes.push("sanastorm-singular");
      }
    }

    return (
      <Fragment>
        <WordDescription
          description={this.props.partOfSpeech}
          classes={["sanastorm-pos"]}
        />
        {this.props.isVerb ? null : (
          <WordDescription
            description={this.props.currentInflection}
            classes={["sanastorm-case"]}
          />
        )}
        <WordDescription description={descriptionText} classes={classes} />
      </Fragment>
    );
  }

  render() {
    let word = utilities.getWordNominativeOrInfinitive(this.props.wordData);

    let finnishDisplayWord = this.props.isVerb
      ? this.props.selectedText
      : this.props.pluralToggled
      ? this.props.wordData[inflections.NOMINATIVE_PLURAL]
      : word;

    return (
      <Fragment>
        {this.props.noData || this.props.isVerb ? null : (
          <ToggleSwitch
            className="sanastorm-ct sanastorm-toggle"
            changed={this.props.togglePlural}
            checked={this.props.pluralToggled}
          />
        )}
        <div className="sanastorm-title">
          <div className="sanastorm-finnish-title">FINNISH</div>
          <div className="sanastorm-title-text">{finnishDisplayWord}</div>
        </div>
        <div className="sanastorm-english">
          <div className="sanastorm-english-title">ENGLISH</div>
          {this.props.wordEnglish.map((english, i) => (
            <div className="sanastorm-english-word" key={i}>
              {i + 1}.<Textfit max={20}>{english}</Textfit>
            </div>
          ))}
        </div>
        {this.props.noData ? null : (
          <div className="sanastorm-word-descriptions">
            {this.createWordDescriptions()}
          </div>
        )}
      </Fragment>
    );
  }
}

export default topArea;
