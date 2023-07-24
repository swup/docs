module.exports = function () {
	return {
		title: 'swup',
		description:
			'Versatile and extensible page transition library for server-rendered websites',
		url: process.env.SITE_URL || 'https://swup.js.org',
		ga_tracking: 'UA-65615068-6',
		currentVersion: 'v4',
		versions: [
			{
				label: 'swup 4 (current)',
				url: process.env.SITE_URL || 'https://swup.js.org',
				isCurrent: true
			},
			{
				label: 'swup 3',
				url: 'https://v3.swup.js.org',
			},
		]
	};
};
