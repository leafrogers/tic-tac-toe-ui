import prettier from 'prettier';

/**
 * @param {object} object
 * */
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
 * @param {string} string
 */
export const stripWhitespace = (string) => string.replaceAll(/\s/g, '');

/**
 * @param {string} messyHtmlString
 */
export const tidyHtml = (messyHtmlString) => {
	return prettier.format(messyHtmlString, { parser: 'html', useTabs: true });
};
