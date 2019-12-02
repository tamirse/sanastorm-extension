import React, { Component, Fragment } from "react";

import SanastormButton from "./components/SanastormButton/SanastormButton";
import SanastormInfoContainer from "./components/InfoContainer/InfoContainer";
import utilities from "./utilities/utilities";

class App extends Component {
  state = {
    showButton: false,
    showInfoContainer: false,
    selectedText: "",
    buttonCoords: { x: 0, y: 0 },
    infoContainerCoords: { x: 0, y: 0 },
    wordData: null,
    wordEnglish: null,
    partOfSpeech: null
  };

  constructor(props) {
    super(props);
    this.buttonClickedHandler = this.buttonClickedHandler.bind(this);
  }

  componentDidMount() {
    // bind functionality to document.onmouseup
    document.onmouseup = event => {
      // get text selection
      let selection = utilities.getSelection();

      if (selection && !utilities.isTargetInfoContainer(event)) {
        this.setState({ selectedText: selection });

        if (
          selection &&
          !this.state.showButton &&
          utilities.isSelectionValid(selection)
        ) {
          this.getAndSetButtonCoords(event); // set button coordinates (updates state)
          this.showButton();
        } else {
          this.hideButton();
        }
      }

      if (!utilities.isTargetInfoContainer(event)) {
        this.hideInfoContainer();
      }
    };
  }

  hideButton() {
    setTimeout(() => {
      this.setState({ showButton: false });
    }, 10);
  }

  showButton() {
    this.setState({ showButton: true });
  }

  hideInfoContainer() {
    this.setState({ showInfoContainer: false });
  }

  setButtonCoordinates(x, y) {
    this.setState({
      buttonCoords: { x: x, y: y }
    });
  }

  getAndSetButtonCoords(event) {
    let x = event.pageX;
    let y = event.pageY;

    setTimeout(() => {
      const googleTranslateDiv = document.getElementById("gtx-trans");

      if (googleTranslateDiv) {
        const OFFSET = 36;
        x = googleTranslateDiv.style.left;
        y = googleTranslateDiv.style.top;

        this.setButtonCoordinates(+x.substring(0, x.length - 2) + OFFSET, y);
      } else {
        this.setButtonCoordinates(x, y - 50);
      }
    }, 25);
  }

  fetchResource(input, init) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ input, init }, messageResponse => {
        resolve(messageResponse);
      });
    });
  }

  getWordData() {
    let word = this.state.selectedText;
    let baseURL =
      "http://ec2-3-122-227-94.eu-central-1.compute.amazonaws.com:3000/api/sana/";

    return new Promise((resolve, reject) => {
      this.fetchResource(baseURL + word)
        .then(res => {
          // no response, check if word has question suffix, remove it and try again
          if (!res) {
            word = utilities.removeQuestionSuffix(word); // try to remove question suffix
            if (word !== this.state.selectedText) {
              // if there was a suffix, try fetching again with modified word
              return this.fetchResource(baseURL + word);
            }
          } else {
            return res;
          }
        })
        .then(res => {
          if (res) {
            res = JSON.parse(res);
            resolve(res);
          } else {
            res = {
              inflections: {
                Alert: "No data, sorry!",
                Partitive: "No dataa, sorrya!"
              },
              english: "No data, sorry!",
              noData: true
            };
            resolve(res);
          }
        })
        .catch(e => console.log(e));
    });
  }

  buttonClickedHandler() {
    let coords = utilities.getSelectionPosition();

    this.getWordData().then(data => {
      this.setState({
        showButton: false,
        showInfoContainer: true,
        infoContainerCoords: coords,
        wordData: data.inflections,
        wordEnglish: data.english ? data.english : "-",
        partOfSpeech: data.partOfSpeech,
        noData: data.noData
      });
    });
  }

  render() {
    return (
      <Fragment>
        {this.state.showButton ? (
          <SanastormButton
            coords={this.state.buttonCoords}
            clicked={this.buttonClickedHandler}
          />
        ) : null}
        {this.state.showInfoContainer ? (
          <SanastormInfoContainer
            coords={this.state.infoContainerCoords}
            selectedText={this.state.selectedText}
            wordData={this.state.wordData}
            wordEnglish={this.state.wordEnglish}
            partOfSpeech={this.state.partOfSpeech}
            currentInflection={utilities.getSelectedWordInflection(
              this.state.selectedText,
              this.state.wordData
            )}
            noData={this.state.noData}
            isPlural={utilities.isNounPlural(
              this.state.selectedText,
              this.state.wordData
            )}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default App;
