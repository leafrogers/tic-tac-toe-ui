import { colors } from '../../helpers.js';

export const styles = `
	table {
		border-collapse: collapse;
		table-layout: fixed;
		width: 100%;
	}

	input[type="radio"]:enabled + .cell__hit-area:hover {
		background: ${colors.get('mid-2')};
	}

	input[type="radio"]:checked + .cell__hit-area {
		background: ${colors.get('light-1')};
		color: ${colors.get('dark-1')};
	}

	input[type="radio"]:focus + .cell__hit-area {
		outline: 3px solid ${colors.get('mid-3')};
	}

	legend {
		font-weight: bold;
		margin: 2rem 0 1rem;
		width: 100%;
	}

	.board {
		margin: 5rem auto 0;
		width: 350px;
	}

	.board__row:first-of-type .cell {
		border-top: 0;
	}

	.cell:first-child {
		border-left: 0;
	}

	.cell {
		border-left: 2px solid ${colors.get('light-2')};
		border-top: 2px solid ${colors.get('light-2')};
		font-size: 80px;
	}

	.cell__hit-area {
		display: flex;
		height: 114px;
		width: 114px;
		user-select: none;
	}

	.cell__hit-area--highlight {
		background: ${colors.get('light-2')};
		color: ${colors.get('dark-1')};
	}

	.cell__hit-area img {
		filter: invert(99%) sepia(7%) saturate(550%) hue-rotate(188deg) brightness(113%) contrast(100%);
		margin: auto;
	}

	.cell__hit-area--highlight img {
		filter: none;
	}

	.next-game-link::before {
		background: url(/img/again.svg);
		background-repeat: no-repeat;
		background-size: contain;
		content: "";
		display: inline-block;
		filter: invert(99%) sepia(7%) saturate(550%) hue-rotate(188deg) brightness(113%) contrast(100%);
		height: 20px;
		margin-right: 5px;
		vertical-align: middle;
		width: 20px;
	}
`;
