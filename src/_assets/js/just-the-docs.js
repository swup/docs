import '../scss/just-the-docs.scss';
import otherLinksConfig from './other-links-config';

// Event handling

function addEvent(el, type, handler) {
	if (el.attachEvent) el.attachEvent('on' + type, handler);
	else el.addEventListener(type, handler);
}
function removeEvent(el, type, handler) {
	if (el.detachEvent) el.detachEvent('on' + type, handler);
	else el.removeEventListener(type, handler);
}

// Show/hide mobile menu

function toggleNav() {
	var nav = document.querySelector('.js-main-nav');
	var navTrigger = document.querySelector('.js-main-nav-trigger');
	var search = document.querySelector('.js-search');
	var openText = navTrigger.innerText;
	var closeText = navTrigger.getAttribute('data-text-toggle');

	addEvent(navTrigger, 'click', function () {
		nav.classList.toggle('nav-open');
		navTrigger.classList.toggle('nav-open');
		navTrigger.innerText = nav.className.indexOf('nav-open') === -1 ? openText : closeText;
	});

	document.addEventListener('swup:contentReplaced', function () {
		nav.classList.remove('nav-open');
		navTrigger.classList.remove('nav-open');
		navTrigger.innerText = nav.className.indexOf('nav-open') === -1 ? openText : closeText;
	});
}

function pageFocus() {
	var mainContent = document.querySelector('.js-main-content');
	mainContent.focus();
}

function links() {
	var config = otherLinksConfig.filter(function (item) {
		return !item.always;
	});
	var configAlwaysDisplayed = otherLinksConfig.filter(function (item) {
		return item.always;
	});

	var displayed = null;
	var template = `
        <a class="links__item" href="{link}" data-link>
            <div class="links__img" data-link-img><img src="{img}" /></div>
            <div class="links__name">{name}</div>
            <div class="links__description">{description}</div>
        </a>`;

	var linksContainer = document.querySelector('[data-links]');
	var linksAll = document.querySelector('[data-links-all]');

	function addLink(item) {
		var link = document.createElement('div');

		link.innerHTML = template
			.replace('{link}', item.link)
			.replace('{name}', item.name)
			.replace('{description}', item.description)
			.replace('{img}', item.img);

		if (!item.img) {
			link.querySelector('[data-link-img]').outerHTML = '';
			link.classList.add('has-no-img');
		}

		linksContainer.appendChild(link);
	}

	function empty() {
		linksContainer.innerHTML = '';
	}

	function showLink(index, withAlwaysDisplayedLinks) {
		if (withAlwaysDisplayedLinks) {
			for (var i = 0; i < configAlwaysDisplayed.length; i++) {
				if (i !== displayed) {
					addLink(configAlwaysDisplayed[i]);
				}
			}
		}

		addLink(config[index]);
	}

	function showLinks() {
		for (var i = 0; i < config.length; i++) {
			if (i !== displayed) {
				showLink(i, false);
			}
		}

		linksAll.style.display = 'none';
	}

	linksAll.addEventListener('click', showLinks);

	function refresh() {
		var index = Math.floor(Math.random() * config.length);
		displayed = index;
		linksAll.style.display = 'inline-block';

		empty();
		showLink(index, true);
	}

	refresh();
	window.swup.on('contentReplaced', refresh);
}

// Document ready

function ready() {
	toggleNav();
	pageFocus();
	links();
}

// in case the document is already rendered
if (document.readyState != 'loading') ready();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', ready);
// IE <= 8
else
	document.attachEvent('onreadystatechange', function () {
		if (document.readyState == 'complete') ready();
	});
