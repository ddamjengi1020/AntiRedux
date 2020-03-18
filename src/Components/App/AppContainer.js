import React, { Component } from "react";
import AppPresenter from "./AppPresenter";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Store from "store";

const GlobalStyle = createGlobalStyle`
${reset};
body{
    background-color:#ecf0f1;
}`;

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this._deleteNotif = id => {
      this.setState(currentState => {
        const newState = delete currentState.notifications[id];
        return newState;
      });
    };

    this.seenCheck = (currentState, id, bool) => {
      return {
        ...currentState,
        notifications: {
          ...currentState.notifications,
          [id]: {
            ...currentState.notifications[id],
            seen: bool
          }
        }
      };
    };
    this._seenNotif = id => {
      this.setState(currentState => {
        if (currentState.notifications[id].seen === false) {
          return this.seenCheck(currentState, id, true);
        } else {
          return this.seenCheck(currentState, id, false);
        }
      });
    };
    this.state = {
      notifications: {
        "1": {
          id: 1,
          text: "Something",
          seen: false
        },
        "2": {
          id: 2,
          text: "Something else",
          seen: false
        },
        "3": {
          id: 3,
          text: "Something else but different",
          seen: false
        }
      },
      deleteNotif: this._deleteNotif,
      seenNotif: this._seenNotif
    };
  }

  render() {
    return (
      <Store.Provider value={this.state}>
        <GlobalStyle />
        <AppPresenter />
      </Store.Provider>
    );
  }
}

export default AppContainer;
