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
