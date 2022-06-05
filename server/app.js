import express from 'express';
import { security } from './middleware.js';
import { catchRejections } from './helpers.js';

import { controller as catchErrors } from './pages/error-catch-all.js';
import { controller as notFound } from './pages/error-not-found.js';

const app = express();

app.use(security);

app.use(catchRejections(notFound));
app.use(catchErrors);

export default app;
