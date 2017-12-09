import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function() {

  // Cookie to click
  class Cookie extends React.Component {
    render() {
      return <button className="cookie" onClick={this.props.onClick}>Cookie</button>;
    }
  }

  // Button with producer
  class Producer extends React.Component {
    render() {

      // to add class with producer name
      let classList = [this.props.name.toLowerCase(), 'storeBtn'];
      let className = classList.join(' ');

      return (
        this.props.numberOfCookies >= this.props.toActiveBtn ?
          <button className={className} onClick={this.props.clickBtn}>{this.props.name}! You have: {this.props.numberOfElements} {this.props.name}s. Each {this.props.name} produces {this.props.producePerSec} cookies per second. For next you need: {this.props.toActiveBtn} cookies.</button>
        :
          <button className={className} disabled onClick={this.props.clickBtn}>{this.props.name}! You have: {this.props.numberOfElements} {this.props.name}s. Each {this.props.name} produces {this.props.producePerSec} cookies per second. For next you need: {this.props.toActiveBtn} cookies.</button>
      );
    }
  }

  // Shop with producers
  class Store extends React.Component {

    render() {
      return (
        <div className="store">
          <Producer name="Cursor" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickCursor} numberOfElements={this.props.numberOfCursors} toActiveBtn={this.props.toActiveCursor} producePerSec={this.props.cookiesCursor} />
          <Producer name="Grandma" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickGrandma} numberOfElements={this.props.numberOfGrandmas} toActiveBtn={this.props.toActiveGrandma} producePerSec={this.props.cookiesGrandma} />
          <Producer name="Farm" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickFarm} numberOfElements={this.props.numberOfFarms} toActiveBtn={this.props.toActiveFarm} producePerSec={this.props.cookiesFarm} />
          <Producer name="Bakery" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickBakery} numberOfElements={this.props.numberOfBakeries} toActiveBtn={this.props.toActiveBakery} producePerSec={this.props.cookiesBakery} />
          <Producer name="Mine" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickMine} numberOfElements={this.props.numberOfMines} toActiveBtn={this.props.toActiveMine} producePerSec={this.props.cookiesMine} />
        </div>
      );
    }
  }

  // Board with all scores: cookies now, all cookies, cookies per second
  class ScoreBoard extends React.Component {
    render() {
      return (
        <div className="scoreBoard">
          <h1>You have now: {this.props.numberOfCookies} cookies</h1>
          <p>You produce {this.props.producePerSec} cookies per second</p>
          <h2>You have already made {this.props.cookiesMade} cookies</h2>
        </div>
      )
    }
  }

  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
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
        toActiveFarm: 100,
        cookiesFarm: 0,
        numberOfBakeries: 0,
        toActiveBakery: 200,
        cookiesBakery: 0,
        numberOfMines: 0,
        toActiveMine: 400,
        cookiesMine: 0
      }
    }

    componentWillMount() {
      this.intervalId = setInterval( () => {
        this.setState({
          numberOfCookies: this.state.numberOfCookies + (this.state.cookiesCursor + this.state.cookiesGrandma + this.state.cookiesFarm + this.state.cookiesBakery + this.state.cookiesMine),
          cookiesMade: this.state.cookiesMade + (this.state.cookiesCursor + this.state.cookiesGrandma + this.state.cookiesFarm + this.state.cookiesBakery + this.state.cookiesMine)
        });
      }, 1000);
    }

    componentWillUnmount() {
      clearInterval(this.intervalId);
    }

    handleClick = () => {
      this.setState({
        cookiesMade: this.state.cookiesMade + 1,
        numberOfCookies: this.state.numberOfCookies + 1
      });
    }

    clickCursor = () => {
      this.setState({
        numberOfCursors: this.state.numberOfCursors + 1,
        toActiveCursor: this.state.toActiveCursor * 2,
        numberOfCookies: this.state.numberOfCookies - this.state.toActiveCursor,
        cookiesCursor: this.state.cookiesCursor + 1,
        producePerSec: this.state.producePerSec + 1
      });
    }

    clickGrandma = () => {
      this.setState({
        numberOfGrandmas: this.state.numberOfGrandmas + 1,
        toActiveGrandma: this.state.toActiveGrandma * 2,
        numberOfCookies: this.state.numberOfCookies - this.state.toActiveGrandma,
        cookiesGrandma: this.state.cookiesGrandma + 2,
        producePerSec: this.state.producePerSec + 2
      });
    }

    clickFarm = () => {
      this.setState({
        numberOfFarms: this.state.numberOfFarms + 1,
        toActiveFarm: this.state.toActiveFarm * 2,
        numberOfCookies: this.state.numberOfCookies - this.state.toActiveFarm,
        cookiesFarm: this.state.cookiesFarm + 4,
        producePerSec: this.state.producePerSec + 4
      });
    }

    clickBakery = () => {
      this.setState({
        numberOfBakeries: this.state.numberOfBakeries + 1,
        toActiveBakery: this.state.toActiveBakery * 2,
        numberOfCookies: this.state.numberOfCookies - this.state.toActiveBakery,
        cookiesBakery: this.state.cookiesBakery + 8,
        producePerSec: this.state.producePerSec + 8
      });
    }

    clickMine = () => {
      this.setState({
        numberOfMines: this.state.numberOfMines + 1,
        toActiveMine: this.state.toActiveMine * 2,
        numberOfCookies: this.state.numberOfCookies - this.state.toActiveMine,
        cookiesMine: this.state.cookiesMine + 16,
        producePerSec: this.state.producePerSec + 16
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
          <Cookie onClick={this.handleClick} />
          <Store
            numberOfCookies={numberOfCookies}
            clickCursor={this.clickCursor} clickGrandma={this.clickGrandma} clickFarm={this.clickFarm} clickBakery={this.clickBakery} clickMine={this.clickMine}
            numberOfCursors={numberOfCursors} numberOfGrandmas={numberOfGrandmas} numberOfFarms={numberOfFarms} numberOfBakeries={numberOfBakeries} numberOfMines={numberOfMines}
            toActiveCursor={toActiveCursor} toActiveGrandma={toActiveGrandma} toActiveFarm={toActiveFarm} toActiveBakery={toActiveBakery} toActiveMine={toActiveMine}
            cookiesCursor={cookiesCursor} cookiesGrandma={cookiesGrandma} cookiesFarm={cookiesFarm} cookiesBakery={cookiesBakery} cookiesMine={cookiesMine}
          />
        </div>
      );
    }
  }

  class App extends React.Component {
    render() {
      return (
        <Game />
      );
    }
  }

    ReactDOM.render(
      <App />,
      document.getElementById('app')
    );
});
