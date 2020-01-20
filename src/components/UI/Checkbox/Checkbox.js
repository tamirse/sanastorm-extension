import React, { useState } from "react";

import * as inflections from "../../../utilities/inflections";

const Checkbox = props => {
  const [isChecked, setChecked] = useState(props.options[props.id]);
  const id = props.id;

  const changed = () => {
    const updatedOptions = { ...props.options };
    updatedOptions[id] = !isChecked;

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
          ? inflections.nounPlurCodeToDescription(id)
          : inflections.verbCodeToDescription(id)}
      </label>
    </div>
  );
};

export default Checkbox;
