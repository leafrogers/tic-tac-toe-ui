import CoreComponent from './core-component.js';

/**
 * @param {object} settings
 * @param {GameModel} settings.game
 * @param {PlayerModel} settings.player
 */
const getGameEndedMessage = ({ game, player }) => {
	const winner = game.players.find((player) => player.isWinner);

	let message = 'Game over! ';

	if (winner) {
		message += winner.id === player.id ? 'You won!' : 'You lost :(';
	} else {
		message += 'It was a draw.';
	}

	return message;
};

/**
 * @param {object} settings
 * @param {PlayerModel} settings.player
 */
const getTurnMessage = ({ player }) => {
	return player.isTurn
		? `It’s your turn. You’re <b>${player.name}</b>.`
		: `It’s their turn. You’re <b>${player.name}</b>.`;
};

export default class StatusMessage extends CoreComponent {
	render() {
		const { game, player } = this.props;
		const message = game.hasEnded
			? getGameEndedMessage({ game, player })
			: getTurnMessage({ player });

		return `<p role="status">${message}</p>`;
	}
}
