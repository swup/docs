export default () => {
	return {
		isOpen: false,
		metaKey: navigator.platform.indexOf('Mac') === 0 ? '⌘' : 'Ctrl+',
		onKeyDown(e) {
			if (e.key === '/') return this.open();
			if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
				this.open();
			}
		},
		open() {
			this.isOpen = true;
			this.$dispatch('search-opened');
		},
		close() {
			this.isOpen = false;
		},
	};
};
