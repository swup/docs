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

Swup has a several options that can be passed into a constructor as an object.

```javascript
const options = {};
const swup = new Swup(options);
```

## Link Selector

Defines which link elements will trigger page visits. By
default, all `a` elements with an `href` attribute will receive clicks.

```javascript
const options = {
  linkSelector: 'a[href]'
};
```

To allow swup to take over clicks on
[map areas](https://www.w3schools.com/tags/tag_area.asp) or
[SVG links](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/a),
append the selector:

```javascript
const options = {
  linkSelector: 'a[href], area[href], svg a[*|href]'
};
```

## Ignoring links

Allows ignoring specific links through a callback. By default, all
links to other domains and all links with the `data-no-swup` attribute are
ignored.

```javascript
const options = {
  ignoreLink: (el) => (
    el.origin !== window.location.origin ||
    el.closest('[data-no-swup]')
  )
};
```

## Animation Selector

Defines the elements that are being animated. Usually, they will have a common
class or class prefix. The default option will select all elements with
classnames starting with `transition-`.

```javascript
const options = {
  animationSelector: '[class*="transition-"]'
};
```

## Containers

Defines the containers that have their content replaced on page visits. They
will at least include the main element with the content of the page, but can
include any element that is present across all pages.

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

## Cache

Swup has a built-in cache and will keep previously loaded pages in memory.
This drastically improves speed but should be disabled for highly dynamic sites
that need up-to-date responses on each request. Defaults to `true`.

```javascript
const options = {
  cache: true
};
```

## Request Headers

Adjust request headers sent with swup requests. Useful for returning custom
payloads from the server or other server-side pre-processing.

```javascript
const options = {
  requestHeaders: {
    'X-Requested-With': 'swup', // identify swup requests
    'Accept': 'text/html, application/xhtml+xml' // define expected response
  }
};
```

## Skip popState Handling

Swup is built around browser history API, but sometimes some other tools manipulating the browser history can be used as well.
For this reason, swup places a source property into every history state object it creates, so it can be later identified (swup also modifies current history record on start, to include the "swup" source property as well).
On `popState` events, swup only handles the records that were created by swup.
This behavior can be modified by `skipPopStateHandling` option, which is represented by a function returning boolean (false = handle the popstate, true = do nothing).
The function accepts one argument - the popstate event. Option defaults to the following:

```javascript
const options = {
  skipPopStateHandling: (event) => event.state?.source !== 'swup'
};
```

## Animate History Browsing

This option enables the animations also if navigating using the browser history. Swup adds the class `is-popstate` to the html tag for the whole process of the animation on back/forward browsing.

```javascript
const options = {
  animateHistoryBrowsing: false
};
```

⚠️ **Important Note**: This option was added to Swup due to popular request but should be used with caution. When the option is set to `true`, Swup has to disable all native browser scrolling behavior (sets [scrollRestoration](https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration) to `manual`). We encourage you do strongly consider the consequences of doing so:

The scroll positions on previous page(s) or between page reloads are **not being preserved** (but [can be implemented manually](https://github.com/swup/swup/issues/48#issuecomment-423854819) based on the use case). Otherwise, Swup will scroll to the top/#element on `popstate` as the browser would do. The default value is `false`.

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
