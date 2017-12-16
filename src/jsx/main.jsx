import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function() {

  // Cookie to click
  class Cookie extends React.Component {
    render() {
      return <button className="cookie" onClick={this.props.onClick}></button>;
    }
  }

  // Button with producer
  class Producer extends React.Component {
    render() {

      // text in button
      const producerBtnContent =  <div>
                                    <img src={"../dist/imagessrc/images/" + this.props.img} />
                                    <h1>{this.props.name}</h1>
                                    <ul>
                                      <li>Each {this.props.name} produces {this.props.producePerSec} cookies per second.</li>
                                      <li>For next you need: {this.props.toActiveBtn} cookies.</li>
                                    </ul>
                                    <span>{this.props.numberOfElements}</span>
                                  </div>;

      return (
        this.props.numberOfCookies >= this.props.toActiveBtn
        ?
          <button className={`${this.props.name.toLowerCase()} storeBtn`} onClick={this.props.clickBtn}>{producerBtnContent}</button>
        :
          <button className={`${this.props.name.toLowerCase()} storeBtn`} disabled onClick={this.props.clickBtn}>{producerBtnContent}</button>
      );
    }
  }

  // Shop with producers
  class Store extends React.Component {

    render() {
      return (
        <div className="store">
          <Producer name="Cursor" img="004-pay-per-click.png" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickCursor} numberOfElements={this.props.numberOfCursors} toActiveBtn={this.props.toActiveCursor} producePerSec={this.props.cookiesCursor} />
          <Producer name="Grandma" img="005-old-woman.png" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickGrandma} numberOfElements={this.props.numberOfGrandmas} toActiveBtn={this.props.toActiveGrandma} producePerSec={this.props.cookiesGrandma} />
          <Producer name="Farm" img="003-sprout.png" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickFarm} numberOfElements={this.props.numberOfFarms} toActiveBtn={this.props.toActiveFarm} producePerSec={this.props.cookiesFarm} />
          <Producer name="Bakery" img="002-business.png" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickBakery} numberOfElements={this.props.numberOfBakeries} toActiveBtn={this.props.toActiveBakery} producePerSec={this.props.cookiesBakery} />
          <Producer name="Mine" img="001-transport.png" numberOfCookies={this.props.numberOfCookies} clickBtn={this.props.clickMine} numberOfElements={this.props.numberOfMines} toActiveBtn={this.props.toActiveMine} producePerSec={this.props.cookiesMine} />
        </div>
      );
    }
  }

  // Board with all scores: cookies now, all cookies, cookies per second
  class ScoreBoard extends React.Component {
    render() {
      return (
        <div className="scoreBoard">
          <h1>Now you have: {this.props.numberOfCookies} cookies</h1>
          <p>You produce {this.props.producePerSec} cookies per second</p>
          <h3>You have already made {this.props.cookiesMade} cookies</h3>
        </div>
      )
    }
  }

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
    toActiveFarm: 100,
    cookiesFarm: 0,
    numberOfBakeries: 0,
    toActiveBakery: 200,
    cookiesBakery: 0,
    numberOfMines: 0,
    toActiveMine: 400,
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
          toActiveCursor: prevState.toActiveCursor * 2,
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
          toActiveGrandma: prevState.toActiveGrandma * 2,
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
          toActiveFarm: prevState.toActiveFarm * 2,
          numberOfCookies: prevState.numberOfCookies - this.state.toActiveFarm,
          cookiesFarm: prevState.cookiesFarm + 4,
          producePerSec: prevState.producePerSec + 4
        }
      });
    }

    // BAKERY BUTTON
    clickBakery = () => {
      this.setState((prevState) => {
        return {
          numberOfBakeries: prevState.numberOfBakeries + 1,
          toActiveBakery: prevState.toActiveBakery * 2,
          numberOfCookies: prevState.numberOfCookies - this.state.toActiveBakery,
          cookiesBakery: prevState.cookiesBakery + 8,
          producePerSec: prevState.producePerSec + 8
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
          cookiesMine: prevState.cookiesMine + 16,
          producePerSec: prevState.producePerSec + 16
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

  class App extends React.Component {
    render() {
      return (
        <Game />
      );
    }
  }

  // var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
  //
  // // Open (or create) the database
  // var open = indexedDB.open("CookieClickerDB", 1);
  //
  // saveGame = () => {
  //   open.onerror=function(e) {
  //     console.log('Error')
  //   };
  //   open.onsuccess = function(e) {
  //     db=e.target.result;
  //   };
  //   open.onupgradeneeded = function(e){
  //     console.log(db);
  //     db=e.target.result;
  //     var trans=e.target.transaction;
  //     var os = db.createObjectStore('SaveGameState', {keyPath: 1});
  //     var objectstore=  trans.objectStore('SaveGameState');
  //     var addreq = objectstore.add(state);
  //         addreq.onsuccess = function(e)  {console.log('Success!');console.dir(e)}
  //   }
  // };
  // // Create the schema
  // open.onupgradeneeded = function() {
  //     var db = open.result;
  //     var store = db.createObjectStore("SaveGameState", {keyPath: 1});
  // };
  //
  // open.onsuccess = function() {
  //   console.log("baza otwarta");
  //     // Start a new transaction
  //     var db = open.result;
  //     var tx = db.transaction("SaveGameState", "readwrite");
  //     var store = tx.objectStore("SaveGameState");
  //
  //     // Add some data
  //     store.put({state});
  //
  //     var saveGame = store.get(1);
  //     console.log(saveGame);
  //
  //     // Close the db when the transaction is done
  //     tx.oncomplete = function() {
  //         db.close();
  //     };
  // }

    ReactDOM.render(
      <App />,
      document.getElementById('app')
    );
});
