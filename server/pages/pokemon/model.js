// eslint-disable-next-line node/no-missing-import
import got from 'got';
import config from '../../../config.js';

/**
 * @typedef {object} PokemonResult
 * @property {string} name
 * @property {string} url
 */

/**
 * @typedef {object} Model
 * @property {PokemonResult[]=} results
 * @property {string} title
 */

const fetchData = async () => {
	/**
	 * @type Model
	 */
	const data = {
		title: config.APP_FRIENDLY_NAME
	};

	const { results } = await got(`${config.API_URL}/pokemon`).json();

	data.results = results;

	return data;
};

export default {
	fetchData
};
