import { gameScore, producers } from './initial_game_data.js';

// // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

let db;
// Open database
const open = indexedDB.open("CookieClickerData", 1);

open.onerror = (event) => {
  alert("Database error: " + event.target.errorCode);
}

open.onsuccess = (event) => {
  db = event.target.result;
}

open.onupgradeneeded = (event) => {
  //The IDBDatabase interface
  const db = event.target.result;

  // Create an objectStore for this database
  const objectStore = db.createObjectStore("cookieGameData", { keyPath: "name" });

  objectStore.transaction.oncomplete = (event) => {
    const tx = db.transaction("cookieGameData", "readwrite");
    const store = tx.objectStore("cookieGameData");

    // Add game data
    producers.forEach(producer => { return store.put(producer)});
    store.put(gameScore);
  }
}

// GAME SCORE UPDATE IN DATABASE
export const updateGameScoreData = (name, [numberOfCookies, producePerSec]) => {
  const tx = db.transaction("cookieGameData", "readwrite");
  const store = tx.objectStore("cookieGameData");

  const gameScoreData = store.get(name);

  gameScoreData.onsuccess = (event) => {
    const data = event.target.result;
    data.numberOfCookies = numberOfCookies;
    data.producePerSec = producePerSec;

    const updateScore = store.put(data);
  }
}

// PRODUCER UPDATE IN DATABASE
export const updateProducerData = (name, [production, cost, quantity]) => {
  const tx = db.transaction("cookieGameData", "readwrite");
  const store = tx.objectStore("cookieGameData");

  const producerData = store.get(name);

  producerData.onsuccess = (event) => {
    const data = event.target.result;
    data.productionPerSec = production;
    data.cost = cost;
    data.quantity = quantity;

    const updateProducer = store.put(data);
  }
}
