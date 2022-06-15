/**
 * @typedef {number} CellNumber
 * @typedef {'X'|'O'|''} CellValue
 *
 * @typedef PlayerModel
 * @property {string} id
 * @property {boolean} isTurn
 * @property {boolean | null} isWinner
 * @property {string} name

 * @typedef BoardModel
 * @property {[CellValue, CellValue, CellValue,CellValue, CellValue, CellValue,CellValue, CellValue, CellValue]} cells
 * @property {CellNumber[]} winningIndexTrio
 *
 * @typedef GameModel
 * @property {BoardModel} board
 * @property {boolean} hasEnded
 * @property {PlayerModel[]} players
 * @property {string} id
 *
 * @typedef ApiResponse
 * @property {GameModel} [game]
 * @property {string} message
 * @property {number} status
 *
 * @typedef ApiViewModel
 * @property {GameModel} game
 * @property {PlayerModel} player
 *
 * @typedef ViewText
 * @property {string} title
 *
 * @typedef BaseUiViewModel
 * @property {string} cspNonce
 * @property {ViewText} text
 *
 * @typedef {BaseUiViewModel & ApiViewModel} GameUiViewModel
 *
 * @typedef GameOptionsModel
 * @property {boolean} shouldAutoRefresh
 * @property {boolean} preferenceAutoRefresh
 *
 * @typedef {import('express').Request} ExpressRequest
 * @typedef {import('express').Response} ExpressResponse
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {Error & { status: number }} ExpressError
 */
