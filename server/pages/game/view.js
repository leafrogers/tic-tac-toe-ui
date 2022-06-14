import { toHtmlDocString } from '../../helpers.js';
import { styles } from './styles.js';
import CoreGame from '../../../shared/components/core-game.js';

/**
 * @param {object} settings
 * @param {boolean} settings.initialState
 * @param {PlayerModel["id"]} settings.playerId
 */
const renderCoreOnlyMessage = ({
	initialState,
	playerId
}) => `<form method="GET" class="core-only">
			<fieldset>
				<legend>Control your preferences</legend>
				<label for="input-auto-refresh">Automatically refresh every ten seconds, when it’s not your turn?</label>
				<input type="checkbox" name="autoRefresh" value="true" id="input-auto-refresh"${
					initialState === true ? ' checked' : ''
				}>
				<input type="hidden" name="player" value="${playerId}">
			</fieldset>
			<button type="submit">
				Set preferences
			</button>
		</form>`;

/**
 * @param {GameUiViewModel} settings
 * @param {GameOptionsModel} options
 */
export const view = (
	{ game, cspNonce, player, text },
	{ preferenceAutoRefresh, shouldAutoRefresh }
) => {
	const body = `
		<h1>${text.title}</h1>

		<div id="game">
			${new CoreGame({ game, player, preferenceAutoRefresh })}
		</div>

		${
			game.hasEnded
				? ''
				: renderCoreOnlyMessage({
						initialState: preferenceAutoRefresh,
						playerId: player.id
				  })
		}

		<script type="module" nonce="${cspNonce}">
			window.bootstrapData = {
				game: ${JSON.stringify(game)},
				player: ${JSON.stringify(player)}
			};
		</script>
	`;

	return toHtmlDocString({
		body,
		cspNonce,
		shouldAutoRefresh,
		styles,
		title: text.title
	});
};

export default view;
