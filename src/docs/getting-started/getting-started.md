---
layout: default
title: Getting Started
eleventyNavigation:
  key: Getting Started
  order: 1
permalink: /getting-started/
---

# Getting Started

Swup is an extensible and easy-to-use page transition library for server-side rendered websites. It
handles the complete lifecycle of a page visit by intercepting link clicks, loading the new page in the
background, replacing the content and transitioning between the old and the new page.

Its goal is to make adding transitions to a site as simple as possible, while providing lots of
other quality-of-life improvements.

## Features

- 🎯 Extremely [easy to use](/getting-started/example/), even for beginners
- ✨ Auto-detects [CSS transitions](/getting-started/how-it-works/) for perfect timing
- 🔗 Updates URLs and preserves native browser history behavior
- 📦 Uses a [cache](/api/cache/) to speed up subsequent page loads
- 💡 Offers [events](/events/) for hooking into the lifecycle
- 🔌 Has a powerful [plugin system](/plugins/) and many official and third-party plugins
- 🎨 Provides ready-to-go [themes](/themes/) to get started quickly

## Plugins

Swup's core is very small by design. All extended features can be added via [plugins](/plugins/). Some examples:

- Install a [progress bar](/plugins/progress-plugin/)
- Enable [smooth scrolling](/plugins/scroll-plugin/) between visits
- Update [meta tags and stylesheets](/plugins/head-plugin/) after page loads
- Add support for [preloading pages](/plugins/preload-plugin/) in the background
- Perform your [animations in JS](/plugins/js-plugin/) instead of CSS transitions
- Animate [form submissions](/plugins/forms-plugin/)
- Improve [screen reader accessibility](/plugins/a11y-plugin/)
- Get help in [debug mode](/plugins/debug-plugin/)

Check out the list of [all official plugins](/plugins/) as well as [third-party integrations](/third-party-integrations/).

## Having trouble?

If you're having trouble implementing swup, check out [Common Issues](/other/common-issues/), look at [closed issues](https://github.com/swup/swup/issues?q=is%3Aissue+is%3Aclosed) or create a [new discussion](https://github.com/swup/swup/discussions/new).

## CLI

Like to make sure your site has no bugs? You can use swup's [CI/CD integration](/ci-cd/) for that, or use the official [swup CLI](/cli/) to check your site manually.

## Want to Contribute?

Become a sponsor on [Open Collective](https://opencollective.com/swup) or support development through
[GitHub sponsors](https://github.com/sponsors/gmrchk).

<div class="buttons">
  <a href="https://opencollective.com/swup/donate" target="_blank" class="button">Donate to Our Open Collective</a>
  <a href="https://github.com/sponsors/gmrchk" target="_blank" class="button">Sponsor Us on GitHub</a>
</div>

## License

Swup is released under the [MIT license](https://github.com/swup/swup/blob/master/LICENSE).
