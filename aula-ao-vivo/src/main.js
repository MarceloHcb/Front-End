import './style.css';

//BUSCA O BOTÃO DE INICIAR UM NOVO JOGO
const shuffleButton = document.querySelector('.shuffle');
//BUSCA O BOTÃO DE PEDIR UMA NOVA CARTA
const drawButton = document.querySelector('.draw');
//BUSCA O BOTÃO DE PARAR O JOGO
const stopButton = document.querySelector('.stop');

//FICA OUVINDO O CLICK DO BOTÃO E CHAMA A FUNÇÃO PARA INICIAR O JOGO QUANDO CLICADO
shuffleButton.addEventListener('click', startNewGame);
//FICA OUVINDO O CLICK DO BOTÃO E CHAMA A FUNÇÃO PARA DAR UMA CARTA QUANDO CLICADO
drawButton.addEventListener('click', drawCard);
//FICA OUVINDO O CLICK DO BOTÃO E CHAMA A FUNÇÃO PARA PARAR O JOGO QUANDO CLICADO
stopButton.addEventListener('click', stopGame);

//VARIAVEL PARA ARMAZENAR O ID DO BARALHO
let deckId;

//VARIAVEL PARA ARMAZENAR O SCORE DOS 2 JOGADORES
let playersScore = {
    1: 0,
    2: 0,
  };

//FUNÇÃO PARA CRIAR UM NOVO JOGO
function startNewGame() {
  //FAZ UMA REQUISIÇÃO PARA API E A API RETORNA UM NOVO BARALHO SEM ESTAR EMBARALHADO
  fetch('https://deckofcardsapi.com/api/deck/new')
  //PEGA A RESPOSTA NO FORMATO JSON
    .then(response => response.json())
  //PASSA O ID DO BARALHO RECEBIDO ANTERIORMENTE E MANDA A REQUISIÇÃO PARA A API PARA EMBARALHAR
    .then(data => fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/shuffle`))
    //PEGA A RESPOSTA NO FORMATO JSON
    .then(response => response.json())
    //SALVA O ID DO BARALHO, DESABILITA O BOTÃO DE NOVO JOGO E HABILITA OS BOTÕES DE PEDIR CARTA E PARAR JOGO
    .then(data => {
        deckId = data.deck_id;
        shuffleButton.disabled = true;
        drawButton.disabled = false;
        stopButton.disabled = false;
      });
}
//FUNÇÃO PARA ADICIONAR CARTA AO RESPECTIVO JOGADOR
//RECEBE COMO PARAMETROS, OS DADOS DA CARTA E O ID DO JOGADOR
function addCardToPlayer(card, playerNumber) {
  //CRIAR UM ELEMENTO HTML DO TIPO IMAGEM
    const img = document.createElement('img');
    //PEGA A URL QUE CONTEM A IMAGEM DA CARTA E ATRIBUI AO SRC
    img.src = card.image;
    //PEGA O VALOR DA CARTA E O TIPO DELA E ATRIBUI AO ALT
    img.alt = `${card.value} of ${card.suit}`;
    //ADICIONA O IMG NA CLASSE CARD
    img.classList.add('card');
    //PEGA O ELEMENTO HTML DE CARDS E ADICIONA O IMG DENTRO DELE
    document.querySelector(`.player-${playerNumber}.cards`).appendChild(img);

    //VERIFICA SE A CARTA É 11, 12 OU 13 E DÁ O VALOR DE 10
    if (card.value === 'JACK' || card.value === 'QUEEN' || card.value === 'KING') {
      playersScore[playerNumber] += 10;
      //VERIFICA SE A CARTA É ÀS E DÁ O VALOR DE 1
    } else if (card.value === 'ACE') {
      playersScore[playerNumber] += 1;
      //ATRIBUIU O VALOR NORMAL DA CARTA
    } else {
      playersScore[playerNumber] += Number(card.value);
    }
    //NO ELEMENTO HTML DO SCORE, ADICIONA O VALOR ATUAL DA PONTUAÇÃO
    document.querySelector(`.player-${playerNumber}.score`).textContent = playersScore[playerNumber];
  }

//FUNÇÃO QUE PEGA UMA CARTA DO BARALHO E DÁ PARA O JOGADOR
function drawCard() {
  //RETIRA UMA CARTA DO BARALHO QUE RECEBEMOS
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw`)
    //PEGA A RESPOSTA NO FORMATO JSON
    .then(response => response.json())
    //COMO SEMPRE TIRAMOS UMA CARTA, ELE RETORNA UM ARRAY DE CARTAS QUE CONTÉM UM CARTA AO TOTAL
    //PEGAMOS NA PRIMEIRA POSIÇÃO DO ARRAY AS CARTAS
    //E CHAMAMOS A FUNÇÃO PASSANDO OS DADOS DA CARTA E O NÚMERO DO JOGADOR SENDO IGUAL A 1
    .then(data => {
      const card = data.cards[0];
      addCardToPlayer(card, 1);
    });
  }
  //FUNÇÃO PARA FINALIZAR O JOGO
  function stopGame() {
    console.log('stop');
  }