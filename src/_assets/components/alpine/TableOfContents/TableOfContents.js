export default () => {
	return {
		wrap: null,
		lastChild: null,
		horizon: 150,
		sections: [],
		async init() {
			await this.$nextTick();
			this.wrap = document.querySelector('.page_body');
			this.updateHorizon();
			this.prepareSections();
			this.markCurrentSection();
		},
		bindings: {
			'x-on:resize.window': 'updateHorizon',
			'x-on:scroll.window.throttle.10ms': 'markCurrentSection'
		},
		updateHorizon() {
			this.horizon = this.$root.getBoundingClientRect().top + 50;
		},
		// Store a reference to all sections in reversed order
		prepareSections() {
			this.sections = [...this.wrap.querySelectorAll('h2[id],h3[id],h4[id]')].reverse();
		},
		/**
		 * Marks the current section with the class "is-active"
		 * @returns void
		 */
		markCurrentSection() {
			const currentSection = this.getCurrentSection();
			if (!currentSection) return;
			this.$root.querySelector('a.is-active')?.classList.remove('is-active');
			this.$root.querySelector(`a[href="#${currentSection.id}"]`)?.classList.add('is-active');
		},
		/**
		 * Tries to find the current section. The sections are reversed (from bottom to top), to
		 * make the whole process more performant.
		 * @returns HTMLElement
		 */
		getCurrentSection() {
			const firstSection = this.sections[this.sections.length - 1];
			const lastSection = this.sections[0];

			// If the bottom of the document is reached, mark the last section as the active one
			if (window.scrollY >= document.documentElement.offsetHeight - window.innerHeight - 5) {
				return lastSection;
			}
			// Find the first section that is above the horizon.
			// If no section can be found, return the first section
			return (
				this.sections.find((section) => {
					const rect = section.getBoundingClientRect();
					// ignore invisible sections
					if (!rect.height) return false;
					return rect.top < this.horizon;
				}) || firstSection
			);
		}
	};
};
