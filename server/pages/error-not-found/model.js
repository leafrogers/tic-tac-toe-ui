import config from '../../config.js';

/**
 * @typedef {object} Model
 * @property {number=} status
 * @property {string} title
 * @property {string} message
 */

/**
 * @returns {Model}
 */
export const getData = () => {
	/**
	 * @type Model
	 */
	const data = {
		title: `An error happened (404) — ${config.APP_FRIENDLY_NAME}`,
		message: 'Page not found.'
	};

	return data;
};
