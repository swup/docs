export default function () {
	return {
		// Find this function in `head.njk`
		scheme: window.getColorSchemePreference(),
		switchTheme() {
			this.scheme = this.scheme === 'light' ? 'dark' : 'light';
			if (localStorage) localStorage.setItem('color-scheme', this.scheme);
			document.documentElement.classList.remove('dark', 'light');
			document.documentElement.classList.add(this.scheme);
		}
	};
}
