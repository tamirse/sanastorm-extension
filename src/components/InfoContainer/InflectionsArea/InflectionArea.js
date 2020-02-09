import React, { useState, useEffect } from "react";

import utilities from "../../../utilities/utilities";
import * as inflections from "../../../utilities/inflections";
import "./InflectionArea.css";

const InflectionArea = props => {
  const [expandedInflections, setExpandedInflections] = useState(null);

  let inflectionsListMinimal = props.isVerb
    ? inflections.MINIMAL_KEYS.verbs
    : inflections.MINIMAL_KEYS.nouns;

  useEffect(() => {
    inflections.getExpandedKeys(props.isVerb).then(expanded => {
      // unite minimal inflections keys with expanded keys and remove duplicates
      // we do this so that the minimal inflection could be displayed
      const inflectionsUnion = [
        ...new Set([...expanded, ...inflectionsListMinimal])
      ];

      setExpandedInflections(
        inflections.orderInflections(props.isVerb, inflectionsUnion)
      );
    });
  }, [props.isVerb, inflectionsListMinimal]);

  // TODO set static inflection ordering

  return (
    <div id="sanastorm-inflections">
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
                }`}
                key={inflection}
              >
                <div
                  className={`sanastorm-inflection-type ${
                    props.isVerb ? "verb" : ""
                  }`}
                >
                  {props.isVerb
                    ? inflections.verbCodeToDescription(inflection)
                    : inflectionName}
                </div>
                <div
                  className={`sanastorm-inflection-value ${
                    props.isVerb ? "verb" : ""
                  }`}
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
