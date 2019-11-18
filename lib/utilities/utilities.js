var MAX_WORD_LEN = 61;

var getSelection = function getSelection() {
  return document.getSelection().toString().trim();
};

var getSelectionPosition = function getSelectionPosition() {
  var range = document.getSelection().getRangeAt(0);
  var domRect = range.getClientRects()[0];

  console.log("[Utilities] domRect: ", domRect);
  console.log("[Utilities] offsets: ", domRect.left, domRect.bottom);
  return {
    x: domRect.left,
    y: domRect.bottom,
    width: domRect.width,
    height: domRect.height
  };
};

var isSelectionValid = function isSelectionValid(selection) {
  if (selection === "" || selection.length > MAX_WORD_LEN || selection.includes("\n") || selection.includes(" ")) {
    return false;
  }

  return true;
};

export default { getSelection: getSelection, getSelectionPosition: getSelectionPosition, isSelectionValid: isSelectionValid };