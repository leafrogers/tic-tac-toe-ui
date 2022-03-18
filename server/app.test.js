// eslint-disable-next-line node/no-extraneous-import
import { jest } from '@jest/globals';
import nock from 'nock';
import supertest from 'supertest';
import app from './app.js';
import config from './config.js';

const request = supertest(app);
const originalFriendlyTitle = config.APP_FRIENDLY_NAME;

jest.spyOn(global.console, 'debug').mockImplementation(() => {});
jest.spyOn(global.console, 'error').mockImplementation(() => {});

describe(`The ${config.APP_FRIENDLY_NAME} app`, () => {
	beforeAll(() => {
		nock.disableNetConnect();
		nock.enableNetConnect('127.0.0.1');
	});

	beforeEach(() => {
		config.APP_FRIENDLY_NAME = 'Test Title';
		nock(config.API_URL)
			.get('/pokemon')
			.reply(200, {
				results: [{ name: 'Raymond Holt' }, { name: 'Amy Santiago' }]
			});
	});

	afterEach(() => {
		config.APP_FRIENDLY_NAME = originalFriendlyTitle;
		nock.cleanAll();
	});

	afterAll(() => nock.enableNetConnect());

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

		it('renders a no-results message when no results are available because of a non-retriable API error', async () => {
			nock.cleanAll();
			nock(config.API_URL).get('/pokemon').reply(418).persist();
			const response = await request.get('/');
			expect(response.text).toMatch('<p>No pokemon in the list</p>');
		});

		it('renders a public-facing error message when there’s an issue with fetching (catching?) Pokemon from the API', async () => {
			nock.cleanAll();
			nock(config.API_URL).get('/pokemon').reply(418).persist();
			const response = await request.get('/');
			expect(response.text).toMatch(
				'<p>An error happened while attempting to fetch Pokemon data</p>'
			);
		});
	});

	describe('Not found page', () => {
		/**
		 * @type {import("superagent").Response}
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
		 * @type {import("superagent").Response}
		 */
		let response;

		beforeEach(async () => {
			const badAppName = () => {};
			badAppName.toString = () => {
				throw new Error(
					'This is to force an error during the processing of a web request'
				);
			};
			// @ts-ignore
			config.APP_FRIENDLY_NAME = badAppName;
			response = await request.get('/');
		});

		it('renders a fallback document title', () => {
			expect(response.text).toMatch(
				'<title>A confusing error happened</title>'
			);
		});

		it('renders a public-facing error message', () => {
			expect(response.text).toMatch(
				'Something unexpected happened that messed up the serving of this page'
			);
		});
	});
});
