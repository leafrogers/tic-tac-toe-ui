import express from 'express';
import helmet from 'helmet';
import catchErrors from './pages/error-catch-all/controller.js';
import notFound from './pages/error-not-found/controller.js';
import pokemonController from './pages/pokemon/controller.js';

const app = express();

app.use(helmet());

app.get('/', pokemonController);

app.use(notFound);
app.use(catchErrors);

export default app;
