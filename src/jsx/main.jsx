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

      // add class with producer name
      let classList = [this.props.name.toLowerCase(), 'storeBtn'];
      let className = classList.join(' ');

      return (
        this.props.numberOfCookies >= this.props.toActiveBtn ?
          <button className={className} onClick={this.props.clickBtn}>{this.props.name}! You have: {this.props.numberOfElements} {this.props.name}s. For next you need: {this.props.toActiveBtn} cookies.</button>
        :
          <button className={className} disabled onClick={this.props.clickBtn}>{this.props.name}! You have: {this.props.numberOfElements} {this.props.name}s. For next you need: {this.props.toActiveBtn} cookies.</button>
      );
    }
  }

  // Shop with producers
  class Store extends React.Component {

    render() {
      return (
        <div>
          <Producer name="Cursor" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickCursor} numberOfElements={this.props.numberOfCursors} toActiveBtn={this.props.toActiveCursor}/>
          <Producer name="Grandma" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickGrandma} numberOfElements={this.props.numberOfGrandmas} toActiveBtn={this.props.toActiveGrandma}/>
          <Producer name="Farm" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickFarm} numberOfElements={this.props.numberOfFarms} toActiveBtn={this.props.toActiveFarm}/>
          <Producer name="Bakery" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickBakery} numberOfElements={this.props.numberOfBakeries} toActiveBtn={this.props.toActiveBakery}/>
          <Producer name="Mine" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickMine} numberOfElements={this.props.numberOfMines} toActiveBtn={this.props.toActiveMine}/>
        </div>
      );
    }
  }

  // Board with all scores: cookies now, all cookies, cookies per second
  class ScoreBoard extends React.Component {
    render() {
      return (
        <div>
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
        numberOfGrandmas: 0,
        toActiveGrandma: 50,
        numberOfFarms:0,
        toActiveFarm: 100,
        numberOfBakeries: 0,
        toActiveBakery: 200,
        numberOfMines: 0,
        toActiveMine: 400
      }
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
        numberOfCookies: this.state.numberOfCookies - this.state.toActiveCursor
      });
    }

    clickGrandma = () => {
      this.setState({
        numberOfGrandmas: this.state.numberOfGrandmas + 1,
        toActiveGrandma: this.state.toActiveGrandma * 2,
        numberOfCookies: this.state.numberOfCookies - this.state.toActiveGrandma
      });
    }

    clickFarm = () => {
      this.setState({
        numberOfFarms: this.state.numberOfFarms + 1,
        toActiveFarm: this.state.toActiveFarm * 2,
        numberOfCookies: this.state.numberOfCookies - this.state.toActiveFarm
      });
    }

    clickBakery = () => {
      this.setState({
        numberOfBakeries: this.state.numberOfBakeries + 1,
        toActiveBakery: this.state.toActiveBakery * 2,
        numberOfCookies: this.state.numberOfCookies - this.state.toActiveBakery
      });
    }

    clickMine = () => {
      this.setState({
        numberOfMines: this.state.numberOfMines + 1,
        toActiveMine: this.state.toActiveMine * 2,
        numberOfCookies: this.state.numberOfCookies - this.state.toActiveMine
      });
    }

    render() {

      const {
        numberOfCookies,
        producePerSec,
        cookiesMade,
        numberOfCursors,
        toActiveCursor,
        numberOfGrandmas,
        toActiveGrandma,
        numberOfFarms,
        toActiveFarm,
        numberOfBakeries,
        toActiveBakery,
        numberOfMines,
        toActiveMine
      } = this.state;

      return (
        <div>
          <ScoreBoard numberOfCookies={numberOfCookies} producePerSec={producePerSec} cookiesMade={cookiesMade}  />
          <Cookie onClick={this.handleClick} />
          <Store
            numberOfCookies={numberOfCookies}
            clickCursor={this.clickCursor} clickGrandma={this.clickGrandma} clickFarm={this.clickFarm} clickBakery={this.clickBakery} clickMine={this.clickMine}
            numberOfCursors={numberOfCursors} numberOfGrandmas={numberOfGrandmas} numberOfFarms={numberOfFarms} numberOfBakeries={numberOfBakeries} numberOfMines={numberOfMines}
            toActiveCursor={toActiveCursor} toActiveGrandma={toActiveGrandma} toActiveFarm={toActiveFarm} toActiveBakery={toActiveBakery} toActiveMine={toActiveMine}
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
