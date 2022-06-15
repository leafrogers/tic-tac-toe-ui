/**
 * @param {object} object
 */
export const assertNoUndefinedValues = (object) => {
	const keysWithUndefinedValues = [];

	for (const [key, value] of Object.entries(object)) {
		if (typeof value === 'undefined') {
			keysWithUndefinedValues.push(key);
		}
	}

	if (keysWithUndefinedValues.length) {
		throw new Error(
			`Expected all config variables to be defined but found the following undefined variables: ${keysWithUndefinedValues.join(
				', '
			)}.`
		);
	}
};

export const logger = console;

/**
 * @param {function} callback
 */
export const catchRejections = (callback) => {
	/**
	 * @param {ExpressRequest} req
	 * @param {ExpressResponse} res
	 * @param {NextFunction} next
	 */
	return (req, res, next) => {
		callback(req, res, next).catch(next);
	};
};

export class HttpError extends Error {
	/**
	 * @param {number} status
	 * @param {string} message
	 */
	constructor(status, message) {
		super(message);
		this.status = status;
		this.message = message;
	}
}

/**
 * @param {string} string
 */
export const stripSpace = (string) =>
	string.replace(/\n/g, '').replace(/\t/g, '').replace(/\s\s+/g, ' ');

export const colors = new Map([
	['dark-1', '#36163e'],
	['mid-1', '#dd517e'],
	['mid-2', '#e68e35'],
	['mid-3', '#556cc9'],
	['light-1', '#7a98ee'],
	['light-2', '#fff0f5']
]);

/**
 * @param {object} settings
 * @param {string} settings.body
 * @param {string} [settings.cspNonce]
 * @param {boolean} [settings.shouldAutoRefresh]
 * @param {string} [settings.styles]
 * @param {string} settings.title
 */
export const toHtmlDocString = ({
	body,
	cspNonce = '',
	shouldAutoRefresh = false,
	styles = '',
	title
}) => {
	const maybeAutoRefresh = shouldAutoRefresh
		? '\n\t\t<meta http-equiv="refresh" content="10">'
		: '';
	const maybeEnhancer = cspNonce
		? `\n\t\t<script type="module" nonce="${cspNonce}">${stripSpace(`
			const docEl = document.documentElement;
			const currentScript = document.scripts[document.scripts.length - 1];
			const script = document.createElement('script');

			docEl.classList.remove('core');
			docEl.classList.add('enhanced');

			script.onerror = () => {
				if (docEl.classList.contains('enhanced')) {
					console.warn('Script loading failed. Reverting to core experience.');
					docEl.classList.add('core');
					docEl.classList.remove('enhanced');
				}
			};
			script.async = false;
			script.nonce = '${cspNonce}';
			script.src = '/js/init.js';

			currentScript.parentNode.insertBefore(script, currentScript);
		</script>`)}`
		: '';
	const css = stripSpace(
		`
			@font-face {
				font-display: swap;
				font-family: 'Sora';
				font-style: normal;
				font-weight: 400;
				src: url('/fonts/sora-regular.woff2') format('woff2'), url('/fonts/sora-regular.woff') format('woff');
			}

			@font-face {
				font-display: swap;
				font-family: 'Sora';
				font-style: normal;
				font-weight: 700;
				src: url('/fonts/sora-bold.woff2') format('woff2'), url('/fonts/sora-bold.woff') format('woff');
			}

			*:focus {
				outline: 3px solid ${colors.get('mid-3')};
			}

			body {
				background: ${colors.get('dark-1')} linear-gradient(${colors.get(
			'dark-1'
		)}, ${colors.get('mid-1')}) fixed;
				color: ${colors.get('light-2')};
				font-family: 'Sora', arial, sans-serif;
				line-height: 1.6;
				margin: 1rem;
				text-align: center;
			}

			main {
				margin: 0 auto;
				max-width: 550px;
			}

			h1 {
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				background-image: linear-gradient(${colors.get('mid-2')}, ${colors.get(
			'mid-1'
		)});
				font-size: 2rem;
				line-height: 1;
				margin: 2rem;
				text-transform: uppercase;
			}

			ul {
				list-style: none;
				padding: 0;
			}

			button, form, legend, p {
				font-size: 1rem;
				margin: 2rem 0;
			}

			legend {
				margin-top: 0;
			}

			a {
				color: ${colors.get('light-2')};
			}

			a:hover,
			button:hover,
			label:hover {
				left: 1px;
				position: relative;
				top: 1px;
			}

			a:active, button:active {
				top: 2px;
			}

			fieldset {
				border: 0;
				padding: 0;
			}

			label {
				display: inline-block;
			}

			button {
				background-image: linear-gradient(${colors.get('mid-2')}, ${colors.get(
			'mid-1'
		)});
				border-radius: 9999px;
				border: 0;
				color: ${colors.get('dark-1')};
				line-height: 1;
				padding: 10px 20px;
			}

			.visually-hidden {
				border: 0;
				clip: rect(0, 0, 0, 0);
				height: 1px;
				margin: -1px;
				overflow: hidden;
				padding: 0;
				position: absolute;
				white-space: nowrap;
				width: 1px;
			}

			.enhanced .core-only { display: none }

			${styles}
		`.trim()
	);

	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="Play tic-tac-toe (or noughts and crosses): the most boring game ever.">${maybeAutoRefresh}
		<title>${title}</title>${maybeEnhancer}
		<style>${css}</style>
	</head>
	<body>
		<main>
			${body.trim()}
		</main>
	</body>
</html>`;
};
