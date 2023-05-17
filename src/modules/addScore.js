import url from './api.js';

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

export default addScore;
