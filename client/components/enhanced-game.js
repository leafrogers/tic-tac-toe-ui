import CoreGame from '../../shared/components/core-game.js';
import { createLongPoller } from '../helpers.js';
import { fetchGame, sendTurn } from './api-proxy.js';

/**
 * @param {Event} event
 */
const cancelFormSubmission = (event) => {
	const form = event.target;

	if (!(form instanceof HTMLFormElement) || form.className !== 'board') {
		return;
	}

	event.preventDefault();
};

/**
 * @param {object} settings
 * @param {GameModel} settings.game
 * @param {PlayerModel} settings.player
 */
const maybeFetchGame = async ({ game, player }) => {
	const shouldCallApi = !game.hasEnded && !player.isTurn;

	if (!shouldCallApi) {
		return;
	}

	return fetchGame({
		gameId: game.id,
		playerId: player.id
	});
};

export default class EnhancedGame extends CoreGame {
	setUpListeners() {
		if (!this.element) {
			return;
		}

		const startLongPolling = createLongPoller({ intervalInMs: 3000 });
		/**
		 * @param {ApiViewModel} settings
		 */
		const maybeFetchGameAndUpdate = async (settings) => {
			const receivedData = await maybeFetchGame(settings);

			if (!receivedData) {
				return;
			}

			this.update(receivedData.game);
		};

		this.element.addEventListener('change', (event) => this.onChange(event));
		this.element.addEventListener('submit', cancelFormSubmission);

		startLongPolling({
			apiCaller: maybeFetchGameAndUpdate,
			callerParams: this.props
		});
	}

	/**
	 * @param {Event} event
	 */
	onChange(event) {
		const target = event.target;

		if (!(target instanceof HTMLElement)) {
			return;
		}

		const form = target.closest('form');

		if (!(form instanceof HTMLFormElement)) {
			return;
		}

		sendTurn({
			form,
			gameId: this.props.game.id,
			playerId: this.props.player.id
		}).then((receivedGame) => this.update(receivedGame));
	}

	/**
	 * @param {GameModel} receivedGame
	 */
	update(receivedGame) {
		this.props.game = receivedGame;
		this.props.player = receivedGame.players.find(
			(unknownPlayer) => this.props.player.id === unknownPlayer.id
		);

		const newHtml = this.render();

		if (this.element && newHtml !== this.element.innerHTML) {
			this.element.innerHTML = this.render();
		}
	}
}
