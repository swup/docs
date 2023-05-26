// Swup Core
// For debugging unreleased versions:
// import Swup from '../../../_packages/swup/src/index.js';
// For deployment:
import Swup from 'swup';

// Swup Plugins
import SwupA11yPlugin from '@swup/a11y-plugin';
import SwupDebugPlugin from '@swup/debug-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupBodyClassPlugin from '@swup/body-class-plugin';
import SwupGtagPlugin from 'swup-gtag-plugin';
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
		plugins: [
			// new SwupDebugPlugin(),

			new SwupA11yPlugin(),

			new SwupScrollPlugin({
				animateScroll: {
					betweenPages: false,
					samePageWithHash: true,
					samePage: true
				},
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
			new SwupGtagPlugin({
				gaMeasurementId: window.GA_MEASURE_ID
			})
		]
	});

	window.swup = swup;

	swup.on('clickLink', onSwupClickLink);

	document.addEventListener('change', (event) => {
		if (event.target.name === 'theme') changeSwupThemeWithTransition(event.target.value);
	});
	setSwupTheme(new URLSearchParams(window.location.search).get('theme'));

	swup.on('pageView', onSwupPageView);
	swup.on('samePage', emulateTargetPseudoClass);
	swup.on('samePageWithHash', emulateTargetPseudoClass);
	onSwupPageView();
}

function onSwupPageView() {
	selectCurrentThemeCheckbox();
	prepareExternalLinks();
	emulateTargetPseudoClass();
	adjustNavIndicators(window.location.pathname);
}

function onSwupClickLink(e) {
	adjustNavIndicators(e.target.pathname);
}

/**
 * Adds an attribute to the element that matches the current hash, if there is one
 */
function emulateTargetPseudoClass() {
	const attribute = 'data-hash-target';
	requestAnimationFrame(() => {
		const current = document.querySelector(`[${attribute}]`);
		if (current) current.removeAttribute(attribute);
		const element = window.swup.getAnchorElement(window.location.hash);
		if (element) element.setAttribute(attribute, '');
	})
}

/**
 * Select the current theme's checkbox
 */
function selectCurrentThemeCheckbox() {
	const radio = document.querySelector(`input[name="theme"][value="${currentTheme}"]`);
	if (!radio) return;
	radio.checked = true;
	radio.closest('.button').classList.add('is-active');
}

/**
 * Changes the current theme and reloads the page with a related query param.
 * This will show of the new theme's transition immediately
 *
 * @param {string} theme
 */
function changeSwupThemeWithTransition(theme) {
	setSwupTheme(theme);

	const url = new URL(window.location.href);
	url.searchParams.set('theme', theme);
	setTimeout(() => swup.loadPage({ url }), 0);
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
	swup.cache.empty();
	currentTheme = theme;
}

function adjustNavIndicators(path) {
	document.querySelectorAll('.nav_indicator').forEach((indicator) => {
		const wrap = indicator.closest('.nav_inner');
		const activeLink = wrap.querySelector(`a[href="${path}"]`);
		if (!activeLink) return;

		const wrapRect = wrap.getBoundingClientRect();
		const rect = activeLink.getBoundingClientRect();
		const top = rect.top + rect.height / 2 + wrap.scrollTop - wrapRect.top;

		gsap.to(indicator, {
			top,
			ease: 'power4.out',
			duration: 0.35
		});
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
