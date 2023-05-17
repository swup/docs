export default () => {
	return {
		navHTML: '',
		isOpen: false,
		init() {
			this.navHTML = document.querySelector('.nav').innerHTML;
		},
		onKeyDown(e) {
			if (e.key === '/') return this.open();
		},
		open() {
			this.isOpen = true;
		},
		close() {
			this.isOpen = false;
		},
	};
};
