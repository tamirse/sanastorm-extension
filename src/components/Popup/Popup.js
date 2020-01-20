import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";

import "./Popup.css";
import Expand from "../UI/Expand/Expand";
import CheckboxSection from "./CheckboxSection/CheckboxSection";

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
  // add disable icon
  // add 'return to default'
  const [options, setOptions] = useState(props.options);

  return (
    <Fragment>
      <div className="popup-title">SANASTORM</div>
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
              plurCodes={[
                "pl_nominative",
                "pl_genitive",
                "pl_partitive",
                "pl_inessive",
                "pl_elative",
                "pl_illative",
                "pl_adessive",
                "pl_ablative",
                "pl_allative",
                "pl_essive",
                "pl_translative",
                "pl_abessive",
                "pl_instructive",
                "pl_comitative"
              ]}
              miscCodes={[]}
              isNoun={true}
            />
          </div>
        </Expand>
      </div>
    </Fragment>
  );
};

const defaultOptions = {
  pres_1sg: true,
  pres_2sg: false,
  pres_3sg: false,
  pres_1pl: false,
  pres_2pl: false,
  pres_3pl: false,
  pres_neg: false,
  pres_pass: false,
  pres_pass_neg: false,
  past_1sg: true,
  past_2sg: false,
  past_3sg: false,
  past_1pl: false,
  past_2pl: false,
  past_3pl: false,
  past_pass: false,
  cond_1sg: false,
  cond_2sg: false,
  cond_3sg_or_neg: false,
  cond_1pl: false,
  cond_2pl: false,
  cond_3pl: false,
  cond_pass: false,
  cond_pass_neg: false,
  impr_2sg: false,
  impr_3sg: false,
  impr_1pl: false,
  impr_2pl: false,
  impr_3pl: false,
  impr_2sg_neg: false,
  impr_neg: false,
  impr_pass: false,
  impr_pass_neg: false,
  potn_1sg: false,
  potn_2sg: false,
  potn_3sg: false,
  potn_1pl: false,
  potn_2pl: false,
  potn_3pl: false,
  potn_neg: false,
  potn_pass: false,
  potn_pass_neg: false,
  pres_part: false,
  pres_pass_part: false,
  past_part: false,
  past_pass_part: false,
  agnt_part: false,
  nega_part: false,
  inf1: true,
  inf1_long: false,
  inf2: false,
  inf2_pass: false,
  inf3: false,
  inf3_pass: false,
  inf4: false,
  inf5: false,
  nominative: true,
  genitive: true,
  partitive: true,
  inessive: true,
  elative: true,
  illative: true,
  adessive: true,
  ablative: true,
  allative: true,
  essive: true,
  translative: true,
  abessive: true,
  instructive: true,
  comitative: true,
  pl_nominative: true,
  pl_genitive: true,
  pl_partitive: true,
  pl_inessive: true,
  pl_elative: true,
  pl_illative: true,
  pl_adessive: true,
  pl_ablative: true,
  pl_allative: true,
  pl_essive: true,
  pl_translative: true,
  pl_abessive: true,
  pl_instructive: true,
  pl_comitative: true
};

// load options and then render the popup
chrome.storage.sync.get(defaultOptions, savedOptions => {
  // render Popup in the popup container
  // this file is loaded in popup.html, that's how it recognizes 'document'
  let popupContainer = document.getElementById("sanastorm-popup");
  ReactDOM.render(<Popup options={savedOptions} />, popupContainer);
});
