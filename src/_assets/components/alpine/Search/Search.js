
export default () => {

	return {
		isOpen: false,
		metaKey: navigator.platform.indexOf('Mac') === 0 ? '⌘' : 'Ctrl+',
		init() {

		},
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
		}
	}
}
