/**
 * Imports
 */
import path from 'path';
import { fileURLToPath } from 'url';
import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist';
import browserslist from 'browserslist';

/**
 * Settings
 */
const settings = {
	entryPoints: {
		docs: ['./src/_assets/docs.js']
	},
	outputPath: './_site/assets',
	target: resolveToEsbuildTarget(browserslist(), {
		printUnknownTargets: false
	})
};

/**
 * Setup the config
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let config = {
	entry: settings.entryPoints,
	output: {
		publicPath: 'auto',
		path: path.resolve(__dirname, settings.outputPath),
		clean: true,
		filename: '[name].js',
		assetModuleFilename: '[name].[ext][query]',
		chunkFilename: '[name].chunk.js?v=[contenthash]'
	},
	module: {
		parser: {
			javascript: {
				importMeta: false
			}
		},
		rules: [
			{
				test: /\.(js|ts)x?$/,
				loader: 'esbuild-loader',
				// exclude: /(node_modules)/,
				options: {
					loader: 'ts',
					target: settings.target
				}
			},
			{
				test: /\.(scss|css)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				type: 'asset/resource'
			},
			{
				test: /.(ttf|otf|eot|woff(2)?)$/,
				type: 'asset/resource',
				generator: {
					filename: '[name][ext]'
				}
			},
			{
				test: /\/static\//,
				type: 'asset/resource',
				generator: {
					filename: 'static/[name][ext]'
				}
			}
		]
	},
	resolve: {
		extensionAlias: {
			'.js': ['.ts', '.js'],
			'.mjs': ['.mts', '.mjs']
		},
		alias: {
			'~': path.resolve(__dirname, './src/_assets/')
		}
	},
	optimization: {
		usedExports: true,
		minimizer: [
			new ESBuildMinifyPlugin({
				target: settings.target
			})
		]
	},
	plugins: [
		new RemoveEmptyScriptsPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new CopyPlugin({
			patterns: [{ from: './src/_assets/images', to: 'images' }]
		})
	]
};

/**
 * Adjust the config depending on the --mode
 * @see https://webpack.js.org/configuration/mode/
 * @param {object} env  set via --env flag
 * @param {object} argv
 * @returns
 */
export default (env, argv) => {
	config.mode = argv.mode;

	if (argv.mode === 'development') {
		config.devtool = 'cheap-source-map';
		config.plugins.push(
			new LiveReloadPlugin({
				useSourceHash: true,
				appendScriptTag: true
			})
		);
	}

	return config;
};
