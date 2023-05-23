export default () => {
	return {
		navHTML: '',
		isOpen: false,
		init() {
			this.navHTML = document.querySelector('.nav').innerHTML;
		},
		open() {
			this.isOpen = true;
		},
		close() {
			this.isOpen = false;
		},
	};
};
