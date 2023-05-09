const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const { execSync } = require('child_process');
const Shiki = require('markdown-it-shiki').default;
const EleventyFetch = require('@11ty/eleventy-fetch');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const feather = require('feather-icons');
const { JSDOM } = require('jsdom');

const customMarkdownIt = markdownIt({
	html: true,
	breaks: false,
	linkify: true
});
customMarkdownIt.use(markdownItAnchor);
/**
 * Ready for dark mode
 * @see https://github.com/antfu/markdown-it-shiki#dark-mode
 */
customMarkdownIt.use(Shiki, {
	theme: 'github-dark-dimmed',
	// theme: {
	//   dark: "min-dark",
	//   light: "min-light",
	// },
	highlightLines: true
});

module.exports = function (eleventyConfig) {
	eleventyConfig.addFilter('sortByOrder', sortByOrder);
	eleventyConfig.addFilter('maybeLoadRemoteReadme', maybeLoadRemoteReadme);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addFilter('getPreviousAndNextPage', getPreviousAndNextPage);
	eleventyConfig.addShortcode('feather', renderFeatherIcon);
	eleventyConfig.addShortcode('timestamp', () => Date.now());
	// eleventyConfig.addTransform('dummy', dummyTransform);

	// Assets will be taken care of by WebPack
	eleventyConfig.ignores.add('./src/_assets/**');

	/**
	 * Use or own markdown version, to be able to also use it
	 * further down in maybeLoadRemoteReadme()
	 */
	eleventyConfig.setLibrary('md', customMarkdownIt);

	// Run PageFind after every regeneration
	eleventyConfig.on('eleventy.after', () => {
		execSync(`npx pagefind --source _site`, {
			encoding: 'utf-8'
		});
	});

	return {
		dir: {
			input: 'src',
			includes: '_includes',
			layouts: '_layouts'
		}
	};
};

/**
 * Prepare menu items for usage in the njk templates
 * @param {array} pages   An array of all pages available.
 * @returns
 */
function sortByOrder(pages) {
	return pages.sort((a, b) => {
		const orders = {
			a: a.data.eleventyNavigation?.order || 0,
			b: b.data.eleventyNavigation?.order || 0
		};
		Math.sign(orders.a - orders.b);
	});
}

/**
 * Load remote Readme if repo_link is defined
 */
async function maybeLoadRemoteReadme(content, { repo_link = '', title = '' } = {}) {
	if (repo_link == null) return content;

	repo_link = repo_link
		.trim()
		// Remove leading slash
		.replace(/^\//, '');

	if (!repo_link) return content;

	const url = `${repo_link.replace('github.com', 'raw.githubusercontent.com')}/master/readme.md`;

	let result = await EleventyFetch(url, {
		duration: '60s',
		type: 'text'
	});

	// Replace the first h1 with the title from the local front matter
	result = result.trim().replace(/^#\s.+$/im, `# ${title}`);

	// Honor <!-- swup-docs-ignore-start -->Ignore me!<!-- swup-docs-ignore-end -->
	result = result.replace(
		/<!--(?:\s+)swup-docs-ignore-start(?:\s+)-->.+?<!--(?:\s+)swup-docs-ignore-end(?:\s+)-->/gis,
		''
	);

	return customMarkdownIt.render(result);
}

/**
 * Recoursively flatten an array of objects containing children
 *
 * @see https://stackoverflow.com/a/35272973/586823
 *
 * @param {array} into
 * @param {array|null} node
 * @returns
 */
function flatten(into, node) {
	if (node == null) return into;
	if (Array.isArray(node)) return node.reduce(flatten, into);
	into.push(node);
	return flatten(into, node.children);
}

/**
 * Find the previous and next pages, relative to the current page
 *
 * @param {array} nodes
 * @returns
 */
function getPreviousAndNextPage(nodes) {
	const key = this.ctx.eleventyNavigation.key || this.ctx.title;
	if (!key) return {};
	const navigation = eleventyNavigationPlugin.navigation.find(nodes);
	const pages = flatten([], navigation).filter((page) => page.url.startsWith('/'));
	const index = pages.findIndex((page) => page.key === key);
	return {
		next: pages[index + 1],
		previous: pages[index - 1]
	};
}

/**
 * Render a feather icon using a shortcode
 *
 * @param {string} iconName
 * @returns
 */
function renderFeatherIcon(iconName) {
	if (!iconName) {
		throw new Error('[feather] the iconName must be specified');
	}
	let result = '';
	try {
		result = feather.icons[iconName].toSvg({ 'stroke-linecap': 'square' });
	} catch (e) {
		console.warn(e);
	}
	return result;
}

function dummyTransform(content, file) {
	// Bail early if not a HTML file
	if (!file || !file.endsWith('.html')) return content;

	const jsdom = new JSDOM(content);
	const { document } = jsdom.window;

	// Do something with the document

	return jsdom.serialize();
}
