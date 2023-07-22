---
layout: default
title: Upgrading
eleventyNavigation:
  key: Upgrading
  parent: Getting Started
  order: 7
description: Instructions on upgrading swup in your projects
permalink: /getting-started/upgrading/
---

# Upgrading

Upgrade your project from swup 3 to 4.

If you're upgrading from swup 2, see [Upgrading from swup 2 to 3](/getting-started/upgrading-v3/).

## New features

Swup 4 introduces new features to become more customizable and enable advanced use cases. Some of the
highlights are a new hook system, a visit object available in hook handlers, and built-in scroll support.
See the [release announcement](/announcements/swup-4/) for a full list of everything that's new.

## Breaking changes

There are breaking changes in this release that will require modifications to projects using
swup. If you only use swup for simple page transitions, you might not need to touch your code.
However, if you make use of events, custom transitions or overwrite methods on the swup instance,
you might want to take some more time to review these changes below and modify your site where
necessary.

## Install the latest version

Install the latest version from npm:

```shell
npm install swup@latest
```

If you're loading swup from a CDN, update the version constraint:

```html
<script src="https://unpkg.com/swup@3"></script> // [!code --]
<script src="https://unpkg.com/swup@4"></script> // [!code ++]
```

Repeat this process for any of the plugins you are using.

## Scroll support

Swup 4 will correctly reset the scroll position after each navigation, as well as scroll to `#anchor`
links on the same page. The scroll plugin is no longer required for recreating basic browser
behavior. If you need animated scrolling, custom offsets, and other customization, keep using the
[scroll plugin](/plugins/scroll-plugin/).

## New hook system

Swup 4 comes with a new [hook system](/hooks/) that allows more flexibility and replaces the previous events
implementation. Among other features, handlers can now pause execution by returning a Promise, or
replace the internal default handler completely. See [Hooks](/hooks/) for details and more examples.

All hook-related functions now live on the `hooks` instance of swup:

```js
swup.on('pageView', () => {}) // [!code --]
swup.hooks.on('page:view', () => {}) // [!code ++]
```

```js
swup.off('pageView', handler) // [!code --]
swup.hooks.off('page:view', handler) // [!code ++]
```

### Hook names

For easier grouping, hook names are consistently namespaced and in present tense:

- `pageView` → `page:view`
- `clickLink` → `link:click`
- `contentReplaced` → `content:replace`
- `serverError` → `fetch:error`
- etc.

To clarify the lifecycle, the transition hooks have been renamed to visit:

- `transitionStart` → `visit:start`
- `transitionEnd` → `visit:end`

Some hooks were removed entirely:

The old `willReplaceContent` and `contentReplaced` events are superseded by a single `content:replace`
hook. Since swup can now register handlers to run _before_ a specific hook, it serves both use cases:

```js
// Run right before the content is replaced
swup.on('willReplaceContent', () => {}) // [!code --]
swup.hooks.before('content:replace', () => {}) // [!code ++]
```

```js
// Run directly after the content was replaced
swup.on('contentReplaced', () => {}) // [!code --]
swup.hooks.on('content:replace', () => {}) // [!code ++]
```

The `pageRetrievedFromCache` event has been removed. There is now only a single `page:load` hook
that fires whenever a page was loaded. Check its boolean `cache` parameter to know if the page was
loaded from cache or not.

```js
swup.on('pageRetrievedFromCache', () => {}); // [!code --]
swup.hooks.on('page:load', (_, { page, cache }) => { /* cache is true or false */ }); // [!code ++]
```

## Visit object

Along with a new hook system, Swup 4 introduces a [visit object](/visit/) that holds
information about the current page visit, like the previous and next URL or the element and event
that triggered the visit. See [Visit](/visit/) for details and more examples.

```javascript
// Get the next URL and the link element that was clicked
swup.hooks.on('page:view', (visit) => {
  console.log('New page: ', visit.to.url);
  console.log('Triggered by: ', visit.trigger.el);
});

// Disable animations on the upcoming visit
swup.hooks.on('visit:start', (visit) => {
  visit.animation.animate = false;
});
```

The `visit` object replaces the `transition` object of swup 3.

```js
swup.on('transitionStart', () => { // [!code --]
  console.log('Visit to', swup.transition.to); // [!code --]
  console.log('Animation name', swup.transition.custom); // [!code --]
}); // [!code --]
swup.hooks.on('visit:start', (visit) => { // [!code ++]
  console.log('Visit to', visit.to.url); // [!code ++]
  console.log('Animation name', visit.animation.name); // [!code ++]
}); // [!code ++]
```

## Cache API

The cache has been simplified. It no longer requires passing in the title,
containers, or body class of the page. Only the URL and HTML response are required. Please review
the [Cache](/api/cache/) docs if you access it directly in your code.

```js
swup.cache.cacheUrl({ // [!code --]
  url: '/about', // [!code --]
  title: 'About', // [!code --]
  blocks: ['<div id="swup"></div>'], // [!code --]
  originalContent: '<html>...</html>', // [!code --]
  pageClass: 'about', // [!code --]
  responseURL: '/team' // [!code --]
}); // [!code --]
swup.cache.set('/about', { url: '/about', html: '<html>...</html>' }); // [!code ++]
```

## Navigation method

The method `swup.loadPage({ url })` has been renamed to `swup.navigate(url)` for clarity.

```js
swup.loadPage({ url: '/about' }); // [!code --]
swup.navigate('/about'); // [!code ++]
```

## Custom animation attribute

To improve clarity around naming, the attribute for choosing a custom animation is now properly called
`data-swup-animation`.

```html
<a href="/about/" data-swup-transition="slide">About</a> // [!code --]
<a href="/about/" data-swup-animation="slide">About</a> // [!code ++]
```

## Unique container selectors

Swup 4 will only match and replace a single element for each container selector. Previously, each
selector would match as many elements as found on the page. We recommend only using id attributes or
other unique identifiers for container selectors.

```html
<div class="section">Navigation</div> // [!code --]
<div class="section">Content</div> // [!code --]
<div id="nav" class="section">Navigation</div> // [!code ++]
<div id="content" class="section">Content</div> // [!code ++]
```

```js
const swup = new Swup({
  containers: ['.section'] // [!code --]
  containers: ['#nav', '#content'] // [!code ++]
})
```

## Container attributes

Swup 4 will no longer add `[data-swup]` attributes to containers.

```html
<div id="swup" class="transition-page" data-swup="0"></div> // [!code --]
<div id="swup" class="transition-page"></div> // [!code ++]
```

## Custom payloads

Going forward, only complete HTML responses are allowed from the server. Previously, swup supported
sending custom payloads by using the Custom Payload Plugin or overloading the `getPageData` method
directly. This change was done to drastically simplify library complexity and allow more flexibility
for other more common use cases like dynamically setting content containers. If you require custom
payloads, we recommend sticking with swup 3.

```js
const swup = new Swup({
  plugins: [new SwupCustomPayloadPlugin()] // [!code --]
  // no longer supported // [!code ++]
});
```

```js
swup.getPageData = (req) => JSON.parse(req.textContent); // [!code --]
// no longer supported // [!code ++]
```

## Browser support

Swup 4 removes support for CSS vendor prefixes on animation and transition properties. In practical
terms, this won't reduce browser support, but it's probably a good idea to check the compatibility
tables for [transitions](https://caniuse.com/?search=transition) and
[animations](https://caniuse.com/?search=animation). In case you need to support Safari 8 or lower,
you might want to stick with swup 3.

```css
.transition-page {
  -webkit-transition: opacity 200ms; // [!code --]
  transition: opacity 200ms; // [!code ++]
}
```

## Plugin authors

### Hooks

As mentioned above, switch from events to hooks:

```js
this.swup.on('contentReplaced', () => {}); // [!code --]
this.swup.hooks.on('content:replace', () => {}); // [!code ++]
```

Creating custom hooks has changed:

```js
this.swup._handlers.formSubmit = []; // [!code --]
this.swup.hooks.create('form:submit'); // [!code ++]
```

As has triggering a hook:

```js
this.swup.triggerEvent('formSubmit'); // [!code --]
this.swup.hooks.call('form:submit'); // [!code ++]
```

If you need wait for all handlers to finish before continuing, `await` the call:

```js
this.swup.triggerEvent('formSubmit'); // [!code --]
await this.swup.hooks.call('form:submit'); // [!code ++]
```

If you need to replace swup's internal handler for a custom implementation, don't replace the
instance method. Instead, specify that your hook handler should replace the internal one.

```js
this.swup.replaceContent = () => { /* custom implementation */ }; // [!code --]
this.swup.hooks.replace('content:replace', () => { /* custom implementation */ }); // [!code ++]
```
