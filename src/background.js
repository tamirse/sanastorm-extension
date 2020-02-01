import googleAnalyticsTrackPage from "./analitycs";

// google analytics track page
googleAnalyticsTrackPage("background")

// fetches data from the server and returns it to the content script
// we do it here because CORS policy doesn't allow contentScripts to access outside sources
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.action === "send"){
    // got request for google analytics tracking action
    googleAnalyticsTrackPage(request.page)
  }
  else {
    fetch(request.input, request.init).then(
      response => {
        console.log("Response: ", response);
        response.text().then(text => sendResponse(text));
      },
      function(error) {
        sendResponse(error);
      }
    );
  }
  return true;
});
