const slugify = require('@sindresorhus/slugify');
const { parse } = require('node-html-parser');

/**
 * Injects anchor links into tables within every wrapper with
 * the attribute [data-table-with-anchor-links]
 *
 * @param {string} html
 * @param {string} file
 * @returns
 */
function prepareTablesWithAnchorLinks(html, file) {
	// Bail early if not a HTML file
	if (!file || !file.endsWith('.html')) return html;

	const doc = parse(html);

	const containers = doc.querySelectorAll('[data-table-with-anchor-links]');
	// Bail early if the current page doesn't contain any matching elements
	if (!containers.length) return html;

	containers.forEach((container) => {
		// Make all first tds linkable
		// @see https://github.com/valeriangalliat/markdown-it-anchor#parsing-headings-from-html-blocks
		for (const el of container.querySelectorAll('table tbody > tr > td:first-child')) {
			const slug = el.getAttribute('id') || slugify(el.textContent);
			el.closest('tr').setAttribute('id', slug);
			el.innerHTML = `<a class="header-anchor" href="#${slug}"><span>${el.innerHTML}</span></a>`;
		}
	});

	return doc.toString();
}

module.exports = {
	prepareTablesWithAnchorLinks
};
