import nock from 'nock';
import supertest from 'supertest';
import app from './app.js';
import config from '../config.js';

const request = supertest(app);
const originalFriendlyTitle = config.APP_FRIENDLY_NAME;

/**
 * @param {string} string
 */
const trim = (string) => string.replaceAll(/\s/g, '');

describe(`The ${config.APP_FRIENDLY_NAME} app`, () => {
	beforeAll(() => {
		nock.disableNetConnect();
		nock.enableNetConnect('127.0.0.1');
	});

	beforeEach(() => {
		nock(config.API_URL)
			.get('/pokemon')
			.reply(200, {
				results: [{ name: 'Raymond Holt' }, { name: 'Amy Santiago' }]
			});
	});

	afterAll(() => {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	it('serves a default route', async () => {
		const { status } = await request.get('/');

		expect(status).toBe(200);
	});

	describe('Checking for the expected HTML payload', () => {
		/**
		 * @type {import("superagent").Response}
		 */
		let response;

		beforeEach(async () => {
			config.APP_FRIENDLY_NAME = 'Test Title';
			response = await request.get('/');
		});

		afterEach(() => {
			config.APP_FRIENDLY_NAME = originalFriendlyTitle;
		});

		it('renders the config file’s app title as the HTML title', () => {
			expect(response.text).toMatch('<title>Test Title</title>');
		});

		it('renders API results', () => {
			expect(trim(response.text)).toMatch(
				trim(`
					<ul>
						<li>Raymond Holt</li>
						<li>Amy Santiago</li>
					</ul>
				`)
			);
		});
	});
});
