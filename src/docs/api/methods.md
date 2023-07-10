---
layout: default
title: Methods
eleventyNavigation:
  key: Methods
  parent: API
  order: 3
description: Methods on the swup instance
permalink: /api/methods/
---

# Methods

## visit

Navigate and transition to a URL. Pass an options object to configure the page load.

```javascript
swup.visit(url);
```

Send a POST request with form data:

```javascript
swup.visit(url, { method: 'POST', data: new FormData() });
```

Disable animations for this visit:

```javascript
swup.visit(url, { animate: false });
```

Set a custom animation name:

```javascript
swup.visit(url, { animation: 'custom' });
```

Replace the current history entry instead of creating a new one:

```javascript
swup.visit(url, { history: 'replace' });
```

## destroy

Disables swup.

```javascript
swup.destroy();
```

## use/unuse

Enable and disable plugins.

```javascript
// Enable plugin: accepts an instantiated instance
swup.use(new SwupScrollPlugin());

// Disable plugin: accepts either name or instance
swup.unuse('SwupScrollPlugin');
```

## findPlugin

Returns the plugin instance by that name, if enabled.

```javascript
const pluginInstance = swup.findPlugin('SwupScrollPlugin');
```

## log

Does nothing by default, but outputs the passed content when the [debug plugin](/plugins/debug-plugin/) is used.
Accepts two arguments, the content of message and an optional log object which gets printed in a console group.

```javascript
swup.log('Something happened', { lorem: 'ipsum' });
```
