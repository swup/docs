import { defineConfig, devices } from '@playwright/test';

/**
 * Browser smoke tests. Expects the built site to be served on the baseURL,
 * see the `test` script in package.json
 */
export default defineConfig({
	testDir: './tests',
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? 'github' : 'list',
	use: {
		baseURL: 'http://127.0.0.1:7987',
		trace: 'on-first-retry'
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
});
