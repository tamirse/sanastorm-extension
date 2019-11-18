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
    infoContainerCoords: { x: 0, y: 0 }
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

      if (selection && selection !== this.state.selectedText) {
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

  buttonClickedHandler() {
    let coords = utilities.getSelectionPosition();

    this.setState({
      showButton: false,
      showInfoContainer: true,
      infoContainerCoords: coords
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
        />
      </Fragment>
    );
  }
}

export default App;
