import { gameScore, producers } from './initial_game_data.js';

// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

var db;
// Open database
var open = window.indexedDB.open("CookieClickerData", 1);

open.onerror = (event) => {
  alert("Database error: " + event.target.errorCode);
}

open.onsuccess = (event) => {
  db = event.target.result;
};


open.onupgradeneeded = (event) => {
  //The IDBDatabase interface
  var db = event.target.result;

  // Create an objectStore for this database
  var objectStore = db.createObjectStore("cookieGameData", { keyPath: "name" });

  objectStore.transaction.oncomplete = (event) => {
    var tx = db.transaction("cookieGameData", "readwrite");
    var store = tx.objectStore("cookieGameData");

    // Add game data
    producers.forEach(producer => { return store.put(producer)});
    store.put(gameScore);
  };
};

// GAME SCORE UPDATE IN DATABASE
export const updateGameScoreData = (name, [numberOfCookies, producePerSec]) => {
  var tx = db.transaction("cookieGameData", "readwrite");
  var store = tx.objectStore("cookieGameData");

  var gameScoreData = store.get(name);

  gameScoreData.onsuccess = (event) => {
    var data = event.target.result;
    data.numberOfCookies = numberOfCookies;
    data.producePerSec = producePerSec;

    var updateScore = store.put(data);
  }
}

// export const getGameScoreData = (name) => {
//   var tx = db.transaction("cookieGameData");
//   var store = tx.objectStore("cookieGameData");
//
//   var gameScoreData = store.get(name);
//
//   gameScoreData.onsuccess = () => {
//     return gameScoreData.result;
//   }
// }

// PRODUCER UPDATE IN DATABASE
export const updateProducerData = (name, [production, cost, quantity]) => {
  var tx = db.transaction("cookieGameData", "readwrite");
  var store = tx.objectStore("cookieGameData");

  var producerData = store.get(name);

  producerData.onsuccess = (event) => {
    var data = event.target.result;
    data.productionPerSec = production;
    data.cost = cost;
    data.quantity = quantity;

    var updateData = store.put(data);
  }
}

// export const getProducerData = (name) => {
//   var tx = db.transaction("cookieGameData", "readwrite");
//   var store = tx.objectStore("cookieGameData");
//
//   var producerData = store.get(name);
//
//   return producerData;
// }
