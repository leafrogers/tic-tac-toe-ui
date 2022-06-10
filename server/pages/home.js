import { colors, toHtmlDocString } from '../helpers.js';
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
					<input type="radio" name="choice" value="O" id="choice-o" class="visually-hidden" checked>
					<label for="choice-o">Play as <b>Player	O</b></label>
				</div>
				<div class="column-1">
					<input type="radio" name="choice" value="X" id="choice-x" class="visually-hidden">
					<label for="choice-x">Play as <b>Player X</b></label>
				</div>
			</fieldset>
			<button type="submit" class="cta">${createGame}</button>
		</form>
`;

const styles = `
	.column-hug {
		display: grid;
		grid-column-gap: 1rem;
		grid-row-gap: 1rem;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		margin: 0 auto;
		width: 250px;
	}

	.cta {
		grid-area: 2 / 1 / 3 / 3;
		margin: 2rem 0 0;
		width: 250px;
	}

	.column-0 { grid-area: 1 / 1 / 2 / 2; }
	.column-1 { grid-area: 1 / 2 / 2 / 3; }

	input[type="radio"]:focus + label {
		outline: 3px solid ${colors.get('mid-3')};
	}

	input[type="radio"]:checked + label {
		border: 3px solid ${colors.get('mid-2')};
	}

	label {
		border-radius: 5px;
		padding: 1rem;
	}

	b {
		display: block;
	}
`;

/**
 * @param {ViewModel} settings
 */
const view = ({ text }) => {
	const body = `
		<h1>${text.title}</h1>
		${renderForm(text)}
	`;

	return toHtmlDocString({ body, styles, title: text.title });
};

/**
 * @typedef PageSpecificViewModel
 * @property {object} text
 * @property {string} text.createGame
 *
 * @typedef {BaseUiViewModel & PageSpecificViewModel} ViewModel
 */
