import { assertNoUndefinedValues } from './helpers.js';

describe('Server helpers', () => {
	describe('assertNoUndefinedValues', () => {
		const allDefinedConfigVars = { apple: 1, burrito: 2, croissant: 3 };
		const someUndefinedConfigVars = {
			apple: undefined,
			burrito: 2,
			croissant: undefined
		};

		it('doesn’t throw an error if variables are all defined', () => {
			const callHelper = () => assertNoUndefinedValues(allDefinedConfigVars);
			expect(callHelper).not.toThrow(Error);
		});

		it('throws an error if any variables are undefined', () => {
			const callHelper = () => assertNoUndefinedValues(someUndefinedConfigVars);
			expect(callHelper).toThrow(
				'Expected all config variables to be defined but found the following undefined variables: apple, croissant.'
			);
		});
	});
});
