import React, { useState } from "react";

import "./Expand.css";

// expand collapse ui

const Expand = props => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="expand-area">
      <div
        className="sanastorm-expand-title"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="sanastorm-expand-title-text">{props.title}</div>
        {isExpanded ? (
          <div className="sanastorm-arrow sanastorm-arrow-less" />
        ) : (
          <div className="sanastorm-arrow sanastorm-arrow-more" />
        )}
      </div>
      {isExpanded ? props.children : null}
    </div>
  );
};

export default Expand;
