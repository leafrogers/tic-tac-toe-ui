module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:node/recommended',
		'plugin:prettier/recommended'
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'node/exports-style': ['error', 'module.exports'],
		'node/file-extension-in-import': ['error', 'always'],
		'node/no-unpublished-import': 'off',
		'node/no-unpublished-require': 'off',
		'node/prefer-global/buffer': ['error', 'always'],
		'node/prefer-global/console': ['error', 'always'],
		'node/prefer-global/process': ['error', 'always'],
		'node/prefer-global/url-search-params': ['error', 'always'],
		'node/prefer-global/url': ['error', 'always'],
		'node/prefer-promises/dns': 'error',
		'node/prefer-promises/fs': 'error'
	},
	overrides: [
		{
			files: ['**/*.test.js'],
			env: {
				jest: true
			},
			extends: ['plugin:jest/recommended'],
			rules: {
				'jest/no-disabled-tests': 'warn',
				'jest/no-focused-tests': 'error',
				'jest/no-identical-title': 'error',
				'jest/prefer-to-have-length': 'warn',
				'jest/valid-expect': 'error'
			}
		}
	]
};
