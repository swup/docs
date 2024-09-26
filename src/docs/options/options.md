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

Swup has several options that can be passed in during initialization.

## Defaults

These are the default options. See below for details on each option.

```javascript
const swup = new Swup({
  animateHistoryBrowsing: false,
  animationSelector: '[class*="transition-"]',
  animationScope: 'html',
  cache: true,
  containers: ['#swup'],
  hooks: {},
  ignoreVisit: (url, { el } = {}) => el?.closest('[data-no-swup]'),
  linkSelector: 'a[href]',
  linkToSelf: 'scroll',
  native: false,
  plugins: [],
  resolveUrl: (url) => url,
  requestHeaders: {
    'X-Requested-With': 'swup',
    'Accept': 'text/html, application/xhtml+xml'
  },
  skipPopStateHandling: (event) => event.state?.source !== 'swup',
  timeout: 0
});
```

## animationSelector

The selector for detecting animation timing. Swup will wait for all CSS transitions and
keyframe animations to finish on these elements before swapping in the content of the new page.
The default option will select all elements with class names beginning in `transition-`.

```javascript
{
  animationSelector: '[class*="transition-"]'
}
```

## animationScope

The elements on which swup will add the [animation classes](/getting-started/how-it-works/#animation-classes)
for styling the different phases of the in/out animation. By default, it will add those classes
to the `html` tag. This is great for most use cases and the recommended way to use swup.

```js
{
  animationScope: 'html'
}
```

```html
<html class="is-animating is-leaving"></html>
```

Setting this option to `containers` will add the classes on the content containers themselves instead.

```js
{
  animationScope: 'containers'
}
```

```html
<main id="swup" class="is-animating is-leaving">Content</main>
```

## containers

The content containers to be replaced on page visits. Usually the `<main>` element with the
content of the page, but can include any other elements that are present across all pages.
Defaults to a single container of id `#swup`.

Adding containers here allows animating one set of elements while replacing other parts of the page
without animation, e.g. a global site navigation that will not fade out but still needs to update
to reflect language changes.

```javascript
{
  containers: ['#swup']
}
```

> **Note** Only elements **inside** of the `body` tag are supported.

## cache

The built-in [cache](/api/cache/) keeps previously loaded pages in memory. This improves speed but
can be disabled for highly dynamic sites that need up-to-date responses on each request. Defaults
to `true`.

```javascript
{
  cache: true
}
```

## hooks

An object of [hook handlers](/hooks/) to register. For details and a few more examples,
see the section on [registering all hooks handlers at once](http://localhost:8080/hooks/#set-all-hook-handlers-at-once).

```javascript
{
  hooks: {
    'visit:start': () => console.log('start'),
    'visit:end': () => console.log('end')
  }
}
```

## ignoreVisit

Allows ignoring specific visits via callback. By default, swup will ignore links with a
`data-no-swup` attribute on itself or any parent element.

The callback takes a relative URL of the new page, as well as the element and event that triggered
the visit. Note that element and event will be undefined if navigating via `swup.navigate(url)`.

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

## linkToSelf

How swup handles links that lead to the currently active URL. By default, it will `scroll` to the
top without actually performing a navigation. Pass in `navigate` to treat these links like any
other link and perform a regular navigation.

```javascript
{
  linkToSelf: 'navigate'
}
```

## native

Enable native animations using the [View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
API. This will toggle the class `swup-native` on the HTML element if View Transitions are supported
by the user's browsers. Learn more about [native view transitions](/getting-started/animations/#native-animations).

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

Rewrite URLs before loading them. An advanced way of ignoring certain visits by mapping different
paths to a single path and treating them as one resource for fetching pages and restoring scroll
positions. The callback receives and returns a relative URL.

An example use case would be a project listing: the server always sends the complete list of
projects and filtering is done client-side based on query params. You'll want to handle any visits
between `/projects/?sort=date` and `/projects/?sort=title` yourself, telling swup nothing has
changed and no page load is necessary.

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

## timeout

Swup allows setting a fetch timeout in milliseconds. If a page takes longer to load than specified,
swup triggers a `fetch:timeout` hook and defers to a standard browser page load. Disabled by default.

```javascript
{
  timeout: 10_000
}
```

## animateHistoryBrowsing

Swup will skip animations for visits triggered by the back/forward button. If you do require
animations on history visits, set this to `true`. Swup will add the class `is-popstate` to the html
tag during those animations. Defaults to `false`.

```javascript
{
  animateHistoryBrowsing: false
}
```

> **Warning** This option was added due to popular request. However, it should be used with
> caution. When activated, swup has to disable native [browser scroll restoration](https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration).
> Scroll positions will not be preserved between visits and need to be implemented by you.
