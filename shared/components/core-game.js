import CoreComponent from './core-component.js';
import Board from './board.js';
import NextGameLink from './next-game-link.js';
import StatusMessage from './status-message.js';

export default class CoreGame extends CoreComponent {
	render() {
		const { game, player, preferenceAutoRefresh } = this.props;
		const maybeNextGameLink = game.hasEnded
			? new NextGameLink({
					nextGameId: game.nextId,
					nextPlayerId: player.nextId,
					preferenceAutoRefresh,
					text: 'Play again?'
			  })
			: '';

		return `
			${new StatusMessage({ game, player })}
			${new Board({
				board: game.board,
				gameId: game.id,
				hasEnded: game.hasEnded,
				player,
				preferenceAutoRefresh
			})}
			${maybeNextGameLink}
		`;
	}
}
