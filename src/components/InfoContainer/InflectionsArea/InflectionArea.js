import React, { useState, useEffect } from "react";

import utilities from "../../../utilities/utilities";
import * as inflections from "../../../utilities/inflections";
import "./InflectionArea.css";

const InflectionArea = props => {
  const [expandedInflections, setExpandedInflections] = useState(null);

  useEffect(() => {
    inflections.getExpandedKeys(props.isVerb).then(expanded => {
      setExpandedInflections(expanded);
      console.log("Got Expanded Keys: ", expanded);
    });
  }, []);

  let inflectionsListMinimal = props.isVerb
    ? inflections.MINIMAL_KEYS.verbs
    : inflections.MINIMAL_KEYS.nouns;

  // TODO add minimal inflections to expanded so it will be visible
  // TODO set static inflection ordering

  return (
    <div id="sanastorm-inflections" className={utilities.CONTAINER_CLASS}>
      {expandedInflections ? (
        expandedInflections.map(inflection => {
          // check if inflection is in minimal list
          let isInMinimalList = inflectionsListMinimal.includes(inflection);

          // add plural to inflection name if plural is toggled
          let inflectionName = inflection;
          if (props.pluralToggled) {
            inflection = "pl_" + inflection;
            inflectionName = inflections.nounCodeToDescription(inflection);
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
        })
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default InflectionArea;
