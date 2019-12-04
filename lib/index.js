var _jsxFileName = "src\\index.js";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

// google analytics
// eslint-disable-next-line no-use-before-define
var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-153879665-1"]);
_gaq.push(["_trackPageview"]);

(function () {
  var ga = document.createElement("script");
  ga.type = "text/javascript";
  ga.async = true;
  ga.src = "https://ssl.google-analytics.com/ga.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(ga, s);
})();

// create sanastorm container and append to body
var sanastormContainer = document.createElement("div");
sanastormContainer.id = "sanastorm-container";
document.body.append(sanastormContainer);

// render the application in the sanastorm container
ReactDOM.render(React.createElement(App, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 28
  },
  __self: this
}), sanastormContainer);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();