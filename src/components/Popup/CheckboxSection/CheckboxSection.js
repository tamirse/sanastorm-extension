import React from "react";

import "./CheckboxSection.css";
import Checkbox from "../../UI/Checkbox/Checkbox";

const CheckboxSection = props => {
  const singCheckboxes = props.singCodes.map(codeName => (
    <Checkbox
      key={codeName}
      id={codeName}
      options={props.options}
      setOptions={props.setOptions}
    />
  ));

  const plurCheckboxes = props.plurCodes.map(codeName => (
    <Checkbox
      key={codeName}
      id={codeName}
      options={props.options}
      setOptions={props.setOptions}
    />
  ));

  const miscCheckboxes = props.miscCodes.map(codeName => (
    <Checkbox
      key={codeName}
      id={codeName}
      options={props.options}
      setOptions={props.setOptions}
    />
  ));

  return (
    <div className="checkboxes-area">
      <div className="sing-plur">
        <div className="section-singular">{singCheckboxes}</div>
        <div className="section-plural">{plurCheckboxes}</div>
      </div>
      <div className="section-misc">{miscCheckboxes}</div>
    </div>
  );
};

export default CheckboxSection;
