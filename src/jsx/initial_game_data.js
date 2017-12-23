class Manufacturer {
  constructor(name, quantity, productionPerSec, cost) {
    this.name = name;
    this.quantity = quantity;
    this.productionPerSec = productionPerSec;
    this.cost = cost;
  }
}

// PRODUCERS
let cursor = new Manufacturer("Cursor", 0, 0.1, 15);
let grandma = new Manufacturer("Grandma", 0, 1, 100);
let farm = new Manufacturer("Farm", 0, 8, 1100);
let bakery = new Manufacturer("Bakery", 0, 47, 12000);
let mine = new Manufacturer("Mine", 0, 260, 130000);

export const producers = [cursor, grandma, farm, bakery, mine];

// GAME SCORE
export const gameScore = {
  name: "CookieScore",
  numberOfCookies: 0, // stores the current number of cookies
  producePerSec: 0 // stores the number of produced cookies per second
}
