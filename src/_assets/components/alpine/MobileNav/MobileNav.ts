import { defineComponent } from '~/utils';

export default () =>
	defineComponent({
		navHTML: '',
		isOpen: false,
		init() {
			this.navHTML = document.querySelector('.nav')?.innerHTML ?? '';
		},
		open() {
			this.isOpen = true;
		},
		close() {
			this.isOpen = false;
		}
	});
