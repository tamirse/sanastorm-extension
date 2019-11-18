const MAX_WORD_LEN = 61;

const getSelection = () => {
  return document
    .getSelection()
    .toString()
    .trim();
};

const getSelectionPosition = () => {
  const range = document.getSelection().getRangeAt(0);
  const startOffset = range.startOffset;
  const endOffset = startOffset + range.toString().length;

  console.log("[Utilities] offsets: ", startOffset, endOffset);
  return {
    x: startOffset,
    y: endOffset
  };
};

const isSelectionValid = selection => {
  if (
    selection === "" ||
    selection.length > MAX_WORD_LEN ||
    selection.includes("\n") ||
    selection.includes(" ")
  ) {
    return false;
  }

  return true;
};

export default { getSelection, getSelectionPosition, isSelectionValid };
