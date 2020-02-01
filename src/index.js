import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

// create sanastorm container and append to body
let sanastormContainer = document.createElement("div");
sanastormContainer.id = "sanastorm-container";
document.body.append(sanastormContainer);

// render the application in the sanastorm container
ReactDOM.render(<App />, sanastormContainer);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
