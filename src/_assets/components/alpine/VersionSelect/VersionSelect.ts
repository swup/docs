import tippy from 'tippy.js';
import { defineComponent } from '~/utils';

export default () =>
	defineComponent({
		init() {
			tippy(this.$refs.button, {
				content: (this.$refs.options as HTMLTemplateElement).content,
				allowHTML: true,
				interactive: true,
				trigger: 'click'
				// theme: 'light',
			});
		}
	});
