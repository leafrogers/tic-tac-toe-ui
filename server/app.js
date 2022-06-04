import express from 'express';
import config from './config.js';
import { security } from './middleware.js';
import { controller as catchErrors } from './pages/error-catch-all.js';
import { controller as notFound } from './pages/error-not-found.js';

const app = express();

app.use(security);

app.get('/', (_, res) => {
	res.send(config.APP_FRIENDLY_NAME);
});

app.use(notFound);
app.use(catchErrors);

export default app;
