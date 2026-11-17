import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
import focus from '@alpinejs/focus';
Alpine.plugin(persist);
Alpine.plugin(focus);

import Intro from './alpine/Intro/Intro.js';
import Search from './alpine/Search/Search.js';
import Page from './alpine/Page/Page.js';
import ColorSchemeSwitcher from './alpine/ColorSchemeSwitcher/ColorSchemeSwitcher.js';
import SwupThemeSwitcher from './alpine/SwupThemeSwitcher/SwupThemeSwitcher.js';
import MobileNav from './alpine/MobileNav/MobileNav.js';
import SearchUI from './alpine/SearchUI/SearchUI.js';
import TableOfContents from './alpine/TableOfContents/TableOfContents.js';
import VersionSelect from './alpine/VersionSelect/VersionSelect.js';

export default function () {
	window.Alpine = Alpine;
	Alpine.data('Intro', Intro);
	Alpine.data('Search', Search);
	Alpine.data('SearchUI', SearchUI);
	Alpine.data('Page', Page);
	Alpine.data('ColorSchemeSwitcher', ColorSchemeSwitcher);
	Alpine.data('SwupThemeSwitcher', SwupThemeSwitcher);
	Alpine.data('MobileNav', MobileNav);
	Alpine.data('TableOfContents', TableOfContents);
	Alpine.data('VersionSelect', VersionSelect);
	Alpine.start();
}
