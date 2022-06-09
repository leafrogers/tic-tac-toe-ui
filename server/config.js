// @ts-nocheck
import { assertNoUndefinedValues } from './helpers.js';

const config = {
	/** @type string */
	API_KEY: process.env.API_KEY,
	/** @type string */
	API_URL: process.env.API_URL,
	APP_FRIENDLY_NAME: 'Tic-tac-toe',
	/** @type string */
	BASE_URL: process.env.BASE_URL,
	IS_PRODUCTION: process.env.NODE_ENV === 'production',
	PORT: process.env.PORT || 3001
};

assertNoUndefinedValues(config);

export default config;
