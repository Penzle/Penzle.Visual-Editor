const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = (args) => {
	return args.mode === 'production';
};

const outputFolder = (args) => path.resolve(__dirname, 'dist/bundles');
const bundleFilename = (args) => {
	return isProd(args) ? '[name].min.js' : '[name].js';
};

module.exports = (env, args) => ({
	mode: args.mode,
	entry: {
		index: './lib/index.ts',
		'penzle-visual-editor': './lib/styles/tooltip.scss'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	output: {
		path: outputFolder(args),
		filename: bundleFilename(args),
		libraryTarget: 'umd',
		umdNamedDefine: true,
		library: 'penzleVisualEditor'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				include: [path.resolve(__dirname, 'lib')],
				options: {
					configFile: require.resolve('./tsconfig.webpack.json')
				}
			},
			{
				test: /\.css$/, // Add this rule
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				include: [path.resolve(__dirname, 'lib/styles')], // Pointing to your SCSS file location
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			}
		]
	},
	performance: {
		hints: 'warning',
		maxEntrypointSize: 1000000,
		maxAssetSize: 1000000
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	plugins: [
		new BundleAnalyzerPlugin({
			generateStatsFile: true,
			analyzerMode: 'json',
			reportFilename: (isProd(args) ? 'report.min' : 'report') + '.json',
			statsFilename: (isProd(args) ? 'stats.min' : 'stats') + '.json'
		}),
		new MiniCssExtractPlugin({
			filename: isProd(args) ? '[name].min.css' : '[name].css',
			chunkFilename: isProd(args) ? '[id].min.css' : '[id].css'
		})
	]
});
