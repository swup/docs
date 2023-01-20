var swup = new Swup({
  containers: ['#nav', '#swup'],
  plugins: [
    new SwupDebugPlugin(),
    new SwupScrollPlugin({
      animateScroll: false
    }),
    new SwupSlideTheme(),
    new SwupBodyClassPlugin(),
    new SwupGtagPlugin({
      gaMeasurementId: GA_MEASURE_ID
    }),
  ],
});

var themes = {
  FadeTheme: SwupFadeTheme,
  SlideTheme: SwupSlideTheme,
  OverlayTheme: SwupOverlayTheme,
};
var currentTheme = 'SlideTheme';

document.addEventListener('change', function (event) {
  if (event.target.name === 'theme') {
    swup.unuse(currentTheme);
    swup.use(new themes[event.target.value]);
    currentTheme = event.target.value;
    swup.cache.empty();
  }
});

function checkTheme() {
  if (document.querySelector('input[name="theme"]')) {
    document.querySelector('input[name="theme"][value="' + currentTheme + '"]').checked = true;
  }
};

if (document.querySelector('iframe#newsletter')) {
  document.querySelector('iframe#newsletter').addEventListener('load', function () {
    this.style.height = this.contentWindow.document.documentElement.scrollHeight + 'px';
  });
}

function resizeNewsletterIframe() {
  var iframe = document.querySelector('iframe#newsletter');
  iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
}

function addHeadlineLinks() {
  document.getElementById('main-content').querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(function(element) {
    const anchor = document.createElement('a');
    const link = window.location.origin + window.location.pathname + '#' + element.id;

    anchor.href = link;
    anchor.className = 'headline-anchor';
    anchor.innerHTML = '#';

    anchor.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      navigator.clipboard.writeText(link);
    });

    element.appendChild(anchor);
  })
}

checkTheme();
swup.on('pageView', checkTheme);
resizeNewsletterIframe();
swup.on('pageView', resizeNewsletterIframe);
addHeadlineLinks();
swup.on('pageView', addHeadlineLinks);

