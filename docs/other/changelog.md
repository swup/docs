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


