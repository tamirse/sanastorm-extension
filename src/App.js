import React, { Component, Fragment } from "react";

import SanastormButton from "./components/SanastormButton/SanastormButton";
import SanastormInfoContainer from "./components/InfoContainer/InfoContainer";
import utilities from "./utilities/utilities";

class App extends Component {
  state = {
    showButton: false,
    showInfoContainer: false,
    selectedText: "",
    selectedElement: null,
    buttonCoords: { x: 0, y: 0 },
    infoContainerCoords: { x: 0, y: 0 },
    wordData: null,
    wordEnglish: null,
    partOfSpeech: null,
    noData: false
  };

  componentDidMount() {
    // bind functionality to document.onmousedown
    // if selection already exists when pressing mouse button, don't display sanastorm button
    document.onmousedown = event => {
      let selection = utilities.getSelection();

      if (selection && !utilities.isTargetSanastormButton(event)) {
        this.hideButton();
      } else if (selection && utilities.isTargetSanastormButton(event)) {
        this.buttonClickedHandler();
      } else if (!selection) {
        this.hideButton();
      }
    };

    // bind functionality to document.onmouseup
    document.onmouseup = event => {
      // get text selection
      let selection = utilities.getSelection();
      let selectedElement = utilities.getSelectedElement();

      if (selection && !utilities.isTargetInfoContainer(event)) {
        // we save the selection object
        // because the selection may disappear, and we need to extract
        // the selection position from the selection object
        this.setState({
          selectedText: selection,
          selectedElement: selectedElement
        });

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

      // if pressing outside of info container, hide it
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
      // eslint-disable-next-line no-undef
      chrome.runtime.sendMessage({ input, init }, messageResponse => {
        resolve(messageResponse);
      });
    });
  }

  getWordData() {
    let word = this.state.selectedText;
    let baseURL = "http://3.125.249.95:3000/api/sana/";

    return new Promise((resolve, reject) => {
      this.fetchResource(baseURL + word)
        .then(res => {
          let noDataResponse = {
            inflections: {
              Alert: "No data, sorry!",
              Partitive: "No dataa, sorrya!"
            },
            english: "No data, sorry!",
            noData: true
          };

          if (res) {
            res = JSON.parse(res);

            if (Object.keys(res).length === 0) {
              resolve(noDataResponse);
            }
            resolve(res);
          } else {
            resolve(noDataResponse);
          }
        })
        .catch(e => console.log(e));
    });
  }

  buttonClickedHandler = () => {
    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage({ action: "send", page: "infoContainer" }); // google analytics tracking

    let coords = utilities.getSelectionPosition(this.state.selectedElement);

    this.getWordData().then(data => {
      let partOfSpeech = data.partOfSpeech;

      if (data["omorfi"] !== undefined) {
        if (data["omorfi"]["UPOS"] !== undefined) {
          partOfSpeech = data["omorfi"]["UPOS"];
        }
      }

      this.setState({
        showButton: false,
        showInfoContainer: true,
        infoContainerCoords: coords,
        wordData: data.inflections,
        wordEnglish: data.english ? data.english : "-",
        partOfSpeech: partOfSpeech,
        noData: data.noData
      });
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.showButton ? (
          <SanastormButton coords={this.state.buttonCoords} />
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
