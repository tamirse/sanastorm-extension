import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import utilities from "../../utilities/utilities";
import InflectionArea from "./InflectionsArea/InflectionArea";
import TopArea from "./TopArea/TopArea";
import "./InfoContainer.css";

const DEFAULT_WIDTH = 260;

const isVerb = (props) => {
  return (
    props.partOfSpeech === "verb" || props.partOfSpeech === "auxiliary verb"
  );
};

const calculateWidth = (props) => {
  const ADDED_VERB_WIDTH = 90;

  return (
    DEFAULT_WIDTH +
    props.selectedText.length * 2 +
    (isVerb(props) ? ADDED_VERB_WIDTH : 0)
  );
};

const calculateXPosition = (props) => {
  const width = calculateWidth(props);
  const padding = 16;
  const viewportWidth = document.documentElement.clientWidth;

  let xPosition = props.coords.x - Math.abs(width - props.coords.width) / 2;

  console.log("coord", props.coords.x);
  console.log("width: ", width);
  console.log("xPosition: ", xPosition);
  console.log("window width: ", window.innerWidth);
  console.log("xpos+width+pad", xPosition + width + padding);
  console.log("difference:", window.innerWidth - width - padding);

  // if xPosition is outside viewport, change it to fit inside
  if (xPosition <= 0) {
    // xpos is outside left side
    xPosition = padding;
  }
  if (xPosition + width + padding * 2 >= viewportWidth) {
    // xpos is outside right side
    console.log("outside");
    xPosition = viewportWidth - width - padding * 3;
  }

  return xPosition;
};

const useStyles = makeStyles({
  infoContainer: (props) => ({
    defaultWidth: DEFAULT_WIDTH,
    height: "auto",
    width: calculateWidth(props),
    left: calculateXPosition(props),
    top: props.coords.y + 12,
  }),
});

const InfoContainer = (props) => {
  const classes = useStyles(props);

  const [expandedInflections, setExpandedInflections] = useState(false);
  const [pluralToggled, setPluralToggled] = useState(props.isPlural);

  // update pluralToggled state based on props
  useEffect(() => {
    setPluralToggled(props.isPlural);
  }, [props.isPlural]);

  const toggleInflections = () => {
    setExpandedInflections(!expandedInflections);
  };

  const togglePlural = () => {
    setPluralToggled(!pluralToggled);
  };

  let word = utilities.getWordNominativeOrInfinitive(props.wordData);

  let wiktLink = (
    <a
      className="sanastorm-wikt"
      href={
        "https://en.wiktionary.org/wiki/" +
        (word ? word : props.selectedText.toLowerCase())
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        // eslint-disable-next-line no-undef
        src={chrome.runtime.getURL("images/wikt.png")}
        alt="link to wiktionary"
      ></img>
    </a>
  );

  let expand = !expandedInflections ? (
    <div className="sanastorm-expand" onClick={toggleInflections}>
      <div className="sanastorm-expand-text">MORE</div>
      <div className="sanastorm-arrow sanastorm-arrow-more"></div>
    </div>
  ) : (
    <div className="sanastorm-expand" onClick={toggleInflections}>
      <div className="sanastorm-expand-text">LESS</div>
      <div className="sanastorm-arrow sanastorm-arrow-less"></div>
    </div>
  );

  let container = (
    <div
      id="sanastorm-info-container"
      className={clsx(
        classes.infoContainer,
        expandedInflections ? "expanded" : ""
      )}
    >
      <div id="sanastorm-text">
        <TopArea
          isVerb={isVerb(props)}
          pluralToggled={pluralToggled}
          togglePlural={togglePlural}
          currentInflection={props.currentInflection}
          wordData={props.wordData}
          selectedText={props.selectedText}
          wordEnglish={props.wordEnglish}
          noData={props.noData}
          partOfSpeech={props.partOfSpeech}
        />
        <hr></hr>
        {props.noData ? null : (
          <InflectionArea
            isVerb={isVerb(props)}
            pluralToggled={pluralToggled}
            expandedInflections={expandedInflections}
            currentInflection={props.currentInflection}
            wordData={props.wordData}
          />
        )}
      </div>
      <div className="sanastorm-footer">
        {expand}
        {wiktLink}
      </div>
    </div>
  );

  return container;
};

export default InfoContainer;
