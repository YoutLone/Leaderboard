import './index.css';
import {
  createNewGames,
  getGameScores,
  saveGameScore,
} from './modules/scoreboard.js';

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

let gameId;

const createGame = async () => {
  const response = await fetch(`${apiUrl}games/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'My Game' }),
  });
  const data = await response.json();
  return data;
};

const initializeGame = async () => {
  const storedGameId = localStorage.getItem('gameId');
  if (storedGameId) {
    gameId = storedGameId;
  } else {
    const createdGame = await createGame();
    gameId = createdGame.result;
    localStorage.setItem('gameId', gameId);
  }
};

const refreshScores = async () => {
  const scores = await getGameScores(gameId);
  const scoresList = document.getElementById('scores-board');
  scoresList.innerHTML = '';
  scores.forEach((score) => {
    const li = createNewGames(score.user, score.score);
    scoresList.appendChild(li);
  });
};

const submitScore = async () => {
  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');
  const name = nameInput.value;
  const score = scoreInput.value;
  await saveGameScore(gameId, name, score);
  nameInput.value = '';
  scoreInput.value = '';

  const scoresList = document.getElementById('scores-board');
  const li = createNewGames(name, score);
  scoresList.appendChild(li);
};

const refreshButton = document.querySelector('.refresh');
refreshButton.addEventListener('click', refreshScores);

const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  submitScore();
});

initializeGame();
