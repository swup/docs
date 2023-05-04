const postcssPresetEnv = require('postcss-preset-env');
const postcssJitProps = require('postcss-jit-props');
const OpenProps = require('open-props');
const path = require('path');

module.exports = {
	plugins: [
		postcssPresetEnv(),
		postcssJitProps({
			files: [
				path.resolve(__dirname, 'node_modules/open-props/open-props.min.css'),
			]
		}),
	]
};
