// Globals defined in `head.njk` or exposed for debugging
interface Window {
	Alpine: typeof import('alpinejs').default;
	swup: import('swup').default;
	GA_MEASURE_ID: string;
	getColorSchemePreference(): 'light' | 'dark';
}

// Stylesheets are handled by webpack
declare module '*.scss';

// @swup/ga-plugin doesn't ship types
declare module '@swup/ga-plugin' {
	import type { Plugin } from 'swup';
	const SwupGaPlugin: new (options?: { gaMeasurementId?: string | null }) => Plugin;
	export default SwupGaPlugin;
}
