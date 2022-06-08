import { create as createGame } from '../services/game.js';

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 */
export const controller = async (req, res) => {
	const playerChoice = req.body.choice;

	if (typeof playerChoice !== 'string' || !['O', 'X'].includes(playerChoice)) {
		throw new Error(
			`Received an invalid player choice. Expected O or X but got ${playerChoice}`
		);
	}

	const { id, players } = await createGame();
	const playerChoiceId = playerChoice === 'O' ? players[0].id : players[1].id;

	res.redirect(
		`/games/${id}/choose?players=${players[0].id},${players[1].id}&choice=${playerChoiceId}`
	);
};
