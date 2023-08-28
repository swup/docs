// Swup Core
// For debugging unreleased versions:
// import Swup from '../../../_packages/swup/src/index.js';
// For deployment:
import Swup from 'swup';

// Swup Plugins
import SwupA11yPlugin from '@swup/a11y-plugin';
import SwupDebugPlugin from '@swup/debug-plugin';
import SwupFormsPlugin from '@swup/forms-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupBodyClassPlugin from '@swup/body-class-plugin';
import SwupGaPlugin from '@swup/ga-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';

// Swup Themes
import SwupSlideTheme from '@swup/slide-theme';
import SwupFadeTheme from '@swup/fade-theme';
import SwupOverlayTheme from '@swup/overlay-theme';

import { gsap } from 'gsap';

import { isTouch } from '~/utils';

const themes = {
	FadeTheme: SwupFadeTheme,
	SlideTheme: SwupSlideTheme,
	OverlayTheme: SwupOverlayTheme
};
let currentTheme = 'SlideTheme';
let swup;

export default function () {
	swup = new Swup({
		containers: ['#swup', '#breadcrumb'],
		ignoreVisit: (url, { el } = {}) =>
			el?.closest('[data-no-swup]') || url.match(/\.(png|svg)$/i),
		linkToSelf: 'navigate',
		plugins: [
			new SwupDebugPlugin(),

			new SwupA11yPlugin(),

			new SwupFormsPlugin(),
			new SwupScrollPlugin({
				animateScroll: {
					betweenPages: false,
					samePageWithHash: true,
					samePage: true
				},
				markScrollTarget: true,
				offset: () => {
					const navPaddingTop = parseInt(
						getComputedStyle(document.querySelector('.nav .nav_inner')).paddingTop,
						10
					);
					return document.querySelector('.header').offsetHeight + navPaddingTop;
				}
			}),
			new SwupSlideTheme(),
			new SwupBodyClassPlugin(),
			new SwupPreloadPlugin(),
			new SwupGaPlugin({
				gaMeasurementId: window.GA_MEASURE_ID
			})
		]
	});

	window.swup = swup;

	// Adjust nav indicators on visit starts and window resize
	window.addEventListener('resize', positionNavIndicators);
	swup.hooks.on('visit:start', (visit) => adjustNavIndicators(visit.to.url));

	// Set swup theme on form submit and once on page load
	const theme = new URLSearchParams(window.location.search).get('theme');
	setSwupTheme(theme);
	swup.hooks.on('form:submit', (visit, { event }) => {
		if (event?.submitter?.name === 'theme') {
			setSwupTheme(event.submitter.value);
			swup.hooks.once('visit:start', ({ id }) => {
				if (id !== visit.id) return;
				return new Promise((resolve) => setTimeout(resolve, 50));
			});
		}
	});

	swup.hooks.on('page:view', onSwupPageView);
	onSwupPageView();
}

function onSwupPageView() {
	selectCurrentThemeButton();
	prepareExternalLinks();
	adjustNavIndicators(window.location.pathname);
}

/**
 * Select the current theme's button
 */
function selectCurrentThemeButton() {
	const button = document.querySelector(`button[name="theme"][value="${currentTheme}"]`);
	if (!button) return;
	button.classList.add('is-active');
}

/**
 * Set the swup theme, based on it's name
 * @param {string} theme
 * @returns
 */
function setSwupTheme(theme) {
	if (!theme || theme === currentTheme) return;
	if (!themes.hasOwnProperty(theme)) return;
	swup.unuse(currentTheme);
	swup.use(new themes[theme]());
	swup.cache.clear();
	currentTheme = theme;
}

function positionNavIndicator(indicator) {
	const duration = 0.35;
	const ease = 'power4.out';

	const path = indicator.dataset.path || '';
	const wrap = indicator.closest('.nav_inner');
	const link = wrap.querySelector(`a[href="${path}"]`);

	if (link) {
		const wrapRect = wrap.getBoundingClientRect();
		const rect = link.getBoundingClientRect();
		const top = rect.top + rect.height / 2 + wrap.scrollTop - wrapRect.top;
		gsap.to(indicator, { opacity: 1, top, duration, ease });
	} else {
		gsap.to(indicator, { opacity: 0, duration, ease });
	}
}

function positionNavIndicators() {
	document.querySelectorAll('.nav_indicator').forEach((indicator) => {
		positionNavIndicator(indicator);
	});
}

function adjustNavIndicators(path) {
	document.querySelectorAll('.nav_indicator').forEach((indicator) => {
		indicator.dataset.path = path;
		positionNavIndicator(indicator);
	});

	document.querySelectorAll('.nav a').forEach((a) => {
		if (a.origin !== window.location.origin) return;
		a.classList.toggle('is-active', a.pathname === window.location.pathname);
	});
}

function prepareExternalLinks() {
	// Don't do anything on touch devices
	if (isTouch()) return;
	// Open external links in a new tab for very specific contexts, only
	document.querySelectorAll('.nav_list a[href], .main-content ul a[href]').forEach((el) => {
		if (el.origin === window.location.origin) return;
		el.target = '_blank';
	});
}
