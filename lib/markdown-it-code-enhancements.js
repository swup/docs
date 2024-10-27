const { encode } = require('html-entities');

const synonyms = {
	javascript: 'js',
	bash: 'shell',
}

function renderCodeBlockRaw(code) {
	return /* html */`<div class="code-block">${code}</div>`;
}

function renderCodeBlockWithLanguage(code, language) {
	return /*html*/ `
		<div class="code-block">
			${code}
			<button class="code-block_copy" type="button" title="Copy">
				<span class="code-block_language">${language}</span>
			</button>
		</div>`;
}

function renderGlitchFrame(code) {
	const isSrc = (line) => line.startsWith('https://');
	const lines = code.trim().split(/\r?\n/);
	const srcLine = lines.find(isSrc);
	if (!srcLine) {
		return renderCodeBlockRaw(code);
	}
	const src = srcLine.trim();
	const linkSlug = (src.match(/^https:\/\/([\w-]+?)\.glitch\.me/i) || [])[1] || '';
	const link = `https://glitch.com/edit/#!/${linkSlug}`;
	const description = lines.filter((line) => !isSrc(line)).join(' ').trim();
	return /*html*/ `
		<div class="glitch" data-src="${src}" data-title="${encode(description)}">
			<div class="glitch__frame">
  			<iframe src="${src}" loading="lazy" title="${encode(description)}" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
				<p class="glitch__link">
					<a href="${link}" class="glitch__pill" target="_blank">
						Edit on Glitch
					</a>
				</p>
			</div>
		</div>`;
}

function renderCodeBlock(originalRule) {
	return (...args) => {
		const [tokens, idx] = args;
		const content = tokens[idx].content;
		const info = tokens[idx].info;
		const language = synonyms[info] || info || 'unknown';

		if (language === 'glitch') {
			return renderGlitchFrame(content);
		}

		let code = originalRule(...args);
		// remove empty last lines
		code = code.replace(/<span class="line"><\/span>\s*$/, '');
		if (content.length === 0) {
			return renderCodeBlockRaw(code);
		} else {
			return renderCodeBlockWithLanguage(code, language);
		}
	};
}

module.exports = (markdownit) => {
	markdownit.renderer.rules.code_block = renderCodeBlock(markdownit.renderer.rules.code_block);
	markdownit.renderer.rules.fence = renderCodeBlock(markdownit.renderer.rules.fence);
};
