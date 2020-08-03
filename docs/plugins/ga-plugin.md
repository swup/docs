---
layout: default
title: GA Plugin
description: Plugin to trigger GA page views
parent: Plugins
nav_order: 4
permalink: /plugins/google-analytics-plugin
repo_link: /ga-plugin
---

# GA plugin
Google Analytics plugin triggers pageview event on `contentReplaced` (on each page change). 
Note that this event is not triggered at the first load, so the first page view must be triggered elsewhere. 
However, page view event is by default triggered in [Javascripts tracking snippet](https://developers.google.com/analytics/devguides/collection/analyticsjs/#the_javascript_tracking_snippet) used for embedding GA.  

Simplified code run by this plugin on `contentReplaced` event: 
```javascript
window.ga('set', 'title', document.title);
window.ga('set', 'page', window.location.pathname + window.location.search);
window.ga('send', 'pageview');
```

## Installation
This plugin can be installed with npm

```bash
npm install @swup/ga-plugin
```

and included with import

```shell
import SwupGaPlugin from '@swup/ga-plugin';
```

or included from the dist folder

```html
<script src="./dist/SwupGaPlugin.js"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupGaPlugin()]
});
```
