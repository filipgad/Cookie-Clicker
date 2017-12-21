import React from 'react';

import Cookie from './Cookie.jsx';
import Store from './Store.jsx';
import ScoreBoard from './ScoreBoard.jsx';
import { producers, gameScore } from '../initial_game_data.js';
import { updateGameScoreData, getGameScoreData } from '../indexedDB.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state =  gameScore;
  }

  componentDidUpdate() {
    // after every update save new state value
    updateGameScoreData(gameScore.name, [this.state.numberOfCookies, this.state.producePerSec, this.state.cookiesMade])
  }

  componentDidMount() {
    this.intervalId = setInterval( () => {
      this.setState((prevState) => {
        return {
          numberOfCookies: prevState.numberOfCookies + this.state.producePerSec,
          cookiesMade: prevState.cookiesMade + this.state.producePerSec
        }
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  // COOKIE BUTTON ACTION
  clickCookie = () => {
    this.setState((prevState) => {
      return {
        cookiesMade: prevState.cookiesMade + 1,
        numberOfCookies: prevState.numberOfCookies + 1
      }
    });
  }

  // PRODUCER BUTTON ACTION
  clickProducer = (cost, production) => {
    this.setState((prevState) => {
      return {
        numberOfCookies: prevState.numberOfCookies - cost,
        producePerSec: prevState.producePerSec + production
      }
    });
  }

  // // NEW GAME BUTTON ACTION
  // clickNewGame = () => {
  //   this.state = gameScore;
  // }

  render() {

    const {
      numberOfCookies,
      producePerSec,
      cookiesMade
    } = this.state;

    return (
      <div className="game">
        <ScoreBoard numberOfCookies={numberOfCookies} producePerSec={producePerSec} cookiesMade={cookiesMade}  />
        <div className="game_nav">
          <Cookie onClick={this.clickCookie} />
          <Store numberOfCookies={numberOfCookies} clickProducer={this.clickProducer} producers={producers} />
        </div>
        <button className="newGame" onClick={this.clickNewGame}>NEW GAME</button>
      </div>
    );
  }
}

export default Game;
