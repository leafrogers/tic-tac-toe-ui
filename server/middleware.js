import { randomUUID } from 'crypto';
import helmet from 'helmet';
import config from './config.js';
import { HttpError } from './helpers.js';

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
