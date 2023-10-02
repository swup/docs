export default () => {
	const postsPerPage = 10;

	return {
		term: '',
		results: [],
		isSearching: false,
		init() {
			this.$watch('term', this.search.bind(this));
			Alpine.effect(async () => {
				if (!this.isOpen) return;
				await this.$nextTick();
				this.$refs.input.focus();
			})
		},
		reset() {
			this.results = [];
			this.isSearching = false;
			this.term = '';
		},
		async search(term) {
			if (term.trim().length < 2) {
				this.results = [];
				this.isSearching = false;
				return;
			}
			this.isSearching = true;
			const pagefind = await import(/* webpackIgnore: true */ '/pagefind/pagefind.js');
			const search = await pagefind.search(term);
			const results = await Promise.all(
				search.results.slice(0, postsPerPage).map((r) => r.data())
			);
			this.results = results;
			this.isSearching = false;
		}
	};
};
