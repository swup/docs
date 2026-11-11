import tippy from 'tippy.js';
import { defineComponent, isTouch } from '~/utils';

export default () =>
	defineComponent({
		init() {
			this.initHeadlineLinks();
			this.initCodeBlocks();
		},
		initCodeBlocks() {
			this.$root.querySelectorAll('.code-block').forEach((block) => {
				const copyButton = block.querySelector<HTMLElement>('.code-block_copy')!;
				const copyText = block.querySelector('.shiki > code')?.textContent ?? '';

				if (!isTouch()) {
					tippy(copyButton, {
						animation: 'none',
						placement: 'bottom',
						content: 'Copy'
					});
				}

				const copiedTip = tippy(copyButton, {
					animation: 'none',
					placement: 'bottom',
					trigger: 'click',
					content: 'Copied!',
					onShow() {
						setTimeout(copiedTip.hide, 2000);
					}
				});

				copyButton.addEventListener('click', () => navigator.clipboard.writeText(copyText));
			});
		},
		initHeadlineLinks() {
			document
				.querySelectorAll<HTMLAnchorElement>('.page_body .header-anchor')
				.forEach((anchor) => {
					const target = anchor.querySelector('span')!;

					const copiedTip = tippy(target, {
						placement: 'bottom',
						trigger: 'click',
						content: 'URL copied!',
						offset: [0, 10],
						triggerTarget: anchor,
						arrow: true,
						onShow() {
							setTimeout(copiedTip.hide, 2000);
						}
					});
					anchor.addEventListener('click', () =>
						navigator.clipboard.writeText(anchor.href)
					);
				});
		}
	});
