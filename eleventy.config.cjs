const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const { execSync } = require('child_process');
const Shiki = require('markdown-it-shiki').default;
const EleventyFetch = require('@11ty/eleventy-fetch');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

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
	eleventyConfig.addFilter('maybeLoadRemoteReadme', maybeLoadRemoteReadme);
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

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
			// Respect `nav_exclude`
			.filter((page) => !page.data.nav_exclude)
			// Filter for matching parentTitle if set
			.filter((page) => !parentTitle || parentTitle === page.data.parent)
			// Respect `nav_order`
			.sort((a, b) => Math.sign(a.data.nav_order - b.data.nav_order))
	);
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
	result = result.trim().replace(/^#\s.+$/mi, `# ${title}`);

	// Honor <!-- swup-docs-ignore-start -->Ignore me!<!-- swup-docs-ignore-end -->
	result = result.replace(/<!--(?:\s+)swup-docs-ignore-start(?:\s+)-->.+?<!--(?:\s+)swup-docs-ignore-end(?:\s+)-->/gis, '');

	return customMarkdownIt.render(result);
}
