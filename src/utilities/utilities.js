const MAX_WORD_LEN = 61;

const getSelection = () => {
  return document
    .getSelection()
    .toString()
    .trim();
};

const getSelectionPosition = () => {
  const range = document.getSelection().getRangeAt(0);
  const domRect = range.getClientRects()[0]; // contains the borders of the selection

  // console.log("[Utilities] domRect: ", domRect);
  // console.log("[Utilities] offsets: ", domRect.left, domRect.bottom);
  // console.log("[Utilities] ScrollY: ", window.scrollY);
  return {
    x: domRect.left,
    y: domRect.bottom + window.scrollY,
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

const csvToNewlines = string => {
  return string.replace(/,/g, ",\n");
};

export default {
  getSelection,
  getSelectionPosition,
  isSelectionValid,
  csvToNewlines
};
