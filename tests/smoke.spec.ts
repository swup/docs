import { test as base, expect, type Page } from '@playwright/test';

/** Markers set by the tests on the page's window */
declare global {
	interface Window {
		noReload?: boolean;
		pageViews: number;
	}
}

/**
 * Fail on uncaught JavaScript errors and keep the tests hermetic
 * by blocking third-party requests (analytics etc.)
 */
const test = base.extend({
	page: async ({ page, baseURL }, use) => {
		const errors: string[] = [];
		page.on('pageerror', (error) => errors.push(error.message));

		const { origin } = new URL(baseURL!);
		await page.route(
			(url) => url.origin !== origin,
			(route) => route.abort()
		);

		await use(page);

		expect(errors, 'Uncaught JavaScript errors').toEqual([]);
	}
});

/**
 * Load a page and prepare it for checking swup navigation:
 * - count swup page views
 * - set a marker on window that is lost on a full page reload
 */
async function load(page: Page, path: string) {
	await page.goto(path);
	await page.waitForFunction(() => window.swup);
	await page.evaluate(() => {
		window.noReload = true;
		window.pageViews = 0;
		window.swup.hooks.on('page:view', () => window.pageViews++);
	});
}

/**
 * Wait for swup to finish the nth page view since load(),
 * and make sure it didn't happen through a full page reload
 */
async function expectSwupPageView(page: Page, count: number) {
	await page.waitForFunction((count) => !window.noReload || window.pageViews === count, count);
	expect(await page.evaluate(() => window.noReload), 'No full page reload').toBe(true);
	await expect(page.locator('html')).not.toHaveClass(/is-(changing|animating)/);
}

test('initial load', async ({ page }) => {
	await load(page, '/');
	await expect(page).toHaveTitle(/^swup/);
	await expect(page.locator('#swup')).toBeVisible();
});

/** The intro on the homepage covers the nav, so use its "Docs" button */
const homepageDocsLink = '#swup .button[href="/getting-started/"]';

test('navigates with swup', async ({ page }) => {
	await load(page, '/');

	await page.locator(homepageDocsLink).click();
	await expectSwupPageView(page, 1);

	await expect(page).toHaveURL('/getting-started/');
	await expect(page).toHaveTitle(/^Getting Started/);
	await expect(page.locator('#swup h1')).toHaveText('Getting Started');
});

test('navigates back with swup', async ({ page }) => {
	await load(page, '/');

	await page.locator(homepageDocsLink).click();
	await expectSwupPageView(page, 1);

	await page.goBack();
	await expectSwupPageView(page, 2);

	await expect(page).toHaveURL('/');
	await expect(page).toHaveTitle(/^swup/);
});

for (const theme of ['FadeTheme', 'OverlayTheme', 'SlideTheme']) {
	test(`switches to ${theme}`, async ({ page }) => {
		await load(page, '/themes/');

		// Start with a different theme, so that every switch is an actual switch
		if (theme === 'SlideTheme') {
			await page.locator('button[name="theme"][value="FadeTheme"]').click();
			await expectSwupPageView(page, 1);
			await page.evaluate(() => (window.pageViews = 0));
		}

		await page.locator(`button[name="theme"][value="${theme}"]`).click();
		await expectSwupPageView(page, 1);

		await expect(page).toHaveURL(`/themes/?theme=${theme}`);
		await expect(page.locator(`button[name="theme"][value="${theme}"]`)).toHaveClass(
			/is-active/
		);

		const themes = await page.evaluate(() =>
			window.swup.plugins.map(({ name }) => name).filter((name) => name.endsWith('Theme'))
		);
		expect(themes).toEqual([`Swup${theme}`]);

		// Navigate with the new theme
		await page.locator('.nav--desktop a[href="/getting-started/"]').click();
		await expectSwupPageView(page, 2);
		await expect(page).toHaveURL('/getting-started/');
	});
}
