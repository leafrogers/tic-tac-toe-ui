import config from '../../config.js';

/**
 * @typedef {object} Model
 * @property {number=} status
 * @property {string} title
 * @property {string} message
 */

/**
 * @param {object} _
 * @param {Error} _.error
 * @param {number} _.status
 *
 * @returns {Model}
 */
export const getData = ({ error, status }) => {
	const publicStatus = !status || status < 400 ? 500 : status;

	try {
		return {
			title: `An error happened (${publicStatus}) — ${config.APP_FRIENDLY_NAME}`,
			message: config.IS_PRODUCTION ? 'Something went wrong.' : error.message,
			status: publicStatus
		};
	} catch (error) {
		return {
			title: `A confusing error happened`,
			message:
				'Something unexpected happened that messed up the serving of this page to you. It wasn’t you though. Sorry about this. Try again later?'
		};
	}
};
