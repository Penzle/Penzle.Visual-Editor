module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json'
	},
	plugins: ['@typescript-eslint', 'promise', 'prettier'],
	extends: [
		'eslint:recommended',
		'airbnb-base',
		'airbnb-typescript/base',
		'plugin:@typescript-eslint/recommended',
		'plugin:promise/recommended',
		'plugin:prettier/recommended'
	],
	rules: {
		'class-methods-use-this': 'off',
		'import/prefer-default-export': 'off',
		'import/no-default-export': 'off'
	}
};
