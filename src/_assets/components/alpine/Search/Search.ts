import { defineComponent } from '~/utils';

export default () =>
	defineComponent({
		isOpen: false,
		metaKey: navigator.platform.indexOf('Mac') === 0 ? '⌘' : 'Ctrl+',
		onKeyDown(e: KeyboardEvent) {
			if (e.key === '/' || (e.key === 'k' && (e.ctrlKey || e.metaKey))) {
				e.preventDefault();
				this.open();
			}
		},
		open() {
			this.isOpen = true;
			this.$dispatch('search-opened');
		},
		close() {
			this.isOpen = false;
		}
	});
