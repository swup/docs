import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

export default () => {

	return {
		init() {
			this.initCodeBlocks()
		},
		initCodeBlocks() {
			this.$root.querySelectorAll('.code-block').forEach(block => {
				const copyButton = block.querySelector('.code-block_copy');
				const copyText = block.querySelector('.shiki > code').textContent;

				tippy(copyButton, {
					theme: 'light',
					animation: 'none',
					placement: 'bottom',
					content: (reference) => {
						const title = reference.getAttribute('title')
						reference.removeAttribute('title');
						return title;
					}
				});

				const copiedTip = tippy(copyButton, {
					theme: 'light',
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
		}
	};
};
