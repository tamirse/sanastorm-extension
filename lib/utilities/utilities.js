var MAX_WORD_LEN = 61;

var getSelection = function getSelection() {
  return document.getSelection().toString().trim();
};

var getSelectionPosition = function getSelectionPosition() {
  var range = document.getSelection().getRangeAt(0);
  var startOffset = range.startOffset;
  var endOffset = startOffset + range.toString().length;

  console.log(startOffset, endOffset);
  return {
    x: startOffset,
    y: endOffset
  };
};

var isSelectionValid = function isSelectionValid(selection) {
  if (selection === "" || selection.length > MAX_WORD_LEN || selection.includes("\n") || selection.includes(" ")) {
    return false;
  }

  return true;
};

export default { getSelection: getSelection, getSelectionPosition: getSelectionPosition, isSelectionValid: isSelectionValid };