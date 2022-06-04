import express from 'express';
import catchErrors from './pages/error-catch-all/controller.js';
import notFound from './pages/error-not-found/controller.js';
import { security } from './middleware.js';

const app = express();

app.use(security);

app.use(notFound);
app.use(catchErrors);

export default app;
