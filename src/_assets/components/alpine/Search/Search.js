export default () => {
	return {
		isOpen: true,
		metaKey: navigator.platform.indexOf('Mac') === 0 ? '⌘' : 'Ctrl+',
		onKeyDown(e) {
			if (e.key === '/') return this.open();
			if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
				this.open();
			}
		},
		open() {
			this.isOpen = true;
		},
		close() {
			this.isOpen = false;
		},
		onSearchClick(e) {
			if (e.target.matches('.pagefind-ui__result-link')) this.close();
		}
	};
};
