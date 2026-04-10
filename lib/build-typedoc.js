'use strict';

const { execSync } = require('child_process');
const { mkdirSync, existsSync } = require('fs');
const { join } = require('path');

const ROOT = join(__dirname, '..');
const SRC_DIR = join(ROOT, 'tmp', 'swup-src');
const TYPEDOC = join(ROOT, 'node_modules', '.bin', 'typedoc');

function buildTypes() {
	// Clone or update swup source from GitHub
	if (existsSync(join(SRC_DIR, '.git'))) {
		console.log('[typedoc] Updating swup source...');
		try {
			execSync(`git -C "${SRC_DIR}" pull --ff-only`, { stdio: 'inherit' });
		} catch {
			// detached HEAD or no-op — continue with existing checkout
		}
	} else {
		console.log('[typedoc] Cloning swup source...');
		mkdirSync(join(ROOT, 'tmp'), { recursive: true });
		execSync(`git clone --depth 1 https://github.com/swup/swup.git "${SRC_DIR}"`, {
			stdio: 'inherit'
		});
	}

	// Run TypeDoc (reads typedoc.json in project root)
	console.log('[typedoc] Generating TypeDoc JSON...');
	execSync(`"${TYPEDOC}"`, { stdio: 'inherit', cwd: ROOT });
}

module.exports = { buildTypes };

// Allow running directly: node scripts/build-typedoc.cjs
if (require.main === module) {
	buildTypes();
}

console.log('TypeDoc JSON written to src/_data/typedoc.json');
