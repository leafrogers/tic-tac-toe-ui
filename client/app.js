import EnhancedGame from './components/enhanced-game.js';

/**
 * @param {object} settings
 * @param {HTMLElement | null} settings.element
 * @param {ApiViewModel} settings.bootstrapData
 */
const app = ({ element, bootstrapData }) => {
	if (!element || !bootstrapData) {
		return;
	}

	const { game, player } = bootstrapData;

	new EnhancedGame({ autoRefresh: false, game, player }, element);
};

export default app;
