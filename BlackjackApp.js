//global variables
const shuffledDeck = [];
const deckCount = 1;


/* -------------------------------Heather------------------------------------ */
// createDeck generates a sorted array of numbers simulating cards, randomizes the deck to simulate shuffling and returns the array back to the shuffled deck variable
const createDeck = function () {
  let unshuffledDeck = [];
  //this creates a sorted array of numbers in a deck
  for (let i = 2; i <= 11; i++) {
    if (i === 10) {
      //time complexity sake, we inserted 16 10's
      unshuffledDeck.push(i, i, i, i, i, i, i, i, i, i, i, i, i, i, i, i);
    } else {
      unshuffledDeck.push(i, i, i, i);
    }
  }
  while (shuffledDeck.length < 52 * deckCount) {
    let lastIndex = unshuffledDeck.length;
    let randomElem = Math.floor(Math.random() * lastIndex);
    shuffledDeck.push(unshuffledDeck[randomElem]);
    unshuffledDeck.splice(randomElem, 1);
  }
}
/* ------------------Kiro------------------------ */
function Player(name) {
  this.name = name;
  this.hands = [new Hand()]; // [9,9] -> [9] + [9]
}

function Hand(...num) { //these properties will be checked
  this.cards = [...num],
    this.handSum = 0,
    this.inPlay = true
}
//--------------Randy-----------------\\
//takes a card from deck array and pushes it into player.hand
Hand.prototype.hit = function () {
  this.cards.push(shuffledDeck.shift()); //take cared from top of deck
  this.handSum = this.cards.reduce((sum, curCard) => sum + curCard); //update total of hand

  if (this.handSum === 21 && this.cards.length === 2) { //check player status
    this.inPlay = false;
    alert(`${this.handSum}! BLACKJACK`);
  } else if (this.handSum === 21) {
    this.inPlay = false;
    alert(`${this.handSum}! YOU GOT 21`);
  } else if (this.handSum > 21) {
    if (this.cards.includes(11)) { //aces could be 11 or 1 -> 11; 24 <= [2,1,11]
      this.handSum = this.handSum - 10; // update handSum 
      let ind = this.cards.findIndex((el) => el === 11) //find where the ace is
      this.cards.splice(ind, 1, 1); //replaces 11 with 1      
    } else {
      this.inPlay = false;
      alert(`${this.handSum}! BUST`);
    }
  }
};
// do nothing (nothing is changed) go to next player/dealer
// dealer plays
// hand is no longer in play, go to next hand
Hand.prototype.stand = function () {
  this.inPlay = false;
};

// only draw one card

Hand.prototype.doubleDown = function () {
  this.inPlay = false;
  this.hit();
};

// splits two elements of array into two hand instances, and automatically hit on first hand
Player.prototype.split = function () {
  if (this.hands[0].cards[0] === this.hands[0].cards[1]) {
    let firstInPlay = this.hands.findIndex(firstInPlay => firstInPlay.inPlay);

    this.hands
      .splice(firstInPlay, 1,
        new Hand(this.hands[firstInPlay].cards[0]),
        new Hand(this.hands[firstInPlay].cards[1]));

    this.hands[firstInPlay].hit();
    this.hands[firstInPlay + 1].hit();
  } else {
    alert(`You can only split on pairs`)
  }
};

//same as actionHit
/*
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
*/

function split() { //takes two elements of array and puts them in seperate array, and call actionHit on each array

};

//------------Program that prompts user to decide what to do--------------
//-----------------------------Jimmy-----------------------------------------------\\
function deal(dealer, player1) {
  let userPlayers = prompt('Ready to start the game? Yes or no?');

  switch (userPlayers.toLowerCase()) {
    case "yes":
      dealer.hands[0].hit();
      player1.hands[0].hit();
      //dealer.hands[0].hit();
      player1.hands[0].hit();
      action(dealer, player1);
      break;

    case "no":
      alert(`HERE'S A VIRUS`)
      break;

    default:
      alert(`Pick YES or NO!!!`)
  }
}


// will ask the user what to do
function action(dealer, player1) {
  let dealerHand = dealer.hands[0];
  let userPlaying = true;
  while (userPlaying) { //if valid hands that can play exist, this loop continues
    let firstInPlayAll;
    function findFirstInPlayAll() {
      player1.hands.forEach(hand => {
        firstInPlayAll = player1.hands.find(hand => hand.inPlay);
      });
    }

    findFirstInPlayAll();
    userPlaying = (firstInPlayAll);

    // loop through hands for cards and handSum for player1, and prompt action
    let userAction = prompt(
      `YOUR TURN

      Dealer's hand is ${dealerHand.cards} with a sum of ${dealerHand.handSum}

      Your hand is ${firstInPlayAll.cards} with a sum of ${firstInPlayAll.handSum}
      Would you like to: hit, doubledown, split, or stand?`
    );

    switch (userAction) {
      case "hit":
        firstInPlayAll.hit();
        break;
      case "stand":
        firstInPlayAll.stand();
        break;
      case "split":
        player1.split();
        break;
      case "doubledown":
        firstInPlayAll.doubleDown();
        break;
    }

    findFirstInPlayAll();
    userPlaying = (firstInPlayAll);
  }

  // collect player's valid hands
  const handsValid = player1.hands.filter(hand => hand.handSum < 21);
  const handsValidCount = handsValid.length;
  const handsPresent = handsValid.map(hand => [`Your hand is ${hand.cards} with a sum of ${hand.handSum}`]);

  // dealer's control flow, keep hitting until > 17
  if (handsValidCount) {
    while (dealerHand.handSum < 17) {

      alert(
        `DEALER'S TURN

        Dealer's hand is ${dealerHand.cards} with a sum of ${dealerHand.handSum}

        ${handsPresent.join('\n')}`
      );

      dealerHand.hit();

      if (dealerHand.handSum === 21) {
        alert(
          `DEALER GOT 21

          Dealer's hand is ${dealerHand.cards} with a sum of ${dealerHand.handSum}

          ${handsPresent.join('\n')}`
        );
      } else if (dealerHand.handSum > 21) {
        alert(
          `DEALER BUSTED

          Dealer's hand is ${dealerHand.cards} with a sum of ${dealerHand.handSum}

          ${handsPresent.join('\n')}`
        );
      }
    }

    // present summary of statistics
    let gamesPushedCount = handsValid
      .filter(hand => hand.handSum === dealerHand.handSum).length;
    let gamesWonCount = handsValid
      .filter(hand => hand.handSum > dealerHand.handSum || dealerHand.handSum > 21).length;

    alert(
      `GAME SUMMARY

      Dealer's hand is ${dealerHand.cards} with a sum of ${dealerHand.handSum}

      ${handsPresent.join('\n')}

      Out of ${handsValidCount} hand(s), you pushed ${gamesPushedCount}, and won ${gamesWonCount}.
      Thanks for playing!`
    );
  }
}

//------------------------------------Testing-----------------------------------------\\

createDeck();
const dealer = new Player('Dealer');
const player1 = new Player('Ryan');
deal(dealer, player1);

/*--------------------------Future Work-------------------------
add suits to deck
set up tests to rig the game
card counting
add betting
add players
Create the suggestions (basic strategy)
add login, save player data, and display history
add front-end ui
add surrender
---------------------------------------------------*/

  let playing = true;
  while (playing) {

    let userAction = prompt(
      `dealer hand is ${dealer.hand} with a total of ${dealer.handSum}
      your hand is ${player1.hand} with a total of ${player1.handSum}
      would you like to : hit, doubledown, split, or stand?`
    );
    switch (userAction) {
      case "hit":
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

function deal (dealer, player1) {
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
      alert(`YOU HAVE A VIRUS`);
      break;

    default:
      alert(`DUDE, pick YES or NO!!!`);
  }
}

//----------------------------Testing------------------------------\\


createDeck();
const player1 = new CreatePlayer('Jimmy');
CreatePlayer.prototype.hit = function () {
  const card = deck.shift();
  this.hand.push(card);
  // this.handSum.reduce((sum, curCard) => sum + curCard);
};
console.log(player1);
console.log(deck.length);

createDeck();
const dealer = new Player('Dealer');
const player1 = new Player('Jimmy');
deal(dealer, player1);
console.log(dealer);
console.log(player1);




console.log(deck.length);
