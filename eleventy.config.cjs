const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const slugify = require('@sindresorhus/slugify');
const tableOfContents = require('eleventy-plugin-toc');
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
	level: 2,
	slugify: (s) => slugify(s)
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
	eleventyConfig.addPlugin(tableOfContents, {
		tags: ['h2', 'h3', 'h4'],
		wrapperClass: 'toc_nav'
	});
	eleventyConfig.addFilter('getPreviousAndNextPage', getPreviousAndNextPage);
	eleventyConfig.addShortcode('feather', renderFeatherIcon);
	eleventyConfig.addShortcode('timestamp', () => Date.now());
	eleventyConfig.addTransform('prepareEventsTable', prepareEventsTable);

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

const repoReadmes = new Map();

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

	if (repoReadmes.has(repoURL)) {
		return repoReadmes.get(repoURL);
	}

	let result = await EleventyFetch(repoURL, {
		duration: '60s',
		type: 'text'
	});

	// Honor <!-- swup-docs-ignore-start -->Ignore me!<!-- swup-docs-ignore-end -->
	result = result.replace(
		/<!--(?:\s+)swup-docs-ignore-start(?:\s+)-->.+?<!--(?:\s+)swup-docs-ignore-end(?:\s+)-->/gis,
		''
	);

	const readmeHTML = customMarkdownIt.render(result);
	repoReadmes.set(repoURL, readmeHTML);

	return readmeHTML;
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
		<div class="buttons page_body_header_buttons">
			<a class="button is-external" target="_blank" href="${repo_link}">
				<span class="button_label">Repo</span>
				<svg role="img" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
			</a>
		</div>
	`.trim();

	const headerHTML = /* html */ `<div class="page_body_header">${repoLinkHTML}<h1>${title}</h1></div>`;
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

/**
 * Injects anchor links into the events table
 * @param {string} content
 * @param {string} file
 * @returns
 */
function prepareEventsTable(content, file) {
	// Bail early if not a HTML file
	if (!file || !file.endsWith('.html')) return content;

	const jsdom = new JSDOM(content);
	const { document } = jsdom.window;

	const tables = document.querySelectorAll('.events-table > table');
	if (!tables.length) return content;

	tables.forEach(table => {
		table.querySelectorAll('tbody > tr > td:first-child > strong').forEach(el => {
			const slug = slugify(el.textContent);
			const heading = document.createElement('h3');
			heading.id = slug;
			const anchor = document.createElement('a');
			anchor.href = `#${slug}`;
			anchor.classList.add('header-anchor');
			anchor.innerHTML = `<span>${el.textContent}</span>`;
			heading.append(anchor);
			el.replaceWith(heading);
		})
	})

	return jsdom.serialize();
}
