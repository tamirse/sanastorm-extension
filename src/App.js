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
    wordEnglish: null
  };

  constructor(props) {
    super(props);
    this.buttonClickedHandler = this.buttonClickedHandler.bind(this);
  }

  componentDidMount() {
    console.log("Hei!");

    // bind functionality to document.onmouseup
    document.onmouseup = event => {
      // get text selection
      let selection = utilities.getSelection();

      if (selection && !this.isTargetInfoContainer(event)) {
        this.setState({ selectedText: selection });
        console.log(this.state.selectedText);

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

      if (!this.isTargetInfoContainer(event)) {
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

  isTargetInfoContainer(event) {
    return event.target.classList.contains("sanastorm-ct");
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

  getWordData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("FETCHING DATA!");
        let dummyInflections = {
          nominative: "huone",
          genitive: "huoneen",
          partitive: "huonetta",
          inessive: "huonessa",
          elative: "huoneesta",
          illative: "huoneeseen",
          adessive: "huoneella",
          ablative: "huoneelta",
          allative: "huoneelle",
          essive: "huoneena",
          translative: "huoneeksi",
          instructive: null,
          abessive: "huoneetta",
          comitative: null
        };
        let dummyData = {
          inflections: dummyInflections,
          english: ["room", "house (dynasty)", "house(astrology)"]
        };
        resolve(dummyData);
      }, 200);
    });
  }

  buttonClickedHandler() {
    let coords = utilities.getSelectionPosition();

    this.getWordData().then(data => {
      console.log(data);

      this.setState({
        showButton: false,
        showInfoContainer: true,
        infoContainerCoords: coords,
        wordData: data.inflections,
        wordEnglish: data.english
      });
    });
  }

  render() {
    return (
      <Fragment>
        <SanastormButton
          show={this.state.showButton}
          coords={this.state.buttonCoords}
          clicked={this.buttonClickedHandler}
        />
        <SanastormInfoContainer
          show={this.state.showInfoContainer}
          coords={this.state.infoContainerCoords}
          selectedText={this.state.selectedText}
          wordData={this.state.wordData}
          wordEnglish={this.state.wordEnglish}
        />
      </Fragment>
    );
  }
}

export default App;
