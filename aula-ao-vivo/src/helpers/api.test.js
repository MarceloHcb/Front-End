import fetch from 'node-fetch'; // necessário para versões abaixo do Node 18;
import { getNewDeck, shuffleDeck, drawNewCard } from './api';

global.fetch = fetch; // necessário para versões abaixo do Node 18;

describe('getNewDeck', () => {
  it('Deve retornar um objeto com os dados da API', async () => {
    const data = await getNewDeck();
    expect(data).toHaveProperty('success');
    expect(data).toHaveProperty('deck_id');
    expect(data.shuffled).toBe(false);
  });
});

describe('shuffleDeck', () => {
  it('Deve retornar um objeto com os dados da API', async () => {
    const data = await getNewDeck();
    const response = await shuffleDeck(data.deck_id);

    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('deck_id');
    expect(response.shuffled).toBe(true);
  });
 
});

describe('drawNewCard', () => {
  it('Deve retornar uma carta aleatória da API', async () => {
    const data = await getNewDeck();
    const shuffledData = await shuffleDeck(data.deck_id);
    const card = await drawNewCard(shuffledData.deck_id);
    expect(card.code).toBeDefined();
    expect(card.image).toBeDefined();
    expect(card.images).toBeDefined();
    expect(card.value).toBeDefined();
    expect(card.suit).toBeDefined();
  });

  it('Deve retornar um erro caso o deck_id seja inválido', () => {
    const data = shuffleDeck('id_inválido');
    expect(data).rejects.toThrow();
  });
  it('Deve retornar um erro caso o deck_id seja inválido', () => {
    const data = drawNewCard('invalid-deck-id');
    expect(data).rejects.toThrow();
  });
});
