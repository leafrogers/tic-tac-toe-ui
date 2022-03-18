import { logger, tidyHtml } from '../../utils.js';
import { getData } from './model.js';
import view from './view.js';

/**
 * @param {Error} error
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const controller = (error, _req, res, next) => {
	if (res.headersSent) {
		return next(error);
	}

	try {
		const data = getData({
			error,
			status: res.statusCode
		});

		logger.debug({
			event: 'PROCESSING_ERROR',
			error
		});

		const html = view(data);

		res.status(data.status || 500).send(tidyHtml(html));
	} catch (err) {
		next(err);
	}
};

export default controller;
