import express from 'express';
import { disallowInProduction, security } from './middleware.js';
import favicon from 'serve-favicon';
import { catchRejections } from './helpers.js';

import { controller as catchErrors } from './pages/error-catch-all.js';
import { controller as notFound } from './pages/error-not-found.js';
import { controller as home } from './pages/home.js';
import { controller as games } from './pages/games.js';
import { controller as choose } from './pages/choose.js';
import { controller as turn } from './pages/turn.js';
import game from './pages/game/controller.js';

const app = express();

app.use(security);
app.use(favicon('public/favicon.ico'));

app.get('/', catchRejections(home));
app.post(
	'/games',
	express.urlencoded({ extended: false }),
	catchRejections(games)
);
app.get('/games/:gameId/choose', catchRejections(choose));
app.get('/games/:gameId', catchRejections(game));
app.post(
	'/games/:gameId/turn',
	express.urlencoded({ extended: false }),
	catchRejections(turn)
);

app.get('/throw-error-in-prod', disallowInProduction);

app.use(catchRejections(notFound));
app.use(catchErrors);

export default app;
