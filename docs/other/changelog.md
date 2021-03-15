---
layout: default
title: Changelog
description: Changelog of swup related packages
has_children: false
nav_order: 1
permalink: /other/changelog
has_toc: false
parent: Other
---

# Changelog

### @swup/a11y-plugin@2.0.0 - Plugin now has a unified name of `SwupA11yPlugin`. **This is a breaking change!**
* Given the plugins unusual name, the official name of the plugin was `SwupA11yPlugin`, while the global reference created by the plugin imported with a script was `SwupA11YPlugin`. The plugin name is now unified for all use cases. [PR](https://github.com/swup/a11y-plugin/pull/4) by [daun](https://github.com/daun) 👏

---

### @swup/ga-plugin@1.1.0 - Plugin now supports GTAG.
* GA can be loaded in different ways to the page. Plugin now tries to use the new standard of global `window.gtag` implementation, and fallbacks to the old `window.ga`. New `gaMeasurementId` option was added for the new implementation. [PR](https://github.com/swup/ga-plugin/pull/4) by [studio-blueboat](https://github.com/studio-blueboat) 👏

---

### @swup/head-plugin@1.2.0 - Head plugin now replaces the `lang`. 
* Head plugin now replaces the `lang`, since that's a pretty related to it's original purpose of replacing meta/other tags inside of the `head` tag. [PR](https://github.com/swup/head-plugin/pull/10) by [daun](https://github.com/daun) 👏

---

### @swup/progress-plugin@1.0.1 - Mark style tag with data attribute to allow identification
* Mark style tag with data attribute to allow identification. [PR](https://github.com/swup/head-plugin/pull/11) by [daun](https://github.com/daun) 👏

---

### @swup/forms-plugin@1.1.1 - fix import from swup dependency import
* Exports changed in swup package made this plugin incompatible with lates swup. Fixed in [PR](https://github.com/swup/forms-plugin/pull/13) by [fracsi](https://github.com/fracsi).

---

### @swup/docs - some changes to the swup docs 
* Sites using swup can now be found in [dedicated GitHub discussion](https://github.com/swup/swup/discussions/333), where anyone can leave their own links.
* You can now signup for a swup newsletter, to get notified of any major updates. 
* Add link to list of all swup repositories.

---

### @swup/forms-plugin@1.1.0 - support for `data-swup-transition`
* Add support for `data-swup-transition` on form element, which will make swup choose correct animation based on the attribute content, just like it does with links.

---

### @swup/docs - new third-party integrations listed 
* HTML Lang plugin by [mashvp](https://github.com/mashvp) 👏
* Meta Tags plugin by [Accudio](https://github.com/Accudio) 👏
* Morph plugin by [daun](https://github.com/daun) 👏

---

### @swup/swup@2.0.13 - update broken links
* Just a tiny update of broken links. 

---

### @swup/head-plugin@1.1.0 - add `persistAssets` and `persistTags` options
* Adds ability to persist tags and stop the plugin from removing certain tags. Especially useful for stopping the plugin from removing scripts/styles added by external scripts. [PR](https://github.com/swup/head-plugin/pull/11) by [daun](https://github.com/daun) 👏

---

### @swup/swup@2.0.12 - fix bug where animateHistoryBrowsing option was ignored for OUT animations
* Problem mainly for JS plugin. Related issue [here](https://github.com/swup/swup/issues/264). 

---

### @swup/custom-payload-plugin - new Custom Payload plugin
* Custom Payload plugin 🎉

---

### @swup/a11y-plugin - new Accessibility plugin
* Accessibility plugin by [daun](https://github.com/daun) 👏

---

### @swup/progress-plugin - new Progress Bar plugin
* Progress Bar plugin by [daun](https://github.com/daun) 👏

---

### @swup/matomo-plugin - new Matomo plugin
* Matomo plugin by [jdraserschieb](https://github.com/jdraserschieb) 👏

---

### @swup/cli@4.0.0 - new CLI validate command in 
New [CLI validate command]({{ "/cli#validating-site" | relative_url }}) for validating running sites manually, or for use with [CI/CD pipeline]({{ "/ci-cd" | relative_url }}).

---

### @swup/docs - two new third-party integrations listed 
* GTAG plugin by [joshuaHallee](https://github.com/joshuaHallee) 👏
* Preserve Scroll plugin by [ngsctt](https://github.com/ngsctt) 👏

---

**Started at version swup@2.0.9 - 2020/06/22**


