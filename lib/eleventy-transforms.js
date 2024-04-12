const slugify = require('@sindresorhus/slugify');
const feather = require('feather-icons');
const { JSDOM } = require('jsdom');

/**
 * Convert a string to Titlecase
 */
function toTitleCase(str) {
  if (!str) return ""
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}


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

	const dom = new JSDOM(html);
	const doc = dom.window.document;

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

	return dom.serialize();
}

/**
 * Injects anchor links into tables within every wrapper with
 * the attribute [data-table-with-anchor-links]
 *
 * @param {string} html
 * @param {string} file
 * @returns
 */
function prepareInfoBlocks(html, file) {
	// Bail early if not a HTML file
	if (!file || !file.endsWith('.html')) return html;

	const dom = new JSDOM(html);
	const doc = dom.window.document;

	const types = {
		info: {
			icon: 'info'
		},
		note: {
			icon: 'info'
		},
		tip: {
			icon: 'zap'
		},
		important: {
			icon: 'alert-circle'
		},
		warning: {
			icon: 'alert-triangle'
		},
		caution: {
			icon: 'alert-octagon'
		}
	};

	doc.querySelectorAll('.page_body blockquote').forEach((quote) => {
		if (!quote.innerHTML.trim().startsWith('<p><strong>')) return;
		const firstStrongElement = quote.querySelector('strong:first-child');
		if (!firstStrongElement) return;
		const label = firstStrongElement.textContent
			?.replace(/[^a-z0-9\s]/gi, '')
			.toLowerCase()
			.trim();
		const type = types[label];
		if (!type) return;

		firstStrongElement.textContent = toTitleCase(label);

		const icon = doc.createElement('span');
		icon.classList.add('infoblock_icon');
		icon.innerHTML = feather.icons[type.icon].toSvg();

		const header = doc.createElement('h6');
		header.classList.add('infoblock_header');
		header.append(icon);
		header.append(firstStrongElement);

		const aside = doc.createElement('aside');
		aside.classList.add('infoblock', `is--${label}`);
		aside.innerHTML = `<section class="infoblock_body">${quote.innerHTML}</section>`;
		aside.prepend(header);

		quote.outerHTML = aside.outerHTML;
	});

	return dom.serialize();
}

/**
 * Injects anchor links into tables within every wrapper with
 * the attribute [data-table-with-anchor-links]
 *
 * @param {string} html
 * @param {string} file
 * @returns
 */
function prepareVideos(html, file) {
	// Bail early if not a HTML file
	if (!file || !file.endsWith('.html')) return html;

	const dom = new JSDOM(html);
	const doc = dom.window.document;

	doc.querySelectorAll('[data-video]').forEach((el) => {
		// Get the src
		const src = el.textContent.trim();
		if (!src) return;

		// remove all HTML from the element
		el.innerHTML = '';

		if (el.matches('[data-screencast]')) {
			const screenCastHeader = doc.createElement('div');
			screenCastHeader.classList.add('screencast_header');
			screenCastHeader.innerHTML = `<i class="screencast_header_dots"></i>`;
			el.appendChild(screenCastHeader);
		}

		const video = doc.createElement('video');
		['muted', 'playsinline', 'loop', 'autoplay'].forEach((attr) => {
			video.setAttribute(attr, '');
		});
		video.src = src;
		el.appendChild(video);
	});

	return dom.serialize();
}

module.exports = {
	prepareTablesWithAnchorLinks,
	prepareInfoBlocks,
	prepareVideos
};
