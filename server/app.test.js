// eslint-disable-next-line node/no-extraneous-import
import { jest } from '@jest/globals';
import nock from 'nock';
import supertest from 'supertest';
import app from './app.js';
import config from './config.js';
import { gameWithDraw, gameWithWinner, newGame } from './fixtures.js';

const request = supertest(app);
const originalFriendlyTitle = config.APP_FRIENDLY_NAME;
const originalIsProduction = config.IS_PRODUCTION;

jest.spyOn(global.console, 'debug').mockImplementation(() => {});
jest.spyOn(global.console, 'error').mockImplementation(() => {});

describe(`The ${config.APP_FRIENDLY_NAME} app`, () => {
	beforeAll(() => {
		nock.disableNetConnect();
		nock.enableNetConnect('127.0.0.1');
	});

	beforeEach(() => {
		config.APP_FRIENDLY_NAME = 'Test Title';
	});

	afterEach(() => {
		config.APP_FRIENDLY_NAME = originalFriendlyTitle;
		config.IS_PRODUCTION = originalIsProduction;
		nock.cleanAll();
	});

	afterAll(() => nock.enableNetConnect());

	describe('GET /', () => {
		it('serves a 200 status', async () => {
			const { status, text } = await request.get('/');

			expect(status).toBe(200);
			expect(text).toContain('<form action="/games" method="POST">');
		});
	});

	describe('POST /games', () => {
		it('redirects to a game URL after creation', async () => {
			nock(config.API_URL).post('/games').reply(201, newGame);

			const { headers, status } = await request
				.post('/games')
				.set('Content-Type', 'application/x-www-form-urlencoded')
				.send('choice=O');

			expect(status).toBe(302);
			expect(headers.location).toBe(
				'/games/00000/share?players=11111,22222&choice=11111'
			);
		});

		it('errors if no player choice is made', async () => {
			nock(config.API_URL).post('/games').reply(201, newGame);

			const { status } = await request.post('/games');

			expect(status).toBe(500);
		});
	});

	describe('GET /games/:gameId/share', () => {
		it('serves a 200 for the player choice page when player O is chosen', async () => {
			nock(config.API_URL).get('/games/00000').reply(200, newGame);

			const { status } = await request.get(
				'/games/00000/share?players=11111,22222&choice=11111'
			);

			expect(status).toBe(200);
		});

		it('serves the expected links for the player choice page when player O is chosen', async () => {
			nock(config.API_URL).get('/games/00000').reply(200, newGame);

			const { text } = await request.get(
				'/games/00000/share?players=11111,22222&choice=11111'
			);

			expect(text).toContain(
				`<a href="http://localhost:3001/games/00000?player=22222" class="share__link">other player’s link</a>`
			);
			expect(text).toContain(
				`<a href="http://localhost:3001/games/00000?player=11111">start playing…</a>`
			);
		});

		it('serves a 200 for the player choice page when player X is chosen', async () => {
			nock(config.API_URL).get('/games/00000').reply(200, newGame);

			const { status } = await request.get(
				'/games/00000/share?players=11111,22222&choice=22222'
			);

			expect(status).toBe(200);
		});

		it('serves the expected links for the player choice page when player X is chosen', async () => {
			nock(config.API_URL).get('/games/00000').reply(200, newGame);

			const { text } = await request.get(
				'/games/00000/share?players=11111,22222&choice=22222'
			);

			expect(text).toContain(
				`<a href="http://localhost:3001/games/00000?player=11111" class="share__link">other player’s link</a>`
			);
			expect(text).toContain(
				`<a href="http://localhost:3001/games/00000?player=22222">start playing…</a>`
			);
		});

		it('serves a 404 error if a game can’t be found', async () => {
			nock(config.API_URL).get('/games/00000').reply(200, newGame);

			const { status } = await request.get(
				'/games/55555/share?players=11111,22222'
			);

			expect(status).toBe(404);
		});

		it('serves a 500 error if no players query string is provided', async () => {
			nock(config.API_URL).get('/games/00000').reply(200, newGame);

			const { status, text } = await request.get('/games/00000/share');

			expect(status).toBe(400);
			expect(text).toContain(
				'<p>Expected players query string to be a comma separated string of player IDs</p>'
			);
		});

		it('serves a 500 error if the players query string exists but is missing IDs', async () => {
			nock(config.API_URL).get('/games/00000').reply(200, newGame);

			const { status, text } = await request.get('/games/00000/share?players=');

			expect(status).toBe(400);
			expect(text).toContain('<p>Missing player data</p>');
		});
	});

	describe('GET /games/:gameId?player=:playerId', () => {
		it('serves a 200', async () => {
			nock(config.API_URL)
				.get('/games/00000?playerId=11111')
				.reply(200, newGame);
			const { status } = await request.get('/games/00000?player=11111');
			expect(status).toBe(200);
		});

		it('contains a message for player ID 11111, stating it is their turn', async () => {
			nock(config.API_URL)
				.get('/games/00000?playerId=11111')
				.reply(200, newGame);
			const { text } = await request.get('/games/00000?player=11111');
			expect(text).toContain(
				'<p role="status">It’s your turn. You’re <b>Player O</b>.</p>'
			);
		});

		it('contains a message for player ID 22222, stating it is the other player’s turn', async () => {
			nock(config.API_URL)
				.get('/games/00000?playerId=22222')
				.reply(200, newGame);
			const { text } = await request.get('/games/00000?player=22222');
			expect(text).toContain(
				'<p role="status">It’s their turn. You’re <b>Player X</b>.</p>'
			);
		});

		it('contains a message for player ID 11111, stating that they won the game', async () => {
			nock(config.API_URL)
				.get('/games/00000?playerId=11111')
				.reply(200, gameWithWinner);
			const { text } = await request.get('/games/00000?player=11111');
			expect(text).toContain('You won');
		});

		it('contains a message for player ID 22222, stating that they lost the game', async () => {
			nock(config.API_URL)
				.get('/games/00000?playerId=22222')
				.reply(200, gameWithWinner);
			const { text } = await request.get('/games/00000?player=22222');
			expect(text).toContain('You lost');
		});

		it('contains a draw message when the game has ended with a draw', async () => {
			nock(config.API_URL)
				.get('/games/00000?playerId=22222')
				.reply(200, gameWithDraw);
			const { text } = await request.get('/games/00000?player=22222');
			expect(text).toContain('It was a draw');
		});

		it('contains a link to play a subsequent game when the current game has ended', async () => {
			nock(config.API_URL)
				.get('/games/00000?playerId=22222')
				.reply(200, gameWithWinner);
			const { text } = await request.get('/games/00000?player=22222');
			expect(text).toContain(
				'<a href="/games/33333?player=22222" class="next-game-link">Play again?</a>'
			);
		});

		it('serves a 404 page if a game can’t be found', async () => {
			nock(config.API_URL).get('/games/00000').reply(200, newGame);
			const { status } = await request.get('/games/55555?player=99999');
			expect(status).toBe(404);
		});

		it('serves an error page if a player can’t be found', async () => {
			nock(config.API_URL)
				.get('/games/00000?playerId=99999')
				.reply(200, newGame);
			const { status, text } = await request.get('/games/00000?player=99999');
			expect(status).toBe(500);
			expect(text).toContain('<p>Couldn’t find player</p>');
		});
	});

	describe('POST /games/:gameId/turn?player=:playerId', () => {
		it('accepts a valid form submission for a turn and redirects back to itself', async () => {
			nock(config.API_URL)
				.post('/games/00000/turn', { cellToClaim: 8, playerId: '11111' })
				.reply(200, newGame);

			const { headers, status } = await request
				.post('/games/00000/turn?player=11111')
				.set('Content-Type', 'application/x-www-form-urlencoded')
				.send('cell=8');

			expect(status).toBe(302);
			expect(headers.location).toBe('/games/00000?player=11111');
		});

		it('serves an error page if the API returns a 400', async () => {
			nock(config.API_URL)
				.post('/games/00000/turn')
				.reply(400, { message: 'You did it wrong', status: 400 });

			const { status, text } = await request.post(
				'/games/00000/turn?player=11111'
			);

			expect(status).toBe(400);
			expect(text).toContain('<p>Error from API (400): You did it wrong</p>');
		});
	});

	describe('GET /api-proxy/games/:gameId', () => {
		it('kinda proxies a call to the API but decorates the response with an extra object of the player who triggered the call', async () => {
			nock(config.API_URL)
				.get('/games/00000?playerId=11111')
				.reply(200, newGame);

			const { status, body } = await request.get(
				'/api-proxy/games/00000?playerId=11111'
			);

			expect(status).toBe(200);
			expect(body).toEqual({
				player: newGame.game.players[0],
				...newGame
			});
		});

		it('serves a 404 if the game can’t be found', async () => {
			nock(config.API_URL).get('/games/00000').reply(200, newGame);

			const { status } = await request
				.get('/api-proxy/games/55555')
				.set('Accept', 'application/json');

			expect(status).toBe(404);
		});

		it('serves a 404 if the player can’t be found', async () => {
			nock(config.API_URL).get('/games/00000').reply(200, newGame);

			const { status } = await request.get(
				'/api-proxy/games/00000?playerId=55555'
			);

			expect(status).toBe(404);
		});
	});

	describe('POST /api-proxy/games/:gameId/turn', () => {
		it('accepts a valid form submission for a turn and returns game data', async () => {
			nock(config.API_URL)
				.post('/games/00000/turn', { cellToClaim: 8, playerId: '11111' })
				.reply(200, newGame);

			const { body, status } = await request
				.post('/api-proxy/games/00000/turn?playerId=11111')
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.send({ cell: '8' });

			expect(status).toBe(201);
			expect(body).toEqual(newGame.game);
		});

		it('serves an error page if the API returns a 400', async () => {
			nock(config.API_URL)
				.post('/games/00000/turn')
				.reply(400, { message: 'You did it wrong', status: 400 });

			const { status, text } = await request
				.post('/api-proxy/games/00000/turn?playerId=11111')
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.send({ cell: '8' });

			expect(status).toBe(400);
			expect(text).toContain(
				'"message":"Error from API (400): You did it wrong"'
			);
		});
	});

	describe('Caching', () => {
		it('sets a no-cache header for the homepage', async () => {
			const { headers, status } = await request.get('/');
			expect(status).toBe(200);
			expect(headers['cache-control']).toEqual('public, max-age=86400');
		});

		it('sets a no-cache header for the share page', async () => {
			nock(config.API_URL).get('/games/00000').reply(200, newGame);
			const { headers, status } = await request.get(
				'/games/00000/share?players=11111,22222&choice=11111'
			);
			expect(status).toBe(200);
			expect(headers['cache-control']).toEqual(
				'no-store, no-cache, must-revalidate, proxy-revalidate'
			);
		});

		it('sets a no-cache header for game pages', async () => {
			nock(config.API_URL)
				.get('/games/00000?playerId=11111')
				.reply(200, newGame);
			const { headers, status } = await request.get(
				'/games/00000?player=11111'
			);
			expect(status).toBe(200);
			expect(headers['cache-control']).toEqual(
				'no-store, no-cache, must-revalidate, proxy-revalidate'
			);
		});

		it('sets a no-cache header for 4xx/5xx pages', async () => {
			const { headers, status } = await request.get('/made-up-path');
			expect(status).toBe(404);
			expect(headers['cache-control']).toEqual(
				'no-store, no-cache, must-revalidate, proxy-revalidate'
			);
		});
	});

	describe('Not found page', () => {
		/**
		 * @type {supertest.Response}
		 */
		let response;

		beforeEach(async () => {
			response = await request.get('/made-up-path');
		});

		it('renders the config file’s app title as the HTML title', () => {
			expect(response.text).toMatch(
				'<title>An error happened (404) — Test Title</title>'
			);
		});

		it('renders a “page not found” paragraph', () => {
			expect(response.text).toMatch('<p>Page not found.</p>');
		});
	});

	describe('Catch-all error page for unexpected scenarios', () => {
		/**
		 * @type {supertest.Response}
		 */
		let response;

		beforeEach(async () => {
			config.IS_PRODUCTION = true;
			response = await request.get('/throw-error-in-prod');
		});

		it('renders a fallback document title', () => {
			expect(response.text).toMatch(
				'<h1>An error happened (405) — Test Title</h1>'
			);
		});

		it('renders a public-facing error message', () => {
			expect(response.text).toMatch('Something went wrong.');
		});
	});
});
