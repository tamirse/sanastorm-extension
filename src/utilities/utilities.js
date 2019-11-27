const MAX_WORD_LEN = 61;

/**
 * return page text selection as string
 */
const getSelection = () => {
  return document
    .getSelection()
    .toString()
    .trim();
};

/**
 * get text selection position on the page
 * x,y coordinates
 * selection width and height
 */
const getSelectionPosition = () => {
  const range = document.getSelection().getRangeAt(0);
  const domRect = range.getClientRects()[0]; // contains the borders of the selection

  return {
    x: domRect.left,
    y: domRect.bottom + window.scrollY,
    width: domRect.width,
    height: domRect.height
  };
};

/**
 * return true iff selection is valid, ie no space/newline between characters
 * @param {string} selection
 */
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

/**
 * return true iff target element is the info container
 */
const isTargetInfoContainer = event => {
  return event.target.classList.contains("sanastorm-ct");
};

/**
 * replaces commas with newlines
 * @param {string} string
 */
const csvToNewlines = string => {
  return string.replace(/,/g, ",\n");
};

export default {
  getSelection,
  getSelectionPosition,
  isSelectionValid,
  isTargetInfoContainer,
  csvToNewlines
};
