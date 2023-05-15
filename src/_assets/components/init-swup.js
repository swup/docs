// Swup Core
import Swup from 'swup';
// Swup Plugins
import SwupDebugPlugin from '@swup/debug-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupBodyClassPlugin from '@swup/body-class-plugin';
import SwupGtagPlugin from 'swup-gtag-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';

// Swup Themes
import SwupSlideTheme from '@swup/slide-theme';
import SwupFadeTheme from '@swup/fade-theme';
import SwupOverlayTheme from '@swup/overlay-theme';

const themes = {
	FadeTheme: SwupFadeTheme,
	SlideTheme: SwupSlideTheme,
	OverlayTheme: SwupOverlayTheme
};
let currentTheme = 'SlideTheme';

export default function() {
	var swup = new Swup({
		containers: ['#swup', '#breadcrumb'],
		plugins: [
			// new SwupDebugPlugin(),

			new SwupScrollPlugin({
				animateScroll: {
					betweenPages: false,
					samePageWithHash: true,
					samePage: true
				}
			}),
			new SwupSlideTheme(),
			new SwupBodyClassPlugin(),
			new SwupPreloadPlugin(),
			new SwupGtagPlugin({
				gaMeasurementId: window.GA_MEASURE_ID
			})
		]
	});

	window.swup = swup;

	document.addEventListener('change', function (event) {
		if (event.target.name !== 'theme') return;

		swup.unuse(currentTheme);
		swup.use(new themes[event.target.value]());
		currentTheme = event.target.value;
		swup.cache.empty();

	});

	swup.on('pageView', onSwupPageView);
	onSwupPageView();

	swup.on('clickLink', onSwupClickLink);
}

function onSwupPageView() {
	checkTheme();
	addHeadlineLinks();
	prepareExternalLinks();
	adjustActiveMenuItem(window.location.pathname);
}

function onSwupClickLink(e) {
	adjustActiveMenuItem(e.target.pathname);
}

function checkTheme() {
	if (document.querySelector('input[name="theme"]')) {
		document.querySelector(`input[name="theme"][value="${currentTheme}"]`).checked = true;
	}
}

function addHeadlineLinks() {
	const mainContent = document.querySelector('#main-content');
	if (!mainContent) return;
	mainContent
		.querySelectorAll('h2, h3, h4, h5, h6')
		.forEach(function (element) {
			if (!element.matches('[id]')) return;
			const anchor = document.createElement('a');
			const link = window.location.origin + window.location.pathname + '#' + element.id;

			anchor.href = link;
			anchor.className = 'headline-anchor';
			anchor.innerHTML = '#';

			anchor.addEventListener('click', function (event) {
				navigator.clipboard.writeText(link);
			});

			element.appendChild(anchor);
		});
}

function isTouch() {
	return !window.matchMedia('(hover: hover)').matches;
}

function adjustActiveMenuItem(path) {

	const navs = document.querySelectorAll('.nav .nav_inner');
	navs.forEach(wrap => {
		const activeLink = wrap.querySelector(`.nav a[href="${path}"]`);
		if (!activeLink) return;

		const wrapRect = wrap.getBoundingClientRect();
		const rect = activeLink.getBoundingClientRect();
		const top = rect.top + rect.height / 2 + wrap.scrollTop - wrapRect.top;
		const indicator = document.querySelector('.nav_indicator');
		indicator.style.setProperty('--offset-y', `${top}px`);
	})

	document.querySelectorAll('.mobile-nav a').forEach(a => {
		if (a.origin !== window.location.origin) return;
		a.classList.toggle('is-active', a.pathname === window.location.pathname);
	})
}

function prepareExternalLinks() {
	// Don't do anything on touch devices
	if (isTouch()) return;
	// Open external links in a new tab for very specific contexts, only
	document
		.querySelectorAll('.nav_list a[href], .main-content ul a[href]')
		.forEach((el) => {
			if (el.origin === window.location.origin) return;
			el.target = '_blank';
		});
}
