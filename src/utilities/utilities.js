import * as inflections from "./inflections";

const MAX_WORD_LEN = 61;
const CONTAINER_CLASS = "sanastorm-ct";

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
 * return the selected element object (not a string)
 */
const getSelectedElement = () => {
  return document.getSelection();
};

/**
 * get text selection position on the page
 * x,y coordinates
 * selection width and height
 */
const getSelectionPosition = selectedElement => {
  const range = selectedElement.getRangeAt(0);
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
 * return true iff target element is the sanastorm button
 */
const isTargetSanastormButton = event => {
  return event.target.classList.contains("sanastorm-icon");
};

/**
 * return the words' nominative or infinitive value
 * @param {object} wordData
 */
const getWordNominativeOrInfinitive = wordData => {
  let word = null;

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
const csvToNewlines = string => {
  return string.replace(/,/g, ",\n");
};

/**
 * does the word contain the -ko/-kö suffix
 * @param {string} word
 */
const isWordQuestionSuffix = word => {
  let suffix1 = "ko";
  let suffix2 = "kö";
  let wordLen = word.length;

  return (
    word.substr(wordLen - 2, wordLen) === suffix1 ||
    word.substr(wordLen - 2, wordLen) === suffix2
  );
};

/**
 * if the question has the -ko/-kö suffix, remove it
 * @param {string} word
 */
const removeQuestionSuffix = word => {
  if (isWordQuestionSuffix(word)) {
    return word.substr(0, word.length - 2);
  }
};

/**
 * returns selected word inflection
 * @param {string} selection
 * @param {object} wordData
 */
const getSelectedWordInflection = (selection, wordData) => {
  let selectedWordInflection = null;

  Object.keys(wordData).forEach(inflection => {
    if (wordData[inflection] === selection.toLowerCase()) {
      selectedWordInflection = inflection;
    }
  });

  return selectedWordInflection;
};

/**
 * return true iff selection is in plural form
 * @param {string} selection
 * @param {object} wordData
 */
const isNounPlural = (selection, wordData) => {
  let inflection = getSelectedWordInflection(selection, wordData);
  if (inflection) {
    return inflection.substr(0, 2) === "pl";
  } else {
    return false;
  }
};

export default {
  CONTAINER_CLASS,
  getSelection,
  getSelectedElement,
  getSelectionPosition,
  isSelectionValid,
  isTargetInfoContainer,
  isTargetSanastormButton,
  getWordNominativeOrInfinitive,
  csvToNewlines,
  isWordQuestionSuffix,
  removeQuestionSuffix,
  getSelectedWordInflection,
  isNounPlural
};
