import { logger } from '../../utils.js';
import { getData } from './model.js';
import view from './view.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const controller = async (req, res, next) => {
	try {
		const data = getData();

		logger.debug({
			event: 'ROUTE_NOT_FOUND',
			url: req.url
		});

		const html = view(data);

		res.status(404).send(html);
	} catch (err) {
		next(err);
	}
};

export default controller;
