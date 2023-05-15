import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
import focus from '@alpinejs/focus';
Alpine.plugin(persist);
Alpine.plugin(focus);

import Intro from './alpine/Intro/Intro.js';
import Search from './alpine/Search/Search.js';
import ColorThemeSwitcher from './alpine/ColorThemeSwitcher/ColorThemeSwitcher.js';

export default function () {
	window.Alpine = Alpine;
	Alpine.data('Intro', Intro);
	Alpine.data('Search', Search);
	Alpine.data('ColorThemeSwitcher', ColorThemeSwitcher);
	Alpine.start();
}