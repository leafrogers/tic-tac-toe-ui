import prettier from 'prettier';
import model from './model.js';
import view from './view.js';

/**
 * @param {string} messyHtmlString
 */
const tidyHtml = (messyHtmlString) => {
	return prettier.format(messyHtmlString, { parser: 'html' });
};

/**
 * @param {import('express').Request} _
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const controller = async (_, res, next) => {
	model
		.fetchData()
		.then((data) => {
			const tidiedHtml = tidyHtml(view(data));
			res.send(tidiedHtml);
		})
		.catch(next);
};

export default controller;
