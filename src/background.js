chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  console.log(request.input);

  fetch(request.input, request.init).then(
    response => {
      console.log("Response: ", response);
      response.text().then(text => sendResponse(text));
    },
    function(error) {
      sendResponse(error);
    }
  );
  return true;
});

// google analytics
var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-153879665-1"]);
_gaq.push(["_trackPageview"]);

(function() {
  var ga = document.createElement("script");
  ga.type = "text/javascript";
  ga.async = true;
  ga.src = "https://ssl.google-analytics.com/ga.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(ga, s);
})();

// fetches data from the server and returns it to the content script
// we do it here because CORS policy doesn't allow contentScripts to access outside sources
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  fetch(request.input, request.init).then(
    function(response) {
      console.log(response);
      return response.text().then(function(text) {
        sendResponse([
          {
            body: text,
            status: response.status,
            statusText: response.statusText
          },
          null
        ]);
      });
    },
    function(error) {
      sendResponse([null, error]);
    }
  );
  return true;
});
