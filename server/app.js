import express from 'express';
import helmet from 'helmet';
import pokemonController from './pages/pokemon/controller.js';

const app = express();

app.use(helmet());
app.get('/', pokemonController);

export default app;
