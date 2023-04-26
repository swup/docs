---
layout: default
title: Methods
eleventyNavigation:
  key: Methods
  parent: API
description: Methods on the swup instance
nav_order: 1
permalink: /api/methods/
---

# Methods

## loadPage

Navigate and transition to a URL, optionally modifying the request method and sending query or form data. Setting a `customTransition` works like setting the `data-swup-transition` attribute on a link.

```javascript
swup.loadPage({
  url: '/about', // URL of request (defaults to current url)
  method: 'GET', // method of request (defaults to "GET")
  data: data, // data passed into XMLHttpRequest.send()
  customTransition: '' // name of transition to use
});
```

## on/off

Un/register a handler for swup events.

```javascript
const handler = (event) => console.log(event);

// register event handler
swup.on('clickLink', handler);

// unregister event handler
swup.off('clickLink', handler);

// unregister all handlers for given event
swup.off('clickLink');

// unregister all handlers for all events
swup.off();
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
swup.unuse('ScrollPlugin');
```

## findPlugin

Returns the plugin instance by that name, if enabled.

```javascript
const pluginInstance = swup.findPlugin('ScrollPlugin');
```

## getAnimationPromises

Get an array of Promises that resolve when all animations have finished on the elements that swup identified as animation containers.

This method can be overwritten to return a custom array of Promises that swup should wait for before proceeding with the page transition.

```javascript
await Promise.all(swup.getAnimationPromises());
// Animations have finished now
```

## getPageData

**Note:** This method is rather internal and is utilized by [custom payload plugin](/plugins/custom-payload-plugin). Use the plugin instead.

Given an XHR request object, returns an object for further use in swup. Expects HTML as return type. Can be overwritten to accept and parse other return types from server, but must always return at least the fields below.

```javascript
const json = {
  title: 'Page title',
  originalContent: '<html>...</html>',
  blocks: ['<div id="swup"></div>'],
  pageClass: 'body-class',
  responseURL: '/redirected-url'
};
```

## triggerEvent

Trigger a swup event. Pass the event name and an optional event object of the original event that triggered it.

```javascript
swup.triggerEvent('transitionEnd', popstateEvent);
```

## log

Does nothing by default, but outputs the passed content when the [debug plugin](/plugins/debug-plugin) is used.
Accepts two arguments, the content of message and an optional log object which gets printed in a console group.

```javascript
swup.log('Something happened', { lorem: 'ipsum' });
```

## Methods added by plugins

These methods are not present on swup by default, but will require installing the mentioned plugins to become available.

### preloadPage

Added by the [preload plugin](/plugins/preload-plugin).
Preload a page and save it into the cache.

```javascript
swup.preloadPage('/page-url');
```

### preloadPages

Added by the [preload plugin](/plugins/preload-plugin).
Finds all links on the page with a `data-swup-preload` attribute and preloads the URLs they point to.

```javascript
swup.preloadPages();
```

### scrollTo

Added by the [scroll plugin](/plugins/scroll-plugin).
Smoothly scroll to the requested position. Accepts either the amount in pixels or the element you want to scroll to.
Currently only supports vertical scrolling.

```javascript
// scroll vertically to 2000px
swup.scrollTo(2000);

// scroll vertically to an element
swup.scrollTo(document.querySelector('#footer'));
```
