import { randomUUID } from 'crypto';
import helmet from 'helmet';

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
				'script-src': [`'nonce-${res.locals.cspNonce}'`]
			}
		}
	})(req, res, next);
};
