export default {
    swupOptions: {
        animationSelector: '[class*="swup-transition-"]',
        containers: ['#swup'],
    },
    validate: {
        against: 'http://localhost:8080',
        stylesExpectedToChange: ['opacity', 'transform'],
        sitemap: '_site/sitemap.xml',
    },
}
