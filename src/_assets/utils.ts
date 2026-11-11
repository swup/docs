import type { AlpineComponent } from 'alpinejs';

export function isTouch(): boolean {
	return !window.matchMedia('(hover: hover)').matches;
}

/**
 * Identity helper that types `this` (incl. magics like `$refs`) inside Alpine components
 */
export function defineComponent<T>(component: AlpineComponent<T>): AlpineComponent<T> {
	return component;
}
