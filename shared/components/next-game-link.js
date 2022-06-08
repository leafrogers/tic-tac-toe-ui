import CoreComponent from './core-component.js';

export default class NextGameLink extends CoreComponent {
	render() {
		const { nextGameId, nextPlayerId, preferenceAutoRefresh, text } =
			this.props;
		return `
			<p><a href="/games/${nextGameId}?player=${nextPlayerId}${
			preferenceAutoRefresh ? '&autoRefresh=true' : ''
		}" class="next-game-link">${text}</a></p>
		`;
	}
}
