import CoreComponent from './core-component.js';
import Cell from './cell.js';

/**
 * @param {object} settings
 * @param {BoardModel} settings.board
 */
const createCells = ({ board }) => {
	/**
	 * @param {CellValue} cell
	 * @param {CellNumber} index
	 */
	const createCell = (cell, index) => {
		const shouldHighlight = (board.winningIndexTrio || []).includes(index);
		return new Cell({
			cell,
			index,
			shouldHighlight
		});
	};

	return board.cells.map(createCell);
};

/**
 * @param {object} settings
 * @param {boolean} settings.hasEnded
 * @param {boolean} settings.isTurn
 */
const getMaybeButton = ({ hasEnded, isTurn }) => {
	return !hasEnded && isTurn
		? `<button type="submit" class="core-only">Take your turn</button>`
		: '';
};

class Board extends CoreComponent {
	render() {
		const { board, gameId, hasEnded, player, preferenceAutoRefresh } =
			this.props;
		const cells = createCells({ board });
		const maybeButton = getMaybeButton({
			hasEnded,
			isTurn: player.isTurn
		});

		return `
			<form action="/games/${gameId}/turn?player=${player.id}${
			preferenceAutoRefresh ? '&autoRefresh=true' : ''
		}" method="POST" class="board">
				<fieldset${hasEnded || !player.isTurn ? ` disabled="true"` : ''}>
					<legend class="visually-hidden">Which cell would you like to claim?</legend>
					<table>
						<tbody>
							<tr class="board__row">
								${cells.slice(0, 3).join('')}
							</tr>
							<tr class="board__row">
								${cells.slice(3, 6).join('')}
							</tr>
							<tr class="board__row">
								${cells.slice(6, 9).join('')}
							</tr>
						</tbody>
					</table>
				</fieldset>
				${maybeButton}
			</form>
		`;
	}
}

export default Board;
