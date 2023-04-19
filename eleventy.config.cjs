const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const { execSync } = require('child_process');
const Shiki = require('markdown-it-shiki').default;
const EleventyFetch = require('@11ty/eleventy-fetch');

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
	eleventyConfig.addFilter('prepareMenuItems', prepareMenuItems);
	eleventyConfig.addFilter('maybeLoadContentSource', maybeLoadContentSource);

	// Assets will be taken care of by WebPack
	eleventyConfig.ignores.add('./src/_assets/**');

	/**
	 * Use or own markdown version, to be able to also use it
	 * further down in maybeLoadContentSource()
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

function getMarkdownItInstance() {
	return;
}

/**
 * Prepare menu items for usage in the njk templates
 * @param {array} pages   An array of all pages available.
 * @returns
 */
function prepareMenuItems(pages, { parentTitle = null } = {}) {
	return (
		pages
			// Respect `nav_order`
			.sort((a, b) => Math.sign(a.data.nav_order - b.data.nav_order))
			// Respect `nav_exclude`
			.filter((page) => !page.data.nav_exclude)
			// Filter for matching parentTitle if set
			.filter((page) => !parentTitle || parentTitle === page.data.parent)
	);
}

/**
 * Load remote Source if url is defined
 * @param {local content (fallback)} content
 * @returns
 */
async function maybeLoadContentSource(content, { url = '', title = '' } = {}) {
	if (url == null) return content;

	url = url.trim();
	if (!url) return content;

	const result = await EleventyFetch(url, {
		duration: '60s',
		type: 'text'
	});
	const rendered = customMarkdownIt.render(result).trim();
	// Remove "Swup" from possible h1. We are already on the swup website :)
	return rendered.replace(/(^<h1.+?>).+?(<\/h1>)/i, `$1${title}$2`);
}
