import { gameScore, producers } from './initial_game_data.js';

// // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
// var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

var db;
// Open database
var open = indexedDB.open("CookieClickerData", 1);

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
  console.log(gameScoreData);

  gameScoreData.onsuccess = (event) => {
    var data = event.target.result;
    data.numberOfCookies = numberOfCookies;
    data.producePerSec = producePerSec;

    var updateScore = store.put(data);
  }
}

// // GAME SCORE LOAD FROM DATABASE (problem with "this")
// export const loadGameScoreData = (name) => {
//   const open = indexedDB.open("CookieClickerData", 1);
//   open.onsuccess = (event) => {
//     const db = event.target.result;
//     const tx = db.transaction("cookieGameData");
//     const store = tx.objectStore("cookieGameData");
//     const request = store.get(gameScore.name);
//
//     request.onsuccess = (event) => {
//       this.setState(() => ({
//         numberOfCookies: event.target.result.numberOfCookies,
//         producePerSec: event.target.result.producePerSec
//       }));
//     };
//   };
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

// // PRODUCER LOAD FROM DATABASE (problem with "this")
// export const loadProducerData = (name) => {
//   const open = indexedDB.open("CookieClickerData", 1);
//   open.onsuccess = (event) => {
//     const db = event.target.result;
//     const tx = db.transaction("cookieGameData");
//     const store = tx.objectStore("cookieGameData");
//     const request = store.get(name);
//
//     request.onsuccess = (event) => {
//       this.setState(() => ({
//         production: event.target.result.productionPerSec,
//         cost: event.target.result.cost,
//         quantity: event.target.result.quantity,
//       }));
//     };
//   };
// }
