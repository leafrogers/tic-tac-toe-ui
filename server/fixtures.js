export const newGame = {
	game: {
		board: {
			cells: ['', '', '', '', '', '', '', '', ''],
			winningIndexTrio: null
		},
		hasEnded: false,
		id: '00000',
		nextId: null,
		players: [
			{
				isTurn: true,
				isWinner: null,
				name: 'Player O',
				nextId: null,
				id: '11111'
			},
			{
				isTurn: false,
				isWinner: null,
				name: 'Player X',
				nextId: null,
				id: '22222'
			}
		]
	}
};

export const gameWithWinner = {
	game: {
		board: {
			cells: ['O', 'O', 'O', '', '', '', '', '', ''],
			winningIndexTrio: [0, 1, 2]
		},
		hasEnded: true,
		id: '00000',
		nextId: '33333',
		players: [
			{
				isTurn: true,
				isWinner: true,
				name: 'Player O',
				nextId: '22222',
				id: '11111'
			},
			{
				isTurn: false,
				isWinner: false,
				name: 'Player X',
				nextId: '22222',
				id: '22222'
			}
		]
	}
};

export const gameWithDraw = {
	game: {
		board: {
			cells: ['O', 'X', 'O', 'O', 'X', 'X', 'X', 'O', 'O'],
			winningIndexTrio: []
		},
		hasEnded: true,
		id: '00000',
		nextId: '33333',
		players: [
			{
				isTurn: true,
				isWinner: false,
				name: 'Player O',
				nextId: '22222',
				id: '11111'
			},
			{
				isTurn: false,
				isWinner: false,
				name: 'Player X',
				nextId: '22222',
				id: '22222'
			}
		]
	}
};
