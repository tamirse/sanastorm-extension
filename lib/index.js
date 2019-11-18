var _jsxFileName = "src\\index.js";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

// create sanastorm container and append to body
var sanastormContainer = document.createElement("div");
sanastormContainer.id = "sanastorm-container";
document.body.append(sanastormContainer);

// render the application in the sanastorm container
ReactDOM.render(React.createElement(App, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 13
  },
  __self: this
}), sanastormContainer);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();