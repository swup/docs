---
layout: default
title: Matomo Plugin
description: Plugin to trigger Matomo page views
parent: Plugins
nav_order: 12
permalink: /plugins/matomo-plugin
repo_link: /matomo-plugin
---

# Matomo Plugin
**by [jdraserschieb](https://github.com/jdraserschieb)**  

Matomo plugin triggers pageview event on `contentReplaced` (on each page change).
Note that this event is not triggered at the first load, so the first page view must be triggered elsewhere.
However, page view event is by default triggered in [Javascripts tracking snippet](https://developer.matomo.org/guides/tracking-javascript-guide) used for embedding Matomo.
Simplified code run by this plugin on `contentReplaced` event:

```javascript
_paq.push(['setDocumentTitle', document.title]);
_paq.push(['setCustomUrl', window.location.pathname + window.location.search]);
_paq.push(['trackPageView']);
```

## Installation

This plugin can be installed with npm

```bash
npm install @swup/matomo-plugin
```

and included with import

```javascript
import SwupMatomoPlugin from '@swup/matomo-plugin';
```

or included from the dist folder

```html
<script src="./dist/SwupMatomoPlugin.js"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupMatomoPlugin()]
});
```
