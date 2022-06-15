import config from '../config.js';
import { logger, toHtmlDocString } from '../helpers.js';

/**
 * @param {ExpressError} error
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @param {NextFunction} next
 */
export const controller = (error, req, res, next) => {
	const requestId = req.get('X-Request-ID');
	const acceptsHtml = Boolean(req.accepts('html'));

	if (res.headersSent) {
		return next(error);
	}

	try {
		const data = getData({
			cspNonce: res.locals.cspNonce,
			error,
			status: error.status
		});

		logger.debug({
			event: 'PROCESSING_ERROR',
			acceptsHtml,
			error,
			requestId
		});

		if (acceptsHtml) {
			const html = view(data);
			return res.status(data.status).send(html);
		}

		res.status(data.status).json({
			message: data.message,
			status: data.status
		});
	} catch (err) {
		next(err);
	}
};

/**
 * @param {object} settings
 * @param {BaseUiViewModel["cspNonce"]} settings.cspNonce
 * @param {Error} settings.error
 * @param {number} settings.status
 *
 * @returns {ViewModel}
 */
const getData = ({ cspNonce, error, status = 0 }) => {
	const publicStatus = status < 400 ? 500 : status;

	try {
		return {
			cspNonce,
			text: {
				title: `An error happened (${publicStatus}) — ${config.APP_FRIENDLY_NAME}`
			},
			message: config.IS_PRODUCTION ? 'Something went wrong.' : error.message,
			status: publicStatus
		};
	} catch (error) {
		return {
			cspNonce,
			text: {
				title: 'A confusing error happened'
			},
			message:
				'Something unexpected happened that messed up the serving of this page',
			status: publicStatus
		};
	}
};

/**
 * @param {ViewModel} settings
 */
const view = ({ message, text }) => {
	const body = `
		<h1>${text.title}</h1>
		<p>${message}</p>
	`;

	return toHtmlDocString({ body, title: text.title });
};

/**
 * @typedef PageSpecificViewModel
 * @property {number} status
 * @property {string} message
 *
 * @typedef {BaseUiViewModel & PageSpecificViewModel} ViewModel
 */
