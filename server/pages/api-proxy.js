import { read as readGame, sendTurn } from '../services/game.js';

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @param {NextFunction} next
 */
export const read = async (req, res, next) => {
	const { gameId } = req.params;
	const playerId = req.get('Player-ID') || '';
	const game = await readGame({ gameId, playerId });
	const player = game?.players.find((player) => player.id === playerId);

	if (!game || !player) {
		// Pass through to notFound handler
		return next();
	}

	res.status(200).json({ game, player });
};

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 */
export const update = async (req, res) => {
	const { gameId } = req.params;
	const playerId = req.get('Player-ID') || '';
	const cellToClaim = Number(req.body.cell);
	const game = await sendTurn({ gameId, playerId, cellToClaim });

	res.status(201).json(game);
};
