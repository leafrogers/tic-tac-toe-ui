const apiProxyBaseUrl = '/api-proxy';

/**
 * @param {object} settings
 * @param {GameModel["id"]} settings.gameId
 * @param {PlayerModel["id"]} settings.playerId
 */
export const fetchGame = ({ gameId, playerId }) =>
	fetch(`${apiProxyBaseUrl}/games/${gameId}?playerId=${playerId}`, {
		headers: {
			Accept: 'application/json'
		}
	}).then((response) => response.json());

/**
 * @param {FormDataEntryValue | null} cellValue
 */
const isValidCellValue = (cellValue) => {
	return Boolean(
		typeof cellValue === 'string' &&
			cellValue.length === 1 &&
			Number(cellValue) >= 0 &&
			Number(cellValue) <= 8
	);
};

/**
 * @param {object} settings
 * @param {HTMLFormElement} settings.form
 * @param {GameModel["id"]} settings.gameId
 * @param {PlayerModel["id"]} settings.playerId
 */
export const sendTurn = async ({ form, gameId, playerId }) => {
	const formData = new FormData(form);
	const cell = formData.get('cell');

	if (!isValidCellValue(cell)) {
		throw new Error('Expected chosen cell value to be a number from 0 to 8');
	}

	return fetch(`${apiProxyBaseUrl}/games/${gameId}/turn?playerId=${playerId}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({ cell })
	}).then((response) => response.json());
};
