---
layout: default
title: Methods
description: Methods to control swup instance from your code
nav_order: 1
parent: API
permalink: /api/methods
---

# Methods

## loadPage

Navigates to a route with the animations and all... (can be used to submit forms).

```javascript
swup.loadPage({
  url: '/someRoute', // route of request (defaults to current url)
  method: 'GET', // method of request (defaults to "GET")
  data: data, // data passed into XMLHttpRequest send method
  customTransition: '' // name of your transition used for adding custom class to html element and choosing custom animation in swupjs (as setting data-swup-transition attribute on link)
});
```

**Note:** `loadPage` function is used to submit forms with swup.
For more information on submitting forms with `XMLHttpRequest`, refer to [Sending forms through JavaScript](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript).

## preloadPage

Added to swup instance by [preload plugin]({{ "/plugins/preload-plugin" | relative_url }}).
Preload a page and saves it into cache.

```javascript
swup.preloadPage('/page-url');
```

## preloadPages

Added to swup instance by [preload plugin]({{ "/plugins/preload-plugin" | relative_url }}).
Finds all links in a page with `data-swup-preload` attribute and preloads pages they link to.

```javascript
swup.preloadPages();
```

## scrollTo

Added to swup instance by [scroll plugin]({{ "/plugins/scroll-plugin" | relative_url }}).
Smoothly scrolls to the requested position. Accepts either the amount in pixels or the `HtmlElement` you want to scroll to.
At the moment, method only supports vertical scrolling.

```javascript
// scroll vertically to 2000px
swup.scrollTo(2000);
// scroll vertically to an element
swup.scrollTo(document.querySelector('#my-section'));
```

## on/off

Un/registers a handler for swup event.

```javascript
const handler = event => console.log(event)

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

## use

Enables plugin.

```javascript
swup.use(new SwupScrollPlugin());
```

## unuse

Disables plugin. Accepts plugin name or instance.

```javascript
swup.unuse('ScrollPlugin');
```

## findPlugin

Returns plugin instance with a given name of a plugin.

```javascript
const pluginInstance = swup.findPlugin('ScrollPlugin');
```

## getAnimationPromises

Returns array of promises for the animated elements (each promise gets resolved when animation of an element is finished).
This method can be modified to return array of other promises swup should wait for before proceeding in page transition.

```javascript
const arrayOfPromises = swup.getAnimationPromises();
```

## getPageData

**Note:** This method is rather internal and is utilized by [custom payload plugin]({{ "/plugins/custom-payload-plugin" | relative_url }}). Use the plugin instead.

Gets `response` object received from server.
Returns page data that are store by swup in cache.
This method can be modified to accept other types of response from server, but must always return at least the fields below.

```javascript
const json = {
    title: 'Page title',
    pageClass: 'body-class',
    originalContent: 'html content of page',
    blocks: ['<div id="swup"></div>'],
    responseURL: '/redirected-url'
};
```

## triggerEvent

Triggers swup event. Accepts two arguments - `eventName` and optional `eventObject`.

## log

Does nothing by default, but outputs passed content when [debug plugin]({{ "/plugins/debug-plugin" | relative_url }}) is used.
Accepts two arguments - `name` (the content of message) and optional log object which gets printed in a console groups.
