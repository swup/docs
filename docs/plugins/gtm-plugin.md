---
layout: default
title: GTM Plugin
parent: Plugins
nav_order: 7
permalink: /plugins/google-tag-manager-plugin
repo_link: /gtm-plugin
---

# GTM plugin
Google Tag Manager Plugin triggers VirtualPageview event on `contentReplaced` (on each page change) which can be associated with a page view within GTM.
Event object also includes virtualPageURL holding the url of the page and virtualPageTitle holding the title of the page.
Note that this event is not triggered at the first load, so the first page view must be triggered elsewhere.

Simplified code run by this plugin on `contentReplaced` event:

```javascript
window.dataLayer.push({
  event: 'VirtualPageview',
  virtualPageURL: window.location.pathname + window.location.search,
  virtualPageTitle: document.title
});
```

## Instalation
This plugin can be installed with npm

```bash
npm install @swup/gtm-plugin
```

and included with import

```shell
import SwupGtmPlugin from '@swup/gtm-plugin';
```

or included from the dist folder

```html
<script src="./dist/SwupGtmPlugin.js"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupGtmPlugin()]
});
```
