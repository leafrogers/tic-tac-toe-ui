import { HttpError } from '../../helpers.js';
import { read as readGame } from '../../services/game.js';
import { getData } from './model.js';
import view from './view.js';

/**
 * @param {object} data
 * @param {any} data.autoRefreshQuery
 * @param {GameModel} data.game
 * @param {PlayerModel} data.player
 */
const getAppSettings = ({ autoRefreshQuery, game, player }) => {
	const preferenceAutoRefresh = autoRefreshQuery === 'true';
	const shouldAutoRefresh =
		preferenceAutoRefresh && !game.hasEnded && !player.isTurn;

	return {
		preferenceAutoRefresh,
		shouldAutoRefresh
	};
};

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @param {NextFunction} next
 */
const controller = async (req, res, next) => {
	const { gameId } = req.params;
	const { autoRefresh: autoRefreshQuery, player: playerId } = req.query;

	if (typeof playerId !== 'string' || playerId.length !== 5) {
		throw new HttpError(
			400,
			'Expected a valid player query string but didn’t find one.<br><br>Did you go to this address manually? Try going back and following the links, or starting again at the <a href="/">first page</a>. That <i>should</i> fix it for you, fingers crossed.'
		);
	}

	const game = await readGame({ gameId, playerId });

	if (!game) {
		// Pass through to notFound controller
		return next();
	}

	const data = getData({ cspNonce: res.locals.cspNonce, game, playerId });
	const appSettings = getAppSettings({
		autoRefreshQuery,
		game,
		player: data.player
	});
	const html = view(data, appSettings);

	res.send(html);
};

export default controller;
