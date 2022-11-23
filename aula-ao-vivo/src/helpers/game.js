import { getNewDeck, shuffleDeck, drawNewCard } from './api';

let deckId;
let playersScore = {
  1: 0,
  2: 0,
};

const shuffleButton = document.querySelector('.shuffle');
const drawButton = document.querySelector('.draw');
const stopButton = document.querySelector('.stop');

export async function startNewGame() {
  restartGame();
  const response = await getNewDeck();
  console.log(response);
  const data = await shuffleDeck(response.deck_id);

  console.log(data);
  deckId = data.deck_id;
  drawButton.disabled = false;
  stopButton.disabled = false;
  shuffleButton.disabled = true;
}

export async function drawCard() {
  const card = await drawNewCard(deckId);
  addCardToPlayer(card, 1);

  if (playersScore[1] >= 21) {
    stopGame();
  }
  await dealerTurn();
}

async function  addCardToPlayer(card, playerNumber) {
  const img = document.createElement('img');
  img.src = card.image;
  img.alt = `${card.value} of ${card.suit}`;
  img.classList.add('card');
  document.querySelector(`.player-${playerNumber}.cards`).appendChild(img);

  if (card.value === 'JACK' || card.value === 'QUEEN' || card.value === 'KING') {
    playersScore[playerNumber] += 10;
  } else if (card.value === 'ACE') {
    playersScore[playerNumber] += 1;
  } else {
    playersScore[playerNumber] += Number(card.value);
  }
 
  const playerScore = document.querySelector(`.player-${playerNumber}.score`);
  playerScore.textContent = playersScore[playerNumber];
}

export async function stopGame() {
  console.log('stop');
  drawButton.disabled = true;
  stopButton.disabled = true;
  shuffleButton.disabled = false;

  if (playersScore[1] > 21) {
    return showResult('lose');
  }

  
  
  if (playersScore[1] > playersScore[2] || playersScore[2] > 21) {
    showResult('win');
  } else {
    showResult('lose');
  }
}

function showResult(result) { // win (ganhei) or lose (perdi)
  const resultElement = document.querySelector('.result');
  resultElement.src = result === 'win' ? './src/imgs/win.png' : './src/imgs/lose.png';

  resultElement.classList.remove('hidden');
}


async function dealerTurn() {
  // Eu vou forçar o oponente a SEMPRE comprar 3 cartas...
  // const promises = [drawNewCard(deckId), drawNewCard(deckId), drawNewCard(deckId)];
  // const promises =[drawNewCard(deckId)]
  // console.log(promises);

  // const results = await Promise.all(promises);
  // console.log(results);

  const card = await drawNewCard(deckId);
  addCardToPlayer(card, 2);

  if (playersScore[2] >= 21) {
    stopGame();
  }

}

function restartGame() {
  playersScore = {
    1: 0,
    2: 0,
  };
  document.querySelector('.player-1.score').textContent = 0;
  document.querySelector('.player-2.score').textContent = 0;
  document.querySelector('.player-1.cards').textContent = '';
  document.querySelector('.player-2.cards').textContent = '';
  document.querySelector('.result').classList.add('hidden');
}
