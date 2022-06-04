import { assertNoUndefinedValues } from './helpers.js';

const config = {
	API_URL: process.env.API_URL || 'https://pokeapi.co/api/v2',
	APP_FRIENDLY_NAME: 'Tic-tac-toe UI',
	IS_PRODUCTION: process.env.NODE_ENV === 'production',
	PORT: process.env.PORT || 3001
};

assertNoUndefinedValues(config);

export default config;
