/**
 * @param {import('./model').PokemonResult} model
 */
const renderResult = ({ name }) => `<li>${name}</li>\n`;

/**
 * @param {import('./model').Model["results"]} results
 */
const renderResults = (results = []) => `
	<ul>
		${results.map(renderResult).join('')}
	</ul>
`;
/**
 * @param {import('./model').Model} _
 */
const view = ({ results, title }) => `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>${title}</title>
		</head>
		<body>
			<h1>${title}</h1>
			${results ? renderResults(results) : ''}
		</body>
	</html>
`;

export default view;
