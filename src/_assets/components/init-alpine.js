import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
import focus from '@alpinejs/focus';
Alpine.plugin(persist);
Alpine.plugin(focus);

import Intro from './alpine/Intro/Intro.js';

export default function () {
	window.Alpine = Alpine;
	Alpine.data('Intro', Intro);
	Alpine.start();
}
