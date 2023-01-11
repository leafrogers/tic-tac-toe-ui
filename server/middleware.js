import { randomUUID } from 'crypto';
import helmet from 'helmet';
import config from './config.js';
import { HttpError } from './helpers.js';

/**
 * @param {ExpressRequest} _req
 * @param {ExpressResponse} res
 * @param {NextFunction} next
 */
export const doNotCache = (_req, res, next) => {
	res.setHeader(
		'Cache-Control',
		'no-store, no-cache, must-revalidate, proxy-revalidate'
	);
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');

	next();
};

/**
 * @param {number} maxAge
 * @param {object} options
 * @param {boolean} [options.isPrivate]
 */
export const cacheFor = (maxAge, { isPrivate = false } = {}) => {
	/**
	 * @param {ExpressRequest} _req
	 * @param {ExpressResponse} res
	 * @param {NextFunction} next
	 */
	return (_req, res, next) => {
		res.setHeader(
			'Cache-Control',
			`${isPrivate ? 'private' : 'public'}, max-age=${maxAge}`
		);

		next();
	};
};

/**
 * @param {ExpressRequest} _req
 * @param {ExpressResponse} _res
 * @param {NextFunction} next
 */
export const disallowInProduction = (_req, _res, next) => {
	if (config.IS_PRODUCTION) {
		return next(
			new HttpError(405, 'This method or route is not allowed in production')
		);
	}
	next();
};

/**
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @param {NextFunction} next
 */
export const security = (req, res, next) => {
	res.locals.cspNonce = randomUUID();
	helmet({
		contentSecurityPolicy: {
			directives: {
				'script-src': [
					`'nonce-${res.locals.cspNonce}'`,
					`'strict-dynamic'`,
					'https:',
					`'unsafe-inline'`
				]
			}
		}
	})(req, res, next);
};
