'use strict';

const { readdirSync, readFileSync, existsSync } = require('fs');
const { join, basename } = require('path');
const { JSDOM } = require('jsdom');

const HTML_DIR = join(__dirname, '../../tmp/typedoc-html');

const KIND_DIRS = {
	types: 'Type Alias',
	interfaces: 'Interface',
	classes: 'Class',
	functions: 'Function'
};

const BASE_URL = '/api/types';

/** Convert a TypeDoc HTML filename (without extension) to a URL slug */
function toSlug(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** Rewrite TypeDoc relative .html links and asset refs to absolute URLs.
 *  Patterns seen:
 *    ../interfaces/PageData.html  → /api/types/interfaces/pagedata/
 *    VisitAnimation.html          → /api/types/interfaces/visitanimation/  (same-kind)
 *    ../assets/icons.svg#icon-x   → /api/types/assets/icons.svg#icon-x
 */
function rewriteLinks(content, kindDir) {
	// Rewrite SVG sprite <use href="../assets/..."> to absolute path
	for (const use of content.querySelectorAll('use[href]')) {
		const href = use.getAttribute('href');
		if (href && href.startsWith('../assets/')) {
			use.setAttribute('href', `${BASE_URL}/${href.slice(3)}`);
		}
	}

	for (const a of content.querySelectorAll('a[href]')) {
		const href = a.getAttribute('href');
		if (!href || href.startsWith('#') || href.startsWith('http')) continue;

		// Cross-kind: ../otherKind/Name.html[#anchor]
		const crossMatch = href.match(/^\.\.\/([^/]+)\/([^#]+)\.html(#.*)?$/);
		if (crossMatch) {
			const [, otherKind, fileName, anchor = ''] = crossMatch;
			a.setAttribute('href', `${BASE_URL}/${otherKind}/${toSlug(fileName)}/${anchor}`);
			continue;
		}

		// Same-kind: Name.html[#anchor]
		const sameMatch = href.match(/^([^./][^#]*)\.html(#.*)?$/);
		if (sameMatch) {
			const [, fileName, anchor = ''] = sameMatch;
			a.setAttribute('href', `${BASE_URL}/${kindDir}/${toSlug(fileName)}/${anchor}`);
		}
	}
}

/** Extract the .col-content from a TypeDoc HTML file and return a record */
function extractFromHtml(filePath, kindDir, kindLabel) {
	const html = readFileSync(filePath, 'utf8');
	const dom = new JSDOM(html);
	const doc = dom.window.document;
	const contents = doc.querySelector('.col-content');
	if (!contents) return null;

	// Pull name from h1 text (TypeDoc renders "Type Alias Foo", "Interface Foo", etc.)
	const h1 = contents.querySelector('h1');
	const h1Text = h1?.textContent?.trim() ?? '';
	const name = h1Text.replace(/^(Type Alias|Interface|Class|Function)\s+/, '').trim();

	const slug = toSlug(name);

	// Plain-text summary from first paragraph in the comment block
	const summary = contents.querySelector('.tsd-comment .tsd-typography p')?.textContent?.trim() ?? '';

	// Source link (GitHub URL)
	const sourceUrl = contents.querySelector('.tsd-sources a')?.href ?? '';

	// Remove the breadcrumb and h1 — Eleventy layout renders its own title
	contents.querySelector('.tsd-page-title')?.remove();

	// Rewrite relative TypeDoc links to absolute Eleventy URLs
	rewriteLinks(contents, kindDir);

	const content = contents.innerHTML;

	return { name, slug, kindDir, kindLabel, summary, sourceUrl, content };
}

module.exports = function () {
	if (!existsSync(HTML_DIR)) {
		console.warn('[types] tmp/typedoc-html not found — run `npm run build:types` first');
		return [];
	}

	const records = [];

	for (const [dir, kindLabel] of Object.entries(KIND_DIRS)) {
		const dirPath = join(HTML_DIR, dir);
		if (!existsSync(dirPath)) continue;
		for (const file of readdirSync(dirPath)) {
			if (!file.endsWith('.html')) continue;
			const record = extractFromHtml(join(dirPath, file), dir, kindLabel);
			if (record) records.push(record);
		}
	}

	return records.sort((a, b) => a.name.localeCompare(b.name));
};
