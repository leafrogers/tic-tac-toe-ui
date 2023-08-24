import CoreComponent from './core-component.js';

export default class Cell extends CoreComponent {
	render() {
		const { cell, index, shouldHighlight } = this.props;
		const value =
			cell === ''
				? `
					<input name="cell" type="radio" value="${index}" id="input-${index}" class="visually-hidden" aria-label="Cell ${
						index + 1
					}, unclaimed">
					<label for="input-${index}" class="cell__hit-area"></label>
				`
				: `
					<input name="cell" type="radio" value="${index}" id="input-${index}" class="visually-hidden" disabled="disabled" aria-label="Cell ${
						index + 1
					}. Player ${cell} claimed this cell.">
					<span class="cell__hit-area${
						shouldHighlight ? ' cell__hit-area--highlight' : ''
					}">
						<img src="/img/${cell.toLowerCase()}.svg" height="70" width="70" alt="" aria-hidden="true">
					</span>
				`;

		return `<td class="cell">${value}</td>`;
	}
}
