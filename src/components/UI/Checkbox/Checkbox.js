import React, { useState } from "react";

import * as inflections from "../../../utilities/inflections";

const Checkbox = props => {
  const field = props.isNoun ? "nouns" : "verbs";
  const [isChecked, setChecked] = useState(props.options[field][props.id]);
  const id = props.id;

  const changed = () => {
    const updatedOptions = { ...props.options };
    updatedOptions[field][id] = !isChecked;

    // store the state of checked in the chrome storage
    chrome.storage.sync.set({ ...updatedOptions }, () => {
      console.log("Pressed checkbox, saving data: ", !isChecked);
    });

    props.setOptions(updatedOptions); // update the state of options (in popup component)

    setChecked(previousIsChecked => !previousIsChecked); // update the state of checked
  };

  return (
    <div className="checkbox">
      <input type="checkbox" id={id} checked={isChecked} onChange={changed} />
      <label htmlFor={id}>
        {props.isNoun
          ? inflections.nounCodeToDescription(id)
          : inflections.verbCodeToDescription(id)}
      </label>
    </div>
  );
};

export default Checkbox;
