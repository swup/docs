---
layout: default
title: Getting Started
eleventyNavigation:
  key: Getting Started
  order: 0
permalink: /getting-started/
---

# Getting Started

## What is swup?

Swup is a versatile and extensible **page transition library** for server-rendered websites.
It manages the complete page load lifecycle and smoothly transitions between the current and next
page. In addition, it offers many other quality-of-life improvements like **caching**, **smart preloading**,
native browser history and enhanced **accessibility**.

Make your site feel like a snappy single-page app — without any of the complexity.

## Features

- ✏️ Works out of the box with [minimal markup](/getting-started/example/)
- ✨ Auto-detects [CSS transitions](/getting-started/how-it-works/#timing) for perfect timing
- 🔗 Updates URLs and preserves native [browser history](/getting-started/how-it-works/#history)
- 🏓 Manages [scroll position](/getting-started/how-it-works/#scrolling) between pages and anchor links
- 🚀 Uses a [cache](/api/cache/) to speed up subsequent page loads
- 📡 Offers [hooks](/hooks/) to customize and extend the page load lifecycle
- 🔌 Has a powerful [plugin system](/plugins/) and many official and third-party plugins
- 🎨 Provides ready-to-go [themes](/themes/) to get started quickly

See [How it works](/getting-started/how-it-works/) for an overview of the key concepts.

## Try it out

Explore our [interactive demos](/getting-started/demos/) to see swup in action.

## Plugins

Swup is small by design. Extended features can be added via [plugins](/plugins/):

- Display a [progress bar](/plugins/progress-plugin/) while loading
- Enable [smooth scrolling](/plugins/scroll-plugin/) between visits
- Update [meta tags and stylesheets](/plugins/head-plugin/) after page loads
- Add support for [preloading pages](/plugins/preload-plugin/) in the background
- Perform your [animations in JS](/plugins/js-plugin/) instead of CSS transitions
- Animate [form submissions](/plugins/forms-plugin/)
- Improve [accessibility](/plugins/a11y-plugin/) for screen readers
- Get help in [debug mode](/plugins/debug-plugin/)

Check out the list of [official plugins](/plugins/) and [third-party integrations](/third-party-integrations/).

## Themes

Get started quickly with one of three official themes: [fade](/themes/fade-theme/),
[slide](/themes/slide-theme/), and [overlay](/themes/overlay-theme/).

## Having trouble?

If you're having trouble implementing swup, check out [Common Issues](/other/common-issues/), look
at [closed issues](https://github.com/swup/swup/issues?q=is%3Aissue+is%3Aclosed), or create a
[new discussion](https://github.com/swup/swup/discussions/new).

## Want to Contribute?

Become a sponsor on [Open Collective](https://opencollective.com/swup) or support development through
[GitHub sponsors](https://github.com/sponsors/gmrchk).

<div class="buttons">
  <a href="https://opencollective.com/swup/donate" target="_blank" class="button">Donate to Our Open Collective</a>
  <a href="https://github.com/sponsors/gmrchk" target="_blank" class="button">Sponsor Us on GitHub</a>
</div>

## License

Swup is released under the [MIT license](https://github.com/swup/swup/blob/master/LICENSE).
