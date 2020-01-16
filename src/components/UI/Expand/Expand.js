import React from "react";

// expand collapse ui

const expand = props => {
  return (
    <div className="expand-area">
      <div className="expand-title">{props.title}</div>
      {props.children}
    </div>
  );
};

export default expand;
