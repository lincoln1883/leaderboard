import './style.css';
import addScore from './modules/addScore.js';
import getScore from './modules/getScore.js';
import renderScores from './modules/renderScores.js';

const form = document.querySelector('form');
const nameInput = document.querySelector('#name-input');
const scoreInput = document.querySelector('#score-input');
const refreshBtn = document.querySelector('#refresh-btn');

const displayMessage = (message, isSuccess) => {
  const messageBox = document.querySelector('.message');
  messageBox.innerHTML = message;
  if (isSuccess) {
    messageBox.classList.add('success');
    messageBox.classList.remove('error');
  } else {
    messageBox.classList.add('error');
    messageBox.classList.remove('success');
  }

  setTimeout(() => {
    messageBox.innerHTML = '';
  }, 3000);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const user = nameInput.value;
  const score = scoreInput.value;
  const results = await addScore(user, score);
  if (results && results.result === 'Leaderboard score created correctly.') {
    const scoreItem = await getScore();
    renderScores(scoreItem);
    displayMessage(results.result, true);
  } else {
    displayMessage(results.error, false);
  }
  scoreInput.value = '';
  nameInput.value = '';
};

const handleRefresh = async () => {
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';
  const scores = await getScore();
  renderScores(scores);
};

form.addEventListener('submit', handleSubmit);
refreshBtn.addEventListener('click', handleRefresh);

window.addEventListener('DOMContentLoaded', handleRefresh);
