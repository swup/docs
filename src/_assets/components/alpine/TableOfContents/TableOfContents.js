export default () => {
	let observer = null;
	return {
		windowWidth: 0,
		windowHeight: 0,
		horizon: 150,
		sections: [],
		async init() {
			await this.$nextTick();
			this.prepareSections();
			this.onResize();
		},
		bindings: {
			"x-on:resize.window": "onResize",
		},
		onResize() {
			// Stop observing if the TOC is not visible
			if (this.$root.getBoundingClientRect().width === 0) {
				this.destroyObserver();
				return;
			}
			if (this.windowDimensionsHaveChanged()) this.initObserver();
		},
		windowDimensionsHaveChanged() {
			const widthChanged = this.windowWidth !== window.innerWidth;
			const heightChanged = this.windowHeight !== window.innerHeight;
			const hasChanged = widthChanged || heightChanged;
			this.windowWidth = window.innerWidth;
			this.windowHeight = window.innerHeight;
			return hasChanged;
		},
		prepareSections() {
			this.sections = [
				...document.querySelector('.page_body').querySelectorAll('h2,h3')
			].reverse();
		},

		initObserver() {
			this.horizon = this.$root.getBoundingClientRect().top + 100;

			if (observer) observer.disconnect();

			const top = -this.horizon;
			const bottom = -window.innerHeight + this.horizon;
			const options = {
				rootMargin: `${top}px 0px ${bottom}px 0px`
			};

			observer = new IntersectionObserver(() => this.updateCurrentSection(), options);

			this.sections.forEach((section) => {
				if (observer) observer.observe(section);
			});
		},
		/**
		 * Runs every time the intersectionObserver callback is being fired.
		 *
		 * This is the best compromise between performance and flexibility
		 *
		 * Tries to find the closest section that is above `this.horizon`.
		 * If no section could be found, falls back to the first section
		 *
		 * @returns void
		 */
		updateCurrentSection() {
			const currentSection = this.sections.find((section) => {
				const rect = section.getBoundingClientRect();
				// ignore invisible sections
				if (!rect.height) return false;
				return rect.top < this.horizon;
			}) || this.sections[this.sections.length - 1];

			this.$root.querySelector('a.is-active')?.classList.remove('is-active');
			this.$root.querySelector(`a[href="#${currentSection.id}"]`)?.classList.add('is-active');
		},
		destroyObserver() {
			if (observer) {
				observer.disconnect();
				observer = null;
			}
		},
		destroy() {
			this.destroyObserver();
		}
	};
};
