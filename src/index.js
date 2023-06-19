import './index.css';

const submit = document.querySelector('.submit');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const scoresList = document.getElementById('scores-board');

submit.addEventListener('click', (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const score = scoreInput.value;

  if (name && score) {
    // Create a new score item for the list
    const newScore = document.createElement('li');
    newScore.textContent = `${name}: ${score}`;

    // Add new score to the list
    scoresList.appendChild(newScore);

    // Clear the input fields
    nameInput.value = '';
    scoreInput.value = '';
  }
});
