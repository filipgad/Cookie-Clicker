import React from 'react';

import Cookie from './Cookie.jsx';
import Store from './Store.jsx';
import ScoreBoard from './ScoreBoard.jsx';

class Manufacturer {
  constructor(name, quantity, productionPerSec, cost, multiply) {
    this.name = name;
    this.quantity = quantity;
    this.productionPerSec = productionPerSec;
    this.cost = cost;
    this.multiply = multiply;
  }
}

let cursor = new Manufacturer("Cursor", 0, 1, 5, 1.15);
let grandma = new Manufacturer("Grandma", 0, 2, 50, 1.25);
let farm = new Manufacturer("Farm", 0, 8, 1100, 1.5);
let bakery = new Manufacturer("Bakery", 0, 47, 12000, 1.75);
let mine = new Manufacturer("Mine", 0, 260, 130000, 2);

const producers = [cursor, grandma, farm, bakery, mine];
console.log(producers);

const gameScore = {
  numberOfCookies: 0, // stores the current number of cookies
  producePerSec: 0, // stores the number of produced cookies per second
  cookiesMade: 0 // stores the number of cookies produced
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.loadGame() == null ? gameScore : this.loadGame();
  }

  componentDidUpdate() {
    // after every update save new state value
    this.saveGame(this.state);
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

  // localStorage save
  saveGame = (state) => {
      localStorage.setItem('cookieClickerData', JSON.stringify(state));
  }

  // localStorage load
  loadGame = () => {
      return JSON.parse(localStorage.getItem('cookieClickerData'));
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

  // NEW GAME BUTTON ACTION
  clickNewGame = () => {
    this.state = gameScore;
  }

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


// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

// Open (or create) the database
var open = indexedDB.open("CookieClickerData", 1);

// Create the schema
open.onupgradeneeded = function() {
    var db = open.result;
    var storeProducer = db.createObjectStore("producerData", {keyPath: "name"});
};

open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    var tx = db.transaction("producerData", "readwrite");
    var store = tx.objectStore("producerData");

    // Add some data
    producers.forEach(producer => { return store.put(producer)});


    var getBakery = store.get("Bakery");
    getBakery.onsuccess = function() {
      console.log(getBakery.result);
    }

    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
}

export default Game;
