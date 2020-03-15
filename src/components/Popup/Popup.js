import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";

import "./Popup.css";
import * as inflections from "../../utilities/inflections";
import Expand from "../UI/Expand/Expand";
import CheckboxSection from "./CheckboxSection/CheckboxSection";
import googleAnalyticsTrackPage from "../../analitycs";

// some informative console logs
// eslint-disable-next-line no-undef
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    console.log(
      'Storage key "%s" in namespace "%s" changed. ' +
        'Old value was "%s", new value is "%s".',
      key,
      namespace,
      storageChange.oldValue,
      storageChange.newValue
    );
  }
});

const Popup = props => {
  // TODO add disable icon
  // TODO add 'return to default'
  const [options, setOptions] = useState(props.options);

  return (
    <Fragment>
      <div className="popup-title">SANASTORM</div>
      <div className="description">
        Choose what to display in the info popup
      </div>
      <div className="sanastorm-options">
        <Expand title="Verb Display Options">
          <div className="verb-options">
            <Expand title="Tenses">
              <div>Present tense:</div>
              <CheckboxSection
                options={options}
                setOptions={setOptions}
                singCodes={["pres_1sg", "pres_2sg", "pres_3sg"]}
                plurCodes={["pres_1pl", "pres_2pl", "pres_3pl"]}
                miscCodes={["pres_neg", "pres_pass", "pres_pass_neg"]}
              />
              <div>Past tense:</div>
              <CheckboxSection
                options={options}
                setOptions={setOptions}
                singCodes={["past_1sg", "past_3sg", "past_3sg"]}
                plurCodes={["past_1pl", "past_2pl", "past_3pl"]}
                miscCodes={["past_pass"]}
              />
            </Expand>
            <Expand title="Conditional mood">
              <CheckboxSection
                options={options}
                setOptions={setOptions}
                singCodes={["cond_1sg", "cond_2sg", "cond_3sg_or_neg"]}
                plurCodes={["cond_1pl", "cond_2pl", "cond_3pl"]}
                miscCodes={["cond_pass", "cond_pass_neg"]}
              />
            </Expand>
            <Expand title="Imperative mood">
              <CheckboxSection
                options={options}
                setOptions={setOptions}
                singCodes={["impr_2sg", "impr_3sg"]}
                plurCodes={["impr_1pl", "impr_2pl", "impr_3pl"]}
                miscCodes={[
                  "impr_2sg_neg",
                  "impr_neg",
                  "impr_pass",
                  "impr_pass_neg"
                ]}
              />
            </Expand>
            <Expand title="Potential mood">
              <CheckboxSection
                options={options}
                setOptions={setOptions}
                singCodes={["potn_1sg", "potn_2sg", "potn_3sg"]}
                plurCodes={["potn_1pl", "potn_2pl", "potn_3pl"]}
                miscCodes={["potn_neg", "potn_pass", "potn_pass_neg"]}
              />
            </Expand>
            <Expand title="Participles">
              <CheckboxSection
                options={options}
                setOptions={setOptions}
                singCodes={["pres_part", "past_part", "agnt_part", "nega_part"]}
                plurCodes={["pres_pass_part", "past_pass_part"]}
                miscCodes={[]}
              />
            </Expand>
            <Expand title="Infinitive">
              <CheckboxSection
                options={options}
                setOptions={setOptions}
                singCodes={["inf1", "inf2", "inf3", "inf4", "inf5"]}
                plurCodes={["inf1_long", "inf2_pass", "inf3_pass"]}
                miscCodes={[]}
              />
            </Expand>
          </div>
        </Expand>
        <Expand title="Non-Verb Display Options">
          <div className="non-verb-options">
            <CheckboxSection
              options={options}
              setOptions={setOptions}
              singCodes={[
                "nominative",
                "genitive",
                "partitive",
                "inessive",
                "elative",
                "illative",
                "adessive",
                "ablative",
                "allative",
                "essive",
                "translative",
                "abessive",
                "instructive",
                "comitative"
              ]}
              plurCodes={[]}
              miscCodes={[]}
              isNoun={true}
            />
          </div>
        </Expand>
      </div>
    </Fragment>
  );
};

// load options and then render the popup
chrome.storage.sync.get(inflections.defaultOptions, savedOptions => {
  // google analytics track page
  googleAnalyticsTrackPage("popup");

  // render Popup in the popup container
  // this file is loaded in popup.html, that's how it recognizes 'document'
  let popupContainer = document.getElementById("sanastorm-popup");
  ReactDOM.render(<Popup options={savedOptions} />, popupContainer);
});
