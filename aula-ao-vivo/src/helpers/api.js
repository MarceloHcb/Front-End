function fetchAPI(endpoint) {
  return fetch(`https://deckofcardsapi.com/api/deck/${endpoint}`)
    .then((response) => response.json());
}

export function shuffleDeck(deckId) {
  return fetchAPI(`${deckId}/shuffle`);
}

// export function drawNewCard(deckId) {
//   return fetchAPI(`${deckId}/draw/`).then((data) => data.cards[0]);
// }

export async function drawNewCard(deckId) {
  const newCard = await fetchAPI(`${deckId}/draw`);
  console.log(newCard);
  return newCard.cards[0];
}

export function getNewDeck() {
  return fetchAPI('new');
}
