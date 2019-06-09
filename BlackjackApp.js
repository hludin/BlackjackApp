const deck = function createDeck(num) { // creates a deck and returns the deck in an array
  const deck = [];
  let singleDeck = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11];
  if (!num || num === 1) {
    return deck.push(...singleDeck);
  }
}

function shuffleCards(arr) {
  let lastIndex = deck.length - 1;
  let card = Math.floor(Math.random() * lastIndex);

  return card;
}
/* ------------------Kiro------------------------*/
function CreatePlayer(name, hand, handsum) {
  this.name = name;
  this.hand = [];
  this.handSum = 0;
}

function startGame() { //gets a deck, players, and cards

};


//--------------Randy-----------------\\
function hit() { //takes a card from deck array and pushes it into player.hand
  const card = deck.shift();
  this.hand.push(card);
  this.handSum.reduce((sum, curCard) => sum + curCard);
};

function stand() { //do nothing (nothing is changed) go to next player/dealer
  return;
};

function doubleDown() { //same as actionHit
  const card = deck.shift();
  this.hand.push(card);
  this.handSum.reduce((sum, curCard) => sum + curCard);
};

function split() { //takes two elements of array and puts them in seperate array, and call actionHit on each array

};




//------------Program that prompts user to decide what to do--------------
/* comment out for testing with editor
let userPlayers = prompt('Ready to start the game? [yes] or [no]');
console.log('you picked ' + userPlayers);
let userAction = prompt('would you like to : hit, doubledown, split, or stand?');

var text;
switch (userAction) {
  case "hit":
    text = `player1 chose to hit`;
    player1.hit();

    break;
  case "stand":
    text = 'player1 chose to stand';
    //stand();
    break;
  case "split":
    text = 'player1 chose to split';
    //stand();
    break;
  case "doubledown":
    text = 'player1 chose to doubledown';
  //doubleDown();
}
*/

//----------------------------Testing------------------------------\\

/*
createDeck();
const player1 = new CreatePlayer('Jimmy');
CreatePlayer.prototype.hit = function () {
  const card = deck.shift();
  this.hand.push(card);
  // this.handSum.reduce((sum, curCard) => sum + curCard);
};
console.log(player1);
console.log(deck.length);
*/
console.log(deck());
// console.log(`${deck}, and total cards: ${deck.length}`);

let card = shuffleCards(deck);
console.log(deck[card]);
