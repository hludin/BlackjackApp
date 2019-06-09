//global variables
const deck = [];


//---------------------------------Heather--------------------------------------------\\

function createDeck(num) { // creates a deck and returns the deck in an array
  let singleDeck = [1, 1, 1, 1, 18, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11];
  if (!num || num === 1) {
    deck.push(...singleDeck);
  }
}

function shuffleCards(arr) {
  let lastIndex = deck.length - 1;
  let card = Math.floor(Math.random() * lastIndex);
  return card;
}
/*----------Heather's Tests------------*/
//console.log(deck);
console.log(`${deck}, and total cards: ${deck.length}`);

let card = shuffleCards(deck);
console.log(deck[card]);





/* ------------------Kiro------------------------*/
function CreatePlayer(name, hand, handsum) {
  this.name = name;
  this.hand = [];
  this.handSum = 0;
}

function startGame() { //gets a deck, players, and cards

};

//--------------Randy-----------------\\
//takes a card from deck array and pushes it into player.hand
Player.prototype.hit = function () {
  const card = deck.shift();
  this.hand.push(card);
  this.handSum = this.hand.reduce((sum, curCard) => sum + curCard);
};

// do nothing (nothing is changed) go to next player/dealer
// dealer plays
function stand() {
  return;
};

//same as actionHit
Player.prototype.doubleDown = function (callback) {
  let hasDoubled = false;
  let doubledCard;

  return () => {
    if (!hasDoubled) {
      doubledCard = callback();
      hasDoubled = true;
    }

    return doubledCard;
  }
};

function split() { //takes two elements of array and puts them in seperate array, and call actionHit on each array

};

//------------Program that prompts user to decide what to do--------------
// comment out for testing with editor //

function action(dealer, player1) { //will ask the user what to do
  let playing = true;
  while (playing) {

    let userAction = prompt(
      `dealer hand is ${dealer.hand} with a total of ${dealer.handSum}
      your hand is ${player1.hand} with a total of ${player1.handSum}
      would you like to : hit, doubledown, split, or stand?`
    );
    let text;
    switch (userAction) {
      case "hit":
        text = `player1 chose to hit`;
        player1.hit();
        break;
      case "stand":
        playing = false;
        //stand();
        break;
      case "split":
        //stand();
        break;
      case "doubledown":
        playing = false
      //doubleDown();
    }
    if (player1.handSum === 21) {
      alert('Blackjack!')
      playing = false;
    }
    if (player1.handSum > 21) {
      alert('You have busted')
      playing = false;
    }

  }

}

function deal(dealer, player1) {
  let userPlayers = prompt('Ready to start the game? [yes] or [no]');
  console.log('you picked ' + userPlayers);
  let text;

  switch (userPlayers.toLowerCase()) {
    case "yes":
      dealer.hit();
      player1.hit();
      dealer.hit();
      player1.hit();
      action(dealer, player1);
      break;

    case "no":
      alert(`YOU HAVE A VIRUS`)
      break;

    default:
      alert(`DUDE, pick YES or NO!!!`)
  }
}

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
createDeck();
const dealer = new Player('Dealer');
const player1 = new Player('Jimmy');
deal(dealer, player1);
console.log(dealer);
console.log(player1);
//stop here------------------------



console.log(deck.length);