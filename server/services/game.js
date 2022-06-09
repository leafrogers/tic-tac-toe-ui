import fetch from 'node-fetch';
import config from '../config.js';
import { HttpError } from '../helpers.js';
const gamesBaseUrl = `${config.API_URL}/games`;
const headers = {
	'API-Key': config.API_KEY
};

// TODO: Remove the ts-ignore comments
// It doesn’t *seem* like it’s fixable with the JSDocs
// flavour of TypeScript. If anyone reads this and figures
// out otherwise, please do let me know!

export const create = async () => {
	const response = await fetch(gamesBaseUrl, {
		headers,
		method: 'POST'
	});

	const json = await response.json();

	// @ts-ignore
	return json.game;
};

/**
 * @param {object} settings
 * @param {GameModel["id"]} settings.gameId
 * @param {PlayerModel["id"]} [settings.playerId]
 * @returns {Promise<GameModel>}
 */
export const read = async ({ gameId, playerId }) => {
	const optionalHeaders = {};

	if (playerId) {
		optionalHeaders['Player-ID'] = playerId;
	}

	// @ts-ignore
	const { game } = await fetch(`${gamesBaseUrl}/${gameId}`, {
		headers: {
			...headers,
			...optionalHeaders
		}
	})
		.then((res) => res.json())
		.catch(() => ({ game: undefined }));

	return game;
};

/**
 * @param {object} settings
 * @param {GameModel["id"]} settings.gameId
 * @param {PlayerModel["id"]} settings.playerId
 * @param {number} settings.cellToClaim
 */
export const sendTurn = async ({ gameId, playerId, cellToClaim }) => {
	const response = await fetch(`${gamesBaseUrl}/${gameId}/turn`, {
		headers: {
			'Content-Type': 'application/json',
			...headers
		},
		body: JSON.stringify({ playerId, cellToClaim }),
		method: 'POST'
	});

	// @ts-ignore
	const { game, message, status } = await response.json();

	if (!response.ok) {
		throw new HttpError(status, `Error from API (${status}): ${message}`);
	}

	return game;
};
