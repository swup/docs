import tippy from 'tippy.js';

export default () => {
	return {
		init() {
			tippy(this.$refs.button, {
				content: this.$refs.options.content,
				allowHTML: true,
				interactive: true,
				trigger: 'click'
				// theme: 'light',
			});
		}
	};
};
