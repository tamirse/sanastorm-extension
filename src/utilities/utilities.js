const MAX_WORD_LEN = 61;

const getSelection = () => {
  return document
    .getSelection()
    .toString()
    .trim();
};

const getSelectionPosition = () => {
  const range = document.getSelection().getRangeAt(0);
  const domRect = range.getClientRects()[0];

  console.log("[Utilities] domRect: ", domRect);
  console.log("[Utilities] offsets: ", domRect.left, domRect.bottom);
  return {
    x: domRect.left,
    y: domRect.bottom,
    width: domRect.width,
    height: domRect.height
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
