const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const { execSync } = require('child_process');
const Shiki = require('markdown-it-shiki').default;
const EleventyFetch = require('@11ty/eleventy-fetch');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const feather = require('feather-icons');
const { JSDOM } = require('jsdom');
const MarkdownItCodeEnhancements = require('./lib/markdown-it-code-enhancements');
const customMarkdownIt = markdownIt({
	html: true,
	breaks: false,
	linkify: true
});
/**
 * Anchors for headings lower then H1 (H2, H3, ...)
 * @see https://github.com/valeriangalliat/markdown-it-anchor
 */
customMarkdownIt.use(markdownItAnchor, {
	permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true }),
	level: 2
});
/**
 * Code Highligting
 * @see https://github.com/antfu/markdown-it-shiki
 */
customMarkdownIt.use(Shiki, {
	theme: 'github-dark',
	highlightLines: true
});
customMarkdownIt.use(MarkdownItCodeEnhancements);

module.exports = function (eleventyConfig) {
	eleventyConfig.addFilter('sortByOrder', sortByOrder);
	eleventyConfig.addFilter('prepareContent', prepareContent);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addFilter('getPreviousAndNextPage', getPreviousAndNextPage);
	eleventyConfig.addShortcode('feather', renderFeatherIcon);
	eleventyConfig.addShortcode('timestamp', () => Date.now());
	eleventyConfig.addShortcode('bodyClass', renderBodyClass);
	eleventyConfig.addTransform('main-heading', transformMainHeading);

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
 *
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
 * Prepare the content of a page
 *
 * @param {string} content
 * @returns {string}
 */
async function prepareContent(content) {

	content = await maybeLoadRemoteReadme(content, this.ctx);

	content = modifyMainTitle(content, this.ctx);

	return content;
}

/**
 * Load remote Readme if repo_link is defined
 *
 * @param {string} content
 * @param {object} ctx The current context
 * @returns {Promise<string>}
 */
async function maybeLoadRemoteReadme(content, ctx) {
	let { repo_link } = ctx;

	if (repo_link == null) return content;

	repo_link = repo_link
		.trim()
		// Remove possible leading slash
		.replace(/^\//, '');

	if (!repo_link) return content;

	const repoURL = `${repo_link.replace(
		'github.com',
		'raw.githubusercontent.com'
	)}/master/readme.md`;

	let result = await EleventyFetch(repoURL, {
		duration: '60s',
		type: 'text'
	});

	// Honor <!-- swup-docs-ignore-start -->Ignore me!<!-- swup-docs-ignore-end -->
	result = result.replace(
		/<!--(?:\s+)swup-docs-ignore-start(?:\s+)-->.+?<!--(?:\s+)swup-docs-ignore-end(?:\s+)-->/gis,
		''
	);

	return customMarkdownIt.render(result);
}

/**
 * Modifies the first H1 of a rendered page
 *
 * @param {string} content
 * @param {object} ctx The current context
 * @returns {string}
 */
function modifyMainTitle(content, ctx) {
	const { repo_link, title } = ctx;

	const repoLinkHTML = !repo_link
		? ''
		: /* html */ `
		<div class="buttons">
			<a class="button is-external" target="_blank" href="${repo_link}"><span class="button_label">Repo</span></a>
		</div>
	`.trim();

	const headerHTML = /* html */ `<div class="page_body_header"><h1>${title}</h1>${repoLinkHTML}</div>`;
	return content.trim().replace(/^<h1.*?>(.+?)<\/h1>/, headerHTML);
}

/**
 * Recoursively flatten an array of objects containing children
 *
 * @see https://stackoverflow.com/a/35272973/586823
 *
 * @param {array} into
 * @param {array|null} node
 * @returns {array}
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
 * @returns {object}
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
 * @returns {string}
 */
function renderFeatherIcon(iconName) {
	if (!iconName) {
		throw new Error('[feather] the iconName must be specified');
	}
	let result = '';
	try {
		result = feather.icons[iconName].toSvg({ 'stroke-linecap': 'round' });
	} catch (e) {
		console.warn(e);
	}
	return result;
}

function renderBodyClass() {
	console.log(this);
}

function transformMainHeading(content, file) {
	// Bail early if not a HTML file
	if (!file || !file.endsWith('.html')) return content;

	const jsdom = new JSDOM(content);
	const { document } = jsdom.window;

	// Unwrap the anchor link in the first H1
	const h1 = document.querySelector('.page_body > h1:first-of-type');
	if (!h1) return content;
	h1.innerHTML = h1.textContent;

	return jsdom.serialize();
}
