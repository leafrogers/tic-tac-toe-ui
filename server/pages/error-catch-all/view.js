/**
 * @param {import('./model').Model} _
 */
const view = ({ message, title }) => `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>${title}</title>
		</head>
		<body>
			<h1>${title}</h1>
			<p>${message}</p>
		</body>
	</html>
`;

export default view;