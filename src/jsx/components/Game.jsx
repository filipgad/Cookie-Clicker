import React from 'react';

import Cookie from './Cookie.jsx';
import Store from './Store.jsx';
import ScoreBoard from './ScoreBoard.jsx';

const gameState = {
  numberOfCookies: 0, // stores the current number of cookies
  producePerSec: 0, // stores the number of produced cookies per second
  cookiesMade: 0, // stores the number of cookies produced
  numberOfCursors: 0, // each numberOf... stores the number of producers we have bought
  toActiveCursor: 5, // each toActive... stores the number of points we need to activate the producer
  cookiesCursor: 0, // each cookies... stores the number of cookies produced by producer per second
  numberOfGrandmas: 0,
  toActiveGrandma: 50,
  cookiesGrandma: 0,
  numberOfFarms:0,
  toActiveFarm: 1100,
  cookiesFarm: 0,
  numberOfBakeries: 0,
  toActiveBakery: 12000,
  cookiesBakery: 0,
  numberOfMines: 0,
  toActiveMine: 130000,
  cookiesMine: 0
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.loadSession() == null ? gameState : this.loadSession();
  }

  componentDidUpdate() {
    // after every update save new state value
    this.saveSession(this.state);
  }

  componentDidMount() {
    this.intervalId = setInterval( () => {
      this.setState((prevState) => {
        return {
          numberOfCookies: prevState.numberOfCookies + (this.state.cookiesCursor + this.state.cookiesGrandma + this.state.cookiesFarm + this.state.cookiesBakery + this.state.cookiesMine),
          cookiesMade: prevState.cookiesMade + (this.state.cookiesCursor + this.state.cookiesGrandma + this.state.cookiesFarm + this.state.cookiesBakery + this.state.cookiesMine)
        }
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  // localStorage save
  saveSession = (state) => {
      localStorage.setItem('cookieClickerData', JSON.stringify(state));
  }

  // localStorage load
  loadSession = () => {
      return JSON.parse(localStorage.getItem('cookieClickerData'));
  }

  // COOKIE BUTTON
  handleClick = () => {
    this.setState((prevState) => {
      return {
        cookiesMade: prevState.cookiesMade + 1,
        numberOfCookies: prevState.numberOfCookies + 1
      }
    });
  }

  // NEW GAME BUTTON
  clickNewGame = () => {
    this.state = gameState;
  }

  // CURSOR BUTTON
  clickCursor = () => {
    this.setState((prevState) => {
      return {
        numberOfCursors: prevState.numberOfCursors + 1,
        toActiveCursor: Math.ceil(prevState.toActiveCursor * 1.15),
        numberOfCookies: prevState.numberOfCookies - this.state.toActiveCursor,
        cookiesCursor: prevState.cookiesCursor + 1,
        producePerSec: prevState.producePerSec + 1
      }
    });
  }

  // GRANDMA BUTTON
  clickGrandma = () => {
    this.setState((prevState) => {
      return {
        numberOfGrandmas: prevState.numberOfGrandmas + 1,
        toActiveGrandma: Math.ceil(prevState.toActiveGrandma * 1.25),
        numberOfCookies: prevState.numberOfCookies - this.state.toActiveGrandma,
        cookiesGrandma: prevState.cookiesGrandma + 2,
        producePerSec: prevState.producePerSec + 2
      }
    });
  }

  // FARM BUTTON
  clickFarm = () => {
    this.setState((prevState) => {
      return {
        numberOfFarms: prevState.numberOfFarms + 1,
        toActiveFarm: Math.ceil(prevState.toActiveFarm * 1.5),
        numberOfCookies: prevState.numberOfCookies - this.state.toActiveFarm,
        cookiesFarm: prevState.cookiesFarm + 8,
        producePerSec: prevState.producePerSec + 8
      }
    });
  }

  // BAKERY BUTTON
  clickBakery = () => {
    this.setState((prevState) => {
      return {
        numberOfBakeries: prevState.numberOfBakeries + 1,
        toActiveBakery: Math.ceil(prevState.toActiveBakery * 1.75),
        numberOfCookies: prevState.numberOfCookies - this.state.toActiveBakery,
        cookiesBakery: prevState.cookiesBakery + 47,
        producePerSec: prevState.producePerSec + 47
      }
    });
  }

  // MINE BUTTON
  clickMine = () => {
    this.setState((prevState) => {
      return {
        numberOfMines: prevState.numberOfMines + 1,
        toActiveMine: prevState.toActiveMine * 2,
        numberOfCookies: prevState.numberOfCookies - this.state.toActiveMine,
        cookiesMine: prevState.cookiesMine + 260,
        producePerSec: prevState.producePerSec + 260
      }
    });
  }

  render() {

    const {
      numberOfCookies,
      producePerSec,
      cookiesMade,
      numberOfCursors,
      toActiveCursor,
      cookiesCursor,
      numberOfGrandmas,
      toActiveGrandma,
      cookiesGrandma,
      numberOfFarms,
      toActiveFarm,
      cookiesFarm,
      numberOfBakeries,
      toActiveBakery,
      cookiesBakery,
      numberOfMines,
      toActiveMine,
      cookiesMine
    } = this.state;

    return (
      <div className="game">
        <ScoreBoard numberOfCookies={numberOfCookies} producePerSec={producePerSec} cookiesMade={cookiesMade}  />
        <div className="game_nav">
          <Cookie onClick={this.handleClick} />
          <Store
            numberOfCookies={numberOfCookies}
            clickCursor={this.clickCursor} clickGrandma={this.clickGrandma} clickFarm={this.clickFarm} clickBakery={this.clickBakery} clickMine={this.clickMine}
            numberOfCursors={numberOfCursors} numberOfGrandmas={numberOfGrandmas} numberOfFarms={numberOfFarms} numberOfBakeries={numberOfBakeries} numberOfMines={numberOfMines}
            toActiveCursor={toActiveCursor} toActiveGrandma={toActiveGrandma} toActiveFarm={toActiveFarm} toActiveBakery={toActiveBakery} toActiveMine={toActiveMine}
            cookiesCursor={cookiesCursor} cookiesGrandma={cookiesGrandma} cookiesFarm={cookiesFarm} cookiesBakery={cookiesBakery} cookiesMine={cookiesMine}
          />
        </div>
        <button className="newGame" onClick={this.clickNewGame}>NEW GAME</button>
      </div>
    );
  }
}

export default Game;
