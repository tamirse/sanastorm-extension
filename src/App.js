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
    return new Promise((resolve, reject) => {
      this.fetchResource(
        `http://ec2-3-122-227-94.eu-central-1.compute.amazonaws.com:3000/api/sana/${this.state.selectedText}`
      )
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
              english: "No data, sorry!"
            };
            resolve(res);
          }
        })
        .catch(e => console.log(e));
    });
  }

  getSelectedWordInflection() {
    let selectedWordInflection = null;

    Object.keys(this.state.wordData).forEach(inflection => {
      if (
        this.state.wordData[inflection] ===
        this.state.selectedText.toLowerCase()
      ) {
        selectedWordInflection = inflection;
      }
    });

    return selectedWordInflection;
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
        partOfSpeech: data.partOfSpeech
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
            currentInflection={this.getSelectedWordInflection()}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default App;
