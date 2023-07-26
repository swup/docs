export default () => {
	return {
		init() {
			const src = this.$root.textContent.trim();
			if (!src) return;
			const video = `<video muted playsinline loop autoplay controls src="${src}"></video>`;
			this.$root.innerHTML = video;
		},
	}
};
