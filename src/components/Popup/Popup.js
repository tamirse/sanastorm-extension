import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./Popup.css";
import Expand from "../UI/Expand/Expand";
import Checkbox from "../UI/Checkbox/Checkbox";

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
  // add all expands
  // add 'return to default'
  const [options, setOptions] = useState(props.options);

  return (
    <div>
      <div className="popup-title">SANASTORM</div>
      <div className="sanastorm-options">
        <Expand title="Verb Display Options">
          <div className="verb-options">
            <Expand title="Tenses">
              <div>Present tense:</div>
              <div className="checkboxes present-tense">
                <div className="tenses-singular">
                  <Checkbox
                    id="pres_1sg"
                    options={options}
                    setOptions={setOptions}
                  />
                  <Checkbox
                    id="pres_2sg"
                    options={options}
                    setOptions={setOptions}
                  />
                  <Checkbox
                    id="pres_3sg"
                    options={options}
                    setOptions={setOptions}
                  />
                </div>
                <div className="tenses-plural">
                  <Checkbox
                    id="pres_1pl"
                    options={options}
                    setOptions={setOptions}
                  />
                  <Checkbox
                    id="pres_2pl"
                    options={options}
                    setOptions={setOptions}
                  />
                  <Checkbox
                    id="pres_3pl"
                    options={options}
                    setOptions={setOptions}
                  />
                </div>
              </div>
              <div className="tenses-misc">
                <Checkbox
                  id="pres_neg"
                  options={options}
                  setOptions={setOptions}
                />
                <Checkbox
                  id="pres_pass"
                  options={options}
                  setOptions={setOptions}
                />
                <Checkbox
                  id="pres_pass_neg"
                  options={options}
                  setOptions={setOptions}
                />
              </div>
              <div>Past tense:</div>
              <div className="checkboxes past-tense">
                <div className="tenses-singular">
                  <Checkbox
                    id="past_1sg"
                    options={options}
                    setOptions={setOptions}
                  />
                  <Checkbox
                    id="past_2sg"
                    options={options}
                    setOptions={setOptions}
                  />
                  <Checkbox
                    id="past_3sg"
                    options={options}
                    setOptions={setOptions}
                  />
                </div>
                <div className="tenses-plural">
                  <Checkbox
                    id="past_1pl"
                    options={options}
                    setOptions={setOptions}
                  />
                  <Checkbox
                    id="past_2pl"
                    options={options}
                    setOptions={setOptions}
                  />
                  <Checkbox
                    id="past_3pl"
                    options={options}
                    setOptions={setOptions}
                  />
                </div>
              </div>
              <div className="tenses-misc">
                <Checkbox
                  id="past_pass"
                  options={options}
                  setOptions={setOptions}
                />
              </div>
            </Expand>
            <Expand title="Conditional mood"></Expand>
            <Expand title="Imperative mood"></Expand>
            <Expand title="Potential mood"></Expand>
            <Expand title="Participles"></Expand>
            <Expand title="Infinitive"></Expand>
          </div>
        </Expand>
        <Expand title="Non-Verb Display Options">
          <p>test</p>
        </Expand>
      </div>
    </div>
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
  past_pass: false
};

// load options and then render the popup
chrome.storage.sync.get(defaultOptions, savedOptions => {
  // render Popup in the popup container
  // this file is loaded in popup.html, that's how it recognizes 'document'
  let popupContainer = document.getElementById("sanastorm-popup");
  ReactDOM.render(<Popup options={savedOptions} />, popupContainer);
});
