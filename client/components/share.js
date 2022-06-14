const defaultShareData = {
	text: 'Play tic-tac-toe with me?',
	title: 'Hello friend',
	url: ''
};

/**
 * @param {defaultShareData} data
 */
const copyToClipboard = (data) => {
	return navigator.clipboard.writeText(data.url);
};

const supportsShareApi = typeof navigator.share === 'function';
const supportsClipboard = typeof navigator?.clipboard.writeText === 'function';

const shareLink = supportsShareApi
	? navigator.share.bind(navigator)
	: copyToClipboard;
const buttonText = supportsShareApi
	? 'Send this unique link to them!'
	: 'Copy their link to your clipboard';
const resultText = supportsShareApi
	? 'Link shared, nice.'
	: 'Link copied. Next, paste their link into a <abbr title="direct message">DM</abbr> or text it to them.';
let hasAppended = false;

/**
 * @param {HTMLElement} shareEl
 */
const setUpSharing = (shareEl) => {
	const linkEl = shareEl.querySelector('.share__link');
	const messageEl = shareEl.querySelector('.share__message');
	const url = linkEl instanceof HTMLAnchorElement ? linkEl.href : '';
	const resultTextEl = document.createElement('p');
	const buttonEl = document.createElement('button');

	if (messageEl) {
		messageEl.setAttribute('hidden', 'hidden');
	}

	resultTextEl.className = 'share__result';

	/**
	 * @param {Error} error
	 * */
	const handleError = (error) => {
		console.error(error);
		if (messageEl) {
			messageEl.removeAttribute('hidden');
		}
		return 'Something went wrong :(';
	};

	/**
	 * @param {string} result
	 */
	const updateUi = (result) => {
		if (!hasAppended) {
			shareEl.append(resultTextEl);
			hasAppended = true;
		}

		resultTextEl.innerHTML = result;
	};

	const shareData = { ...defaultShareData, url };

	buttonEl.className = 'share__cta';
	buttonEl.textContent = buttonText;
	buttonEl.addEventListener('click', () => {
		shareLink(shareData)
			.then(() => resultText)
			.catch(handleError)
			.then(updateUi);
	});

	shareEl.append(buttonEl);
};

/**
 * @param {object} settings
 * @param {NodeListOf<HTMLElement>} settings.nodeList
 */
export const init = ({ nodeList }) => {
	if (supportsShareApi || supportsClipboard) {
		nodeList.forEach(setUpSharing);
	} else {
		console.info(
			'Skipping creation of a “share” button: this browser doesn’t support the Web Share API (https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API).'
		);
	}
};
