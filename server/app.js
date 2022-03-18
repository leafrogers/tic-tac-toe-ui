import express from 'express';
import helmet from 'helmet';
import catchErrors from './pages/error-catch-all/controller.js';
import notFound from './pages/error-not-found/controller.js';

const app = express();

app.use(helmet());

app.use(notFound);
app.use(catchErrors);

export default app;
