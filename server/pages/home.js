import { toHtmlDocString } from '../helpers.js';
import config from '../config.js';

/**
 * @param {ExpressRequest} _req
 * @param {ExpressResponse} res
 */
export const controller = async (_req, res) => {
	const data = {
		text: { createGame: 'Create a game', title: config.APP_FRIENDLY_NAME }
	};

	res.send(view(data));
};

/**
 * @param {PageSpecificViewModel["text"]} settings
 */
const renderForm = ({ createGame }) => `
		<form action="/games" method="POST">
			<fieldset class="column-hug">
				<legend>Who would you like to play as? Player O always starts.</legend>
				<div class="column-0">
					<input type="radio" name="choice" value="O" id="choice-o" checked>
					<label for="choice-o">Play as <b>Player	O</b></label>
				</div>
				<div class="column-1">
					<input type="radio" name="choice" value="X" id="choice-x">
					<label for="choice-x">Play as <b>Player X</b></label>
				</div>
			</fieldset>
			<button type="submit" class="cta">${createGame}</button>
		</form>
`;

/**
 * @param {ViewModel} settings
 */
const view = ({ text }) => {
	const body = `
		<h1>${text.title}</h1>
		${renderForm(text)}
	`;

	return toHtmlDocString({ body, title: text.title });
};

/**
 * @typedef PageSpecificViewModel
 * @property {object} text
 * @property {string} text.createGame
 *
 * @typedef {BaseUiViewModel & PageSpecificViewModel} ViewModel
 */
