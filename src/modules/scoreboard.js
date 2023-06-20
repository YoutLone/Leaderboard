const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

export const createNewGames = (name, score) => {
  const playerDisplay = document.createElement('span');
  playerDisplay.classList.add('player-display');
  playerDisplay.textContent = name;

  const scoreDisplay = document.createElement('span');
  scoreDisplay.classList.add('score-display');
  scoreDisplay.textContent = score;

  const li = document.createElement('li');
  li.appendChild(playerDisplay);
  li.appendChild(scoreDisplay);

  return li;
};

export const getGameScores = async (gameId) => {
  try {
    const response = await fetch(`${apiUrl}games/${gameId}/scores/`);
    if (!response.ok) {
      throw new Error('Failed to fetch game scores');
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw new Error(`Failed to fetch game scores: ${error.message}`);
  }
};

export const saveGameScore = async (gameId, name, score) => {
  try {
    const response = await fetch(`${apiUrl}games/${gameId}/scores/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: name, score }),
    });
    if (!response.ok) {
      throw new Error('Failed to save game score');
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw new Error(`Failed to save game score: ${error.message}`);
  }
};
