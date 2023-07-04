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

## animationSelector

The selector for detecting transition timing. Swup will wait for all CSS transitions and
keyframe animations to finish on these elements before swapping in the content of the new page.
The default option will select all elements with
class names beginning in `transition-`.

```javascript
{
  animationSelector: '[class*="transition-"]'
}
```

## animationScope

The elements on which swup will add the [transition classes](/getting-started/how-it-works/#transition-classes)
for styling the different phases of the in/out animation. By default, it will add those classes
to the `html` tag. This is great for most use cases and the recommended way to use swup.

```js
{
  animationScope: 'html'
}
```

```html
<html class="is-animating is-leaving">
```

Setting this option to `containers` will add the classes on the content containers themselves instead.

```js
{
  animationScope: 'containers'
}
```

```html
<main id="swup" class="is-animating is-leaving">
  Content
</main>
```

## containers

The content containers to be replaced on page visits. Usually the `<main>` element with the
content of the page, but can include any other elements that are present across all pages.
Defaults to a single container of id `#swup`.

Adding containers here allows animating one set of elements while replacing other parts of the page
without animation, e.g. a global site navigation that will not fade out but still needs to update
to reflect language changes.

**Note:** Only elements **inside** of the `body` tag are supported.

```javascript
{
  containers: ['#swup']
}
```

## cache

The built-in [cache](/api/cache/) keeps previously loaded pages in memory. This improves speed but
can be disabled for highly dynamic sites that need up-to-date responses on each request. Defaults
to `true`.

```javascript
{
  cache: true
}
```

## ignoreVisit

Allows ignoring specific visits via callback. By default, swup will ignore links with a
`data-no-swup` attribute on itself or any parent element.

The callback takes a relative URL of the new page, as well as the element and event that triggered
the visit. Note that element and event will be undefined if navigating via `swup.loadPage(url)`.

```javascript
{
  ignoreVisit: (url, { el, event } = {}) => el?.closest('[data-no-swup]')
}
```

## linkSelector

The link elements that trigger visits. By default, all `a` elements with an `href`
attribute will receive clicks.

```javascript
{
  linkSelector: 'a[href]'
}
```

To let swup take over clicks on [map areas](https://www.w3schools.com/tags/tag_area.asp) or
[SVG links](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/a), append the selector:

```javascript
{
  linkSelector: 'a[href], area[href], svg a[*|href]'
}
```

## requestHeaders

The custom headers that get sent along with each swup request.

```javascript
{
  requestHeaders: {
    'X-Requested-With': 'swup', // identify swup requests
    'Accept': 'text/html, application/xhtml+xml' // define expected response
  }
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

## skipPopStateHandling

Swup will only handle backward/forward visits to history entries it has created itself. Any visits
to entries without a custom `source` property will be ignored and handled by the browser instead.
To modify this behavior, provide a custom callback function that receives the `popstate` event
and returns a `boolean`.

```javascript
{
  skipPopStateHandling: (event) => event.state?.source !== 'swup'
}
```

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
  animationScope: 'html',
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
