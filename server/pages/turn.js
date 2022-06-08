import { HttpError } from '../helpers.js';
import { sendTurn } from '../services/game.js';

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 */
export const controller = async (req, res) => {
	const { gameId } = req.params;
	const { player: playerId } = req.query;
	const preferenceAutoRefresh = req.query.autoRefresh === 'true';
	const cellToClaim = Number(req.body.cell);

	if (typeof playerId !== 'string') {
		throw new HttpError(400, 'Expected a player query string');
	}

	await sendTurn({ gameId, playerId, cellToClaim });

	res.redirect(
		`/games/${gameId}?player=${playerId}${
			preferenceAutoRefresh ? '&autoRefresh=true' : ''
		}`
	);
};
