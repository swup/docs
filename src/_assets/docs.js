import './scss/docs.scss';

import initSwup from './components/init-swup.js';
import initAlpine from './components/init-alpine.js';
initSwup();
initAlpine();

// function resetSearch() {
// 	document.querySelector('.pagefind-ui__search-clear')?.click();
// }
// swup.on('clickLink', resetSearch);
// document.addEventListener('click', (e) => {
// 	if (e.target.closest('#search')) return;
// 	resetSearch();
// });
