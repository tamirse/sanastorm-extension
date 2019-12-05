import React from "react";

import utilities from "../../../utilities/utilities";
import * as inflections from "../../../utilities/inflections";
import "./InflectionArea.css";

const inflectionArea = props => {
  let inflectionsListExpanded = props.isVerb
    ? inflections.EXPANDED_KEYS.verbs
    : inflections.EXPANDED_KEYS.nouns;

  let inflectionsListMinimal = props.isVerb
    ? inflections.MINIMAL_KEYS.verbs
    : inflections.MINIMAL_KEYS.nouns;

  return (
    <div id="sanastorm-inflections">
      {inflectionsListExpanded.map(inflection => {
        // check if inflection is in minimal list
        let isInMinimalList = inflectionsListMinimal.includes(inflection);

        // add plural to inflection name if plural is toggled
        let inflectionName = inflection;
        if (props.pluralToggled) {
          inflection = "pl_" + inflection;
          inflectionName = inflections.nounPlurCodeToDescription(inflection);
        }

        // component to display
        let inflectionRow = null;

        if (props.expandedInflections || isInMinimalList) {
          inflectionRow = (
            <div
              className={`sanastorm-inflection ${inflection} ${
                inflection === props.currentInflection
                  ? "sanastorm-selected"
                  : ""
              } ${utilities.CONTAINER_CLASS}`}
              key={inflection}
            >
              <div
                className={`sanastorm-inflection-type ${
                  props.isVerb ? "verb" : ""
                } ${utilities.CONTAINER_CLASS}`}
              >
                {props.isVerb
                  ? inflections.verbCodeToDescription(inflection)
                  : inflectionName}
              </div>
              <div
                className={`sanastorm-inflection-value ${
                  props.isVerb ? "verb" : ""
                } ${utilities.CONTAINER_CLASS}`}
              >
                {props.wordData[inflection]
                  ? utilities.csvToNewlines(props.wordData[inflection])
                  : "-"}
              </div>
            </div>
          );
        }

        return inflectionRow;
      })}
    </div>
  );
};

export default inflectionArea;
