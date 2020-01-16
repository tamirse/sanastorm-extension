import React from "react";
import ReactDOM from "react-dom";

import Expand from "../UI/Expand/Expand";

const Popup = props => {
  // add disable
  return (
    <div>
      <Expand title="Verb fields">
        <p>test</p>
      </Expand>
      <Expand title="Non-Verb fields">
        <p>test</p>
      </Expand>
    </div>
  );
};

// render Popup in the popup container
// this file is loaded in popup.html, that's how it recognizes 'document'
let popupContainer = document.getElementById("sanastorm-popup");
ReactDOM.render(<Popup />, popupContainer);
