import app from './app.js';
import { init as initShare } from './components/share.js';

app({
	bootstrapData: window.bootstrapData,
	element: document.getElementById('game')
});

initShare({ nodeList: document.querySelectorAll('.share') });
