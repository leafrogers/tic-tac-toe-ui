import express from 'express';
import compression from 'compression';
import favicon from 'serve-favicon';

import {
	cacheFor,
	doNotCache,
	disallowInProduction,
	security
} from './middleware.js';
import { catchRejections } from './helpers.js';

import { controller as catchErrors } from './pages/error-catch-all.js';
import { controller as notFound } from './pages/error-not-found.js';
import { controller as home } from './pages/home.js';
import { controller as games } from './pages/games.js';
import { controller as share } from './pages/share.js';
import { controller as turn } from './pages/turn.js';
import game from './pages/game/controller.js';
import { read as apiRead, update as apiUpdate } from './pages/api-proxy.js';

const app = express();

app.set('etag', false);

app.use(security);
app.use(compression());
app.use(favicon('public/favicon.ico'));
// express.static needs to be called *before* setting a
// general Cache-Control header, otherwise express.static
// cache options are ignored
app.use(express.static('public', { maxAge: '1 day' }));
app.use(doNotCache);

app.get('/', cacheFor(60 * 60 * 24), catchRejections(home));
app.post(
	'/games',
	express.urlencoded({ extended: false }),
	catchRejections(games)
);
app.get('/games/:gameId/share', catchRejections(share));
app.get('/games/:gameId', catchRejections(game));
app.post(
	'/games/:gameId/turn',
	express.urlencoded({ extended: false }),
	catchRejections(turn)
);

app.get('/api-proxy/games/:gameId', catchRejections(apiRead));
app.post(
	'/api-proxy/games/:gameId/turn',
	express.json(),
	catchRejections(apiUpdate)
);

app.get('/throw-error-in-prod', disallowInProduction);

app.use(catchRejections(notFound));
app.use(catchErrors);

export default app;
