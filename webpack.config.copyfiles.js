const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, args) => ({
	mode: 'none',
	entry: {
		index: './lib/index.ts'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				include: [path.resolve(__dirname, 'lib')],
				options: {
					configFile: require.resolve('./tsconfig.webpack.json')
				}
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'dist/bundles/penzle-visual-editor.min.css'),
					to: path.resolve(__dirname, 'dist/es6')
				},
				{
					from: path.resolve(__dirname, 'dist/bundles/penzle-visual-editor.min.css'),
					to: path.resolve(__dirname, 'dist/esnext')
				},
				{
					from: path.resolve(__dirname, 'dist/bundles/penzle-visual-editor.min.css'),
					to: path.resolve(__dirname, 'dist/cjs')
				}
			]
		})
	]
});
