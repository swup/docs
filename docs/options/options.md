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
const swup = new Swup({
  /* options */
});
```

## linkSelector

Defines which link elements will trigger page visits. By
default, all `a` elements with an `href` attribute will receive clicks.

```javascript
{
  linkSelector: 'a[href]'
}
```

To allow swup to take over clicks on
[map areas](https://www.w3schools.com/tags/tag_area.asp) or
[SVG links](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/a),
append the selector:

```javascript
{
  linkSelector: 'a[href], area[href], svg a[*|href]'
}
```

## ignoreLink

Allows ignoring specific links through a callback. By default, all
links to other domains and all links with the `data-no-swup` attribute are being ignored.

```javascript
{
  ignoreLink: (el) => (
    el.origin !== window.location.origin ||
    el.closest('[data-no-swup]')
  )
}
```

## animationSelector

Defines the elements that are being animated. Usually, they will have a common
class or class prefix. The default option will select all elements with
classNames starting with `transition-`.

Swup will wait for all CSS transitions and keyframe animations to finish on these elements before swapping in the content of the new page.

```javascript
{
  animationSelector: '[class*="transition-"]'
}
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
{
  containers: ['#swup']
}
```

## cache

Swup has a built-in cache and will keep previously loaded pages in memory.
This drastically improves speed but should be disabled for highly dynamic sites
that need up-to-date responses on each request. Defaults to `true`.

```javascript
{
  cache: true
}
```

## requestHeaders

Adjust request headers that should be sent with each swup request. Useful for returning custom
payloads from the server or other server-side pre-processing.

```javascript
{
  requestHeaders: {
    'X-Requested-With': 'swup', // identify swup requests
    'Accept': 'text/html, application/xhtml+xml' // define expected response
  }
}
```

## skipPopStateHandling

Swup is built around the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History), but sometimes some other tools manipulating the browser history can be used as well.

For this reason, swup places a `source` property into every history `state` object it creates, so it can be identified later (swup also modifies the current history record on start, to include the `source: swup` property as well).
On `popState` events, swup only handles the records that were created by swup.

This behavior can be modified by the callback `skipPopStateHandling`, which should return a `boolean` (`false`: handle the `popState` event, `true`: do nothing).
The callback receives one argument - the `popState` event.

The option defaults to this:

```javascript
{
  skipPopStateHandling: (event) => event.state?.source !== 'swup'
}
```

## resolveUrl

This option provides a way of rewriting URLs before swup will attempt to load
them. In practice, it's an advanced way of telling swup which visits to ignore.
By resolving different paths to a single path, swup will treat all these
as a single resource and ignore any visits between them. You can then
handle any changes on the page yourself: updating content, title tag, etc.
without swup getting in the way. Swup will also use the resolved URL for its
cache and for restoring the scroll position if using the scroll plugin.

An example use case would be a project listing with purely client-side filtering
based on the query parameters. The server will always respond with the full list
of all projects. In that case, you'll want to handle any visits between
`/projects/?sort=date` and `/projects/?sort=title` yourself, telling swup that
nothing has changed and no fetch request to the new URL is necessary.

The callback function receives a relative URL as an argument and needs to
return a URL as well:

```javascript
{
  resolveUrl: (url) => {
    if (url.startsWith('/projects/?')) {
      return '/projects/';
    } else {
      return path;
    }
  }
}
```

The option defaults to `(url) => url`.

## animateHistoryBrowsing

History visits triggered by the back and forward buttons of the browser will skip all animations to allow faster navigation. If you need animations on history visits, set this option to `true`. When enabled, swup will add the class `is-popstate` to the html tag during the transitions of those visits. The default value is `false`.

```javascript
{
  animateHistoryBrowsing: false
}
```

⚠️ **Important Note**: This option was added due to popular request but should be used with caution. When enabled, swup has to disable all native browser scrolling behavior (sets [scrollRestoration](https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration) to `manual`). We encourage you to strongly consider the consequences of doing so: The scroll positions on previous page(s) or between page reloads are **not being preserved** (but [can be implemented manually](https://github.com/swup/swup/issues/48#issuecomment-423854819), depending on the use case). Otherwise, Swup will scroll to the top/#element on `popState` as the browser would do.

## Default Options

The default option object look like...

```javascript
{
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
}
```
