import express from 'express';
import { disallowInProduction, security } from './middleware.js';
import { catchRejections } from './helpers.js';

import { controller as catchErrors } from './pages/error-catch-all.js';
import { controller as notFound } from './pages/error-not-found.js';

const app = express();

app.use(security);

app.get('/throw-error-in-prod', disallowInProduction);

app.use(catchRejections(notFound));
app.use(catchErrors);

export default app;
