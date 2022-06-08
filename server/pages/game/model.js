import config from '../../config.js';

/**
 * @param {object} settings
 * @param {GameModel} settings.game
 * @param {PlayerModel["id"]} settings.playerId
 */
export const getData = ({ game, playerId }) => {
	const player = game.players.find((player) => player.id === playerId);

	if (!player) {
		throw new Error('Couldn’t find player');
	}

	/**
	 * @type GameUiViewModel
	 */
	const data = {
		game,
		player,
		text: {
			title: config.APP_FRIENDLY_NAME
		}
	};

	return data;
};
