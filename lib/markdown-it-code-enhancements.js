const synonyms = {
	javascript: 'js',
	bash: 'shell',
}

function renderCodeBlock(originalRule) {
	return (...args) => {
		const [tokens, idx] = args;
		const content = tokens[idx].content;
		const info = tokens[idx].info;
		const language = synonyms[info] || info;

		const originalRendered = originalRule(...args);

		if (content.length === 0 || !language) return /* html */`<div class="code-block">${originalRendered}</div>`;

		return /*html*/ `
			<div class="code-block">
				${originalRendered}
				<button class="code-block_copy" type="button" title="Copy">
					<span class="code-block_language">${language}</span>
				</button>
			</div>`;
	};
}

module.exports = (markdownit) => {
	markdownit.renderer.rules.code_block = renderCodeBlock(markdownit.renderer.rules.code_block);
	markdownit.renderer.rules.fence = renderCodeBlock(markdownit.renderer.rules.fence);
};
