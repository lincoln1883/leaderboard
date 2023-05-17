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
