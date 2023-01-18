---
layout: default
title: GA Plugin
description: Plugin to trigger GA page views
parent: Plugins
nav_order: 7
permalink: /plugins/google-analytics-plugin
repo_link: /ga-plugin
---

# GA plugin

Google Analytics plugin triggers pageview event on `contentReplaced` (on each page change).
Note that this event is not triggered at the first load, so the first page view must be triggered elsewhere.
However, page view event is by default triggered in [Javascripts tracking snippet](https://developers.google.com/analytics/devguides/collection/analyticsjs/#the_javascript_tracking_snippet) used for embedding GA.
Simplified code run by this plugin on `contentReplaced` event:

```javascript
// in case GTAG script is used on page
window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: title,
    page_path: url
});

// in case GA script is used on page
window.ga('set', 'title', document.title);
window.ga('set', 'page', window.location.pathname + window.location.search);
window.ga('send', 'pageview');
```

**Note:** It has been reported that the plugin stopped working in some cases. It probably depends on the method used to load GA as well. If you encounter a problem, consider switching to [Gtag plugin](https://github.com/joshuaHallee/swup-gtag-plugin).

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

## Options

### gaMeasurementId

This option is only required for the case where GA is used through GTAG, eg. it's loaded with something like this.

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

The `window.gtag` requires this ID for each page trigger, so it needs to be passed into an instance of this plugin.

```javascript
const swup = new Swup({
  plugins: [new SwupGaPlugin({
      gaMeasurementId: GA_MEASUREMENT_ID,
  })],
});
```
