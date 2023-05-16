import tippy from 'tippy.js';

export default () => {

	return {
		init() {
			this.initHeadlineLinks();
			this.initCodeBlocks();
		},
		initCodeBlocks() {
			this.$root.querySelectorAll('.code-block').forEach(block => {
				const copyButton = block.querySelector('.code-block_copy');
				const copyText = block.querySelector('.shiki > code').textContent;

				tippy(copyButton, {
					animation: 'none',
					placement: 'bottom',
					content: 'Copy'
				});

				const copiedTip = tippy(copyButton, {
					animation: 'none',
					placement: 'bottom',
					trigger: 'click',
					content: 'Copied!',
					onShow() {
						setTimeout(copiedTip.hide, 2000)
					}
				});

				copyButton.addEventListener('click', e => navigator.clipboard.writeText(copyText))
			})
		},
		initHeadlineLinks() {
			document.querySelectorAll('.page_body .header-anchor').forEach((anchor) => {
				const copiedTip = tippy(anchor, {
					placement: 'right',
					trigger: 'click',
					content: 'Copied URL',
					offset: [0, 15],
					onShow() {
						setTimeout(copiedTip.hide, 2000)
					}
				});
				anchor.addEventListener('click', function (event) {
					navigator.clipboard.writeText(anchor.href);
				});
			});
		}
	};
};
