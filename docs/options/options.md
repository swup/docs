---
layout: default
title: Options
description: Swup has a several options that can be passed into a constructor as an object
has_children: true
nav_order: 2
permalink: /options
has_toc: false
---

# Options

Swup has several options that can be passed in during initialization:

```javascript
const options = {};
const swup = new Swup(options);
```

## linkSelector

Defines which link elements will trigger page visits. By
default, all `a` elements with an `href` attribute will receive clicks.

```javascript
const options = {
  linkSelector: 'a[href]'
};
```

To allow Swup to take over clicks on
[map areas](https://www.w3schools.com/tags/tag_area.asp) or
[SVG links](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/a),
append the selector:

```javascript
const options = {
  linkSelector: 'a[href], area[href], svg a[*|href]'
};
```

## ignoreLink

Allows ignoring specific links through a callback. By default, all
links to other domains and all links with the `data-no-swup` attribute are being ignored.

```javascript
const options = {
  ignoreLink: (el) => (
    el.origin !== window.location.origin ||
    el.closest('[data-no-swup]')
  )
};
```

## animationSelector

Defines the elements that are being animated. Usually, they will have a common
class or class prefix. The default option will select all elements with
classNames starting with `transition-`.

```javascript
const options = {
  animationSelector: '[class*="transition-"]'
};
```

## containers

Defines the containers that have their content replaced on page visits. This option must at least include the main element with the content of the page, but can
include any other elements that are present across all pages.

This allows animating one set of elements on the page while still replacing
other, non-animated, parts of it: a common example would be the global site
navigation that will not animate across pages but still needs to be updated if
the language changes.

Defaults to a single container of id `#swup`.

**Note:** Only elements **inside** of the `body` tag are supported.

```javascript
const options = {
  containers: ['#swup']
};
```

## cache

Swup has a built-in cache and will keep previously loaded pages in memory.
This drastically improves speed but should be disabled for highly dynamic sites
that need up-to-date responses on each request. Defaults to `true`.

```javascript
const options = {
  cache: true
};
```

## requestHeaders

Adjust request headers that should be sent with each Swup request. Useful for returning custom
payloads from the server or other server-side pre-processing.

```javascript
const options = {
  requestHeaders: {
    'X-Requested-With': 'swup', // identify swup requests
    'Accept': 'text/html, application/xhtml+xml' // define expected response
  }
};
```

## skipPopStateHandling

Swup is built around the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History), but sometimes some other tools manipulating the browser history can be used as well.

For this reason, Swup places a `source` property into every history `state` object it creates, so it can be identified later (Swup also modifies the current history record on start, to include the `source: swup` property as well).
On `popState` events, Swup only handles the records that were created by Swup.

This behavior can be modified by the callback `skipPopStateHandling`, which should return a `boolean` (`false`: handle the `popState` event, `true`: do nothing).
The callback receives one argument - the `popState` event.

The option defaults to this:

```javascript
const options = {
  skipPopStateHandling: (event) => event.state?.source !== 'swup'
};
```

## resolvePath

This option is a callback function that receives a URL path as an argument and needs to return a path. It is meant for more complex cases where `skipPopStateHandling` is not sufficient enough. Inside the callback, you can check for certain conditions and, if these conditions apply, resolve a group of URLs to the same one:

```javascript
const options = {
  resolvePath: (path) => {
    if (path.startsWith('/projects/?')) return '/projects/';
    return path;
  }
}
```

The above example tells Swup to treat all these paths that start with `/projects/?` as one. It will now ignore all changes to the URL (through link clicks or history browsing) if the previous and next URL resolve to the same one. It will also use the resolved path for its cache (if active) and for storing and restoring the scroll position (if the SwupScrollPlugin is in use).

## animateHistoryBrowsing

This option enables the animations also if navigating using the browser history. Swup adds the class `is-popstate` to the html tag for the whole process of the transition on back/forward browsing.

```javascript
const options = {
  animateHistoryBrowsing: false
};
```

⚠️ **Important Note**: This option was added to Swup due to popular request but should be used with caution. When the option is set to `true`, Swup has to disable all native browser scrolling behavior (sets [scrollRestoration](https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration) to `manual`). We encourage you to strongly consider the consequences of doing so:

The scroll positions on previous page(s) or between page reloads are **not being preserved** (but [can be implemented manually](https://github.com/swup/swup/issues/48#issuecomment-423854819), depending on the use case). Otherwise, Swup will scroll to the top/#element on `popState` as the browser would do. The default value is `false`.

## Default Options

The default option object look like...

```javascript
const options = {
  animateHistoryBrowsing: false,
  animationSelector: '[class*="transition-"]',
  cache: true,
  containers: ['#swup'],
  ignoreLink: (el) => (
    el.origin !== window.location.origin ||
    el.closest('[data-no-swup]')
  ),
  linkSelector: 'a[href]',
  plugins: [],
  requestHeaders: {
    'X-Requested-With': 'swup',
    'Accept': 'text/html, application/xhtml+xml'
  },
  skipPopStateHandling: (event) => event.state?.source !== 'swup'
};
```
