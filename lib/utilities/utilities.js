import * as inflections from "./inflections";

var MAX_WORD_LEN = 61;

/**
 * return page text selection as string
 */
var getSelection = function getSelection() {
  return document.getSelection().toString().trim();
};

/**
 * get text selection position on the page
 * x,y coordinates
 * selection width and height
 */
var getSelectionPosition = function getSelectionPosition() {
  var range = document.getSelection().getRangeAt(0);
  var domRect = range.getClientRects()[0]; // contains the borders of the selection

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
var isSelectionValid = function isSelectionValid(selection) {
  if (selection === "" || selection.length > MAX_WORD_LEN || selection.includes("\n") || selection.includes(" ")) {
    return false;
  }

  return true;
};

/**
 * return true iff target element is the info container
 */
var isTargetInfoContainer = function isTargetInfoContainer(event) {
  return event.target.classList.contains("sanastorm-ct");
};

/**
 * return the words' nominative or infinitive value
 * @param {object} wordData
 */
var getWordNominativeOrInfinitive = function getWordNominativeOrInfinitive(wordData) {
  var word = null;

  if (wordData) {
    if (inflections.NOMINATIVE in wordData) {
      word = wordData.nominative;
    } else if (inflections.INFINITIVE in wordData) {
      word = wordData.infinitive;
    }
  }

  return word;
};

/**
 * replaces commas with newlines
 * @param {string} string
 */
var csvToNewlines = function csvToNewlines(string) {
  return string.replace(/,/g, ",\n");
};

export default {
  getSelection: getSelection,
  getSelectionPosition: getSelectionPosition,
  isSelectionValid: isSelectionValid,
  isTargetInfoContainer: isTargetInfoContainer,
  getWordNominativeOrInfinitive: getWordNominativeOrInfinitive,
  csvToNewlines: csvToNewlines
};