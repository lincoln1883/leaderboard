const renderScores = (scoreItem) => {
	const scoresTable = document.querySelector('table');
	const tableBody = document.querySelector('tbody');

	tableBody.innerHTML = '';
	scoreItem.forEach((score) => {
		const tableRow = document.createElement('tr');

		const nameItem = document.createElement('td');
		nameItem.classList.add('player-name');
		nameItem.innerText = `${score.user}:`;
		tableRow.appendChild(nameItem);

		const scoreItem = document.createElement('td');
		scoreItem.classList.add('player-score');
		scoreItem.innerText = `${score.score}`;
		tableRow.appendChild(scoreItem);

		tableBody.appendChild(tableRow);
		scoresTable.appendChild(tableBody);
	});
};

export default renderScores;
