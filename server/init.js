import config from './config.js';
import app from './app.js';
import { logger } from './utils.js';

const { PORT } = config;

app.listen(PORT, () => {
	logger.info({
		event: 'APP_STARTED',
		message: `Listening on port ${PORT}`,
		url: `http://localhost:${PORT}`
	});
});
