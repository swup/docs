// @ts-check

const { execSync } = require('child_process');
const { mkdtempSync, rmSync } = require('fs');
const { tmpdir } = require('os');
const { join } = require('path');

/**
 * Log and exit
 */
function dd(...args) {
	console.log(...args);
	process.exit();
}

/**
 * A cache for default branches
 * @type {Map<string, string>}
 */
const defaultBranches = new Map();

/**
 * Detect the default branch of a GitHub repo by cloning it
 *
 * @param {string} repoURL - HTTPS clone URL of the repo (e.g. https://github.com/user/repo.git)
 * @return {Promise<string>} - Default branch name
 */
function getDefaultBranch(repoURL) {
	repoURL = repoURL.replace(/\/$/, '') + '.git';

	return new Promise((resolve) => {
		const cached = defaultBranches.get(repoURL);
		if (!!cached) {
			resolve(cached);
			return;
		}

		const tmpDir = mkdtempSync(join(tmpdir(), 'repo-'));

		try {
			// Bare, shallow clone for speed
			execSync(`git clone --bare --depth=1 ${repoURL} .`, {
				cwd: tmpDir,
				stdio: 'ignore'
			});

			const output = execSync(`git remote show origin`, {
				cwd: tmpDir
			}).toString();

			const match = output.match(/HEAD branch: (.+)/);
			if (match) {
				defaultBranches.set(repoURL, match[1].trim());
				resolve(match[1].trim());
				return;
			}
		} catch (error) {
			console.error(`Error detecting default branch for ${repoURL}: ${error.message}`);
		} finally {
			rmSync(tmpDir, { recursive: true, force: true });
		}
		defaultBranches.set(repoURL, 'master');
		resolve('master');
	});
}


module.exports = {
	dd,
	getDefaultBranch,
};
