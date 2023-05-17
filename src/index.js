import './style.css';

const gameId = 'nGpef0aTmTCtEQkpnp6w';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;

const form = document.querySelector('form');
const nameInput = document.querySelector('#name-input');
const scoreInput = document.querySelector('#score-input');
const refreshBtn = document.querySelector('#refresh-btn');

const getScore = async () => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data.result;
	} catch (error) {
		return error.message || 'Something went wrong';
	}
};

const addScore = async (user, score) => {
	const scoreItem = {
		user,
		score,
	};
	try {
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(scoreItem),
			headers: {
				'Content-type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	} catch (error) {
		return error.message;
	}
};

const renderScores = (scoreItem) => {
	const scoresTable = document.querySelector('table');
	const tableBody = document.querySelector('tbody');

	tableBody.innerHTML = '';
	scoreItem.forEach((score) => {
		const tableRow = document.createElement('tr');

		const nameItem = document.createElement('td');
		nameItem.classList.add('player-name');
		nameItem.innerText = `${score.user}`;
		tableRow.appendChild(nameItem);

		const scoreItem = document.createElement('td');
		scoreItem.classList.add('player-score');
		scoreItem.innerText = `${score.score}`;
		tableRow.appendChild(scoreItem);

		tableBody.appendChild(tableRow);
		scoresTable.appendChild(tableBody);
	});
};

const handleSubmit = async (e) => {
	e.preventDefault();
	const user = nameInput.value;
	const score = scoreInput.value;
	const results = await addScore(user, score);
	if (results && results.result === 'Leaderboard score created correctly.') {
		const scoreItem = await getScore();
		renderScores(scoreItem);
	}
	scoreInput.value = '';
	nameInput.value = '';
};

const handleRefresh = async () => {
	const scores = await getScore();
	renderScores(scores);
};

form.removeEventListener('submit', handleSubmit);
refreshBtn.removeEventListener('click', handleRefresh);

form.addEventListener('submit', handleSubmit);
refreshBtn.addEventListener('click', handleRefresh);

window.addEventListener('DOMContentLoaded', handleRefresh);
