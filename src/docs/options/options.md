---
layout: default
title: Options
eleventyNavigation:
  key: Options
  order: 1
  parent: API
description: Swup has a several options that can be passed into a constructor as an object
permalink: /options/
---

# Options

Swup has several options that can be passed in during initialization:

```javascript
const swup = new Swup({
  /* options */
});
```

## linkSelector

Defines which link elements will trigger page visits.

By default, all `a` elements with an `href` attribute will receive clicks.

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

## ignoreVisit

Allows ignoring specific visits through a callback. By default, swup will ignore links with a `data-no-swup` attribute on itself or any parent element. The callback receives the URL of the new page, as well as a copy of the element and the event that triggered it, if any.

The URL argument is the relative URL, excluding origin, but including any query parameters and hash.

Element and event will be undefined when navigating via `swup.loadPage(url)`.

```javascript
{
  ignoreVisit: (url, { el, event } = {}) => el?.closest('[data-no-swup]')
}
```

## animationSelector

Defines the elements that are being animated. Usually, they will have a common
class or class prefix. The default option will select all elements with
class names starting with `transition-`.

Swup will wait for all CSS transitions and keyframe animations to finish on these elements before
swapping in the content of the new page.

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

Swup's built-in [cache](/api/cache/) keeps previously loaded pages in memory.
This improves speed but should be disabled for highly dynamic sites
that need up-to-date responses on each request. Defaults to `true`.

```javascript
{
  cache: true
}
```

## requestHeaders

Adjust request headers that should be sent with each swup request.

```javascript
{
  requestHeaders: {
    'X-Requested-With': 'swup', // identify swup requests
    'Accept': 'text/html, application/xhtml+xml' // define expected response
  }
}
```

## skipPopStateHandling

Swup might not be the only library manipulating history state in your project. To properly identify
visits initiated by swup, it will add a `source` property to every history state object it creates.
Whenever the back/forward button is hit, swup will only handle visits it recognizes.

This behavior can be modified by passing in a `skipPopStateHandling` handler that returns `true` to
handle a specific history visit or `false` to do nothing. It receives the triggered `popstate` event
and defaults to:

```javascript
{
  skipPopStateHandling: (event) => event.state?.source !== 'swup'
}
```

## resolveUrl

Allows rewriting URLs before swup tries loading them. In practice, it's an
advanced way of making swup ignore certain visits. By resolving different paths
to a single path, swup will treat both as a single resource and ignore any
visits between them. You can then handle any changes on the page yourself:
updating content, title tag, etc., without swup getting in the way. Swup will
also use the resolved URL for its cache and for restoring the scroll position if
using the scroll plugin.

An example use case would be a project listing with purely client-side filtering
based on the query parameters. The server will always respond with the full list
of all projects. In that case, you'll want to handle any visits between
`/projects/?sort=date` and `/projects/?sort=title` yourself, telling swup that
nothing has changed and no fetch request to the new URL is necessary.

The callback function receives a relative URL as an argument and needs to
return a relative URL as well.

```javascript
{
  resolveUrl: (url) => {
    if (url.startsWith('/projects/?')) {
      return '/projects/';
    }
    return url;
  }
}
```

The option defaults to `(url) => url`.

## animateHistoryBrowsing

Swup will skip animations for visits triggered by the back/forward button. If you do require
animations on history visits, set this to `true`. Swup will add the class `is-popstate` to the html
tag during those transitions. Defaults to `false`.

```javascript
{
  animateHistoryBrowsing: false
}
```

⚠️ **Important Note**: This option was added due to popular request. However, it should be used with
caution. When activated, swup has to disable native [browser scroll restoration](https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration).
Scroll positions will not be preserved between visits and need to be implemented by you.

## Default Options

The default options look like this:

```javascript
{
  animateHistoryBrowsing: false,
  animationSelector: '[class*="transition-"]',
  cache: true,
  containers: ['#swup'],
  ignoreVisit: (href, { el } = {}) => el?.closest('[data-no-swup]'),
  linkSelector: 'a[href]',
  plugins: [],
  resolveUrl: (url) => url,
  requestHeaders: {
    'X-Requested-With': 'swup',
    'Accept': 'text/html, application/xhtml+xml'
  },
  skipPopStateHandling: (event) => event.state?.source !== 'swup'
}
```
