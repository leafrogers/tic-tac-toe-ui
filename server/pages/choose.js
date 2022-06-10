import config from '../config.js';
import { read as readGame } from '../services/game.js';
import { stripSpace, toHtmlDocString } from '../helpers.js';

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @param {NextFunction} next
 */
export const controller = async (req, res, next) => {
	const { gameId } = req.params;
	const { choice, players: playerIds } = req.query;

	if (typeof playerIds !== 'string') {
		throw new Error(
			'Expected players query string to be a comma separated string of player IDs'
		);
	}

	const playerIdsArray = playerIds.split(',').filter(Boolean);

	const game = await readGame({ gameId });

	if (!game) {
		// Pass through to notFound handler
		return next();
	}

	if (!playerIdsArray.length) {
		throw new Error('Missing player data');
	}

	const data = {
		baseUrl: config.BASE_URL,
		text: {
			title: config.APP_FRIENDLY_NAME
		},
		players: game.players.map(({ name }, index) => ({
			isChosen: playerIdsArray[index] === choice,
			name,
			url: `/games/${gameId}?player=${playerIdsArray[index]}`
		}))
	};

	res.send(view(data));
};

const styles = `
	ol {
		list-style: none;
		padding: 0;
	}

	.share__cta,
	.share__result {
		margin-top: 0;
	}
`;

/**
 * @param {CreatedPlayerModel} a
 * @param {CreatedPlayerModel} b
 */
const putChosenPlayerLast = (a, b) => {
	if (a.isChosen > b.isChosen) {
		return 1;
	}

	if (a.isChosen < b.isChosen) {
		return -1;
	}

	return 0;
};

/**
 * @param {ViewModel} settings
 */
const view = ({ baseUrl, text, players }) => {
	const body = `
		<h1>${text.title}</h1>
		<p>Almost there. Who do you want to play the game with?</p>
		<ol>
			${players
				.sort(putChosenPlayerLast)
				.map(({ isChosen, url }) =>
					`
			<li>
				${stripSpace(
					isChosen
						? `
						Now you can <a href="${baseUrl}${url}">start playing…</a>
						`
						: `
						<div class="share">
							<p class="share__message">
								Share the <a href="${baseUrl}${url}" class="share__link">other player’s link</a> with them.</p>
						</div>
						`
				)}
			</li>
					`.trim()
				)
				.join('')}
		</ul>
	`;

	return toHtmlDocString({ body, styles, title: text.title });
};

/**
 * @typedef {{isChosen: boolean, name: PlayerModel["name"], url: string }} CreatedPlayerModel
 * @typedef {BaseUiViewModel & { baseUrl: string, players: CreatedPlayerModel[]}} ViewModel
 */
