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

/**
 * @param {string} string
 */
export const stripWhitespace = (string) => string.replaceAll(/\s/g, '');

/**
 * @param {object} settings
 * @param {string} settings.body
 * @param {string} settings.title
 */
export const toHtmlDocString = ({ body, title }) => {
	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="Play tic-tac-toe (or noughts and crosses): the most boring game ever.">
		<title>${title}</title>
	</head>
	<body>
		<main>
			${body.trim()}
		</main>
	</body>
</html>`;
};
