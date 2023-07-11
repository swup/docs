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
highlights are a new hook system, a global context object, and built-in scroll support.
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

```diff
- <script src="https://unpkg.com/swup@3"></script>
+ <script src="https://unpkg.com/swup@4"></script>
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

```diff
-  swup.on('pageView', () => {})
+  swup.hooks.on('pageView', () => {})
```

```diff
-  swup.off('pageView', handler)
+  swup.hooks.off('pageView', handler)
```

### Removed hooks

Some hooks were removed or renamed.

#### willReplaceContent & contentReplaced

The old `willReplaceContent` and `contentReplaced` events are superseded by a single `replaceContent`
hook. Since swup can now register handlers to run _before_ a specific hook, it serves both use cases:

```diff
// Run right before the content is replaced
-  swup.on('willReplaceContent', () => {})
+  swup.hooks.before('replaceContent', () => {})
```

```diff
// Run directly after the content was replaced
-  swup.on('contentReplaced', () => {})
+  swup.hooks.on('replaceContent', () => {})
```

#### pageRetrievedFromCache

The `pageRetrievedFromCache` hook has been removed. There is now only a single `pageLoaded` hook
that fires whenever a page was loaded. Check its boolean `cache` parameter to know if the page was
loaded from cache or not.

```diff
- swup.on('pageRetrievedFromCache', () => {});
+ swup.hooks.on('pageLoaded', (context, { page, cache }) => { /* cache is true or false */ });
```

## Context object

Along with a new hook system, Swup 4 introduces a global [context object](/context/) that holds
information about the current page visit, like the previous and next URL or the element and event
that triggered the visit. See [Context](/context/) for details and more examples.

```javascript
// Get the next URL and the link element that was clicked
swup.hooks.on('pageView', (context) => {
  console.log('New page: ', context.to.url);
  console.log('Triggered by: ', context.trigger.el);
});

// Disable animations on the next visit
swup.hooks.before('transitionStart', (context) => {
  context.animation.animate = false;
});
```

The `context` object replaces the `transition` object of swup 3.

```diff
- swup.on('transitionStart', () => {
-   console.log('Visit to', swup.transition.to);
-   console.log('Animation name', swup.transition.custom);
- });
+ swup.hooks.on('transitionStart', (context) => {
+   console.log('Visit to', context.to.url);
+   console.log('Animation name', context.animation.name);
+ });
```

## Cache API

The cache has been simplified. It no longer requires passing in the title,
containers, or body class of the page. Only the URL and HTML response are required. Please review
the [Cache](/api/cache/) docs if you access it directly in your code.

```diff
- swup.cache.cacheUrl({
-   url: '/about',
-   title: 'About',
-   blocks: ['<div id="swup"></div>'],
-   originalContent: '<html>...</html>',
-   pageClass: 'about',
-   responseURL: '/team'
- });
+ swup.cache.set('/about', { url: '/about', html: '<html>...</html>' });
```

## Visit method

The method `swup.loadPage({ url })` has been renamed to `swup.visit(url)` for better clarity.

```diff
- swup.loadPage({ url: '/about' });
+ swup.visit('/about');
```

## Custom animation attribute

To improve clarity around naming, the attribute for choosing a custom animation is now properly called
`data-swup-animation`.

```diff
-  <a href="/about/" data-swup-transition="slide">About</a>
+  <a href="/about/" data-swup-animation="slide">About</a>
```

## Unique container selectors

Swup 4 will only match and replace a single element for each container selector. Previously, each
selector would match as many elements as found on the page. We recommend only using id attributes or
other unique identifiers for container selectors.

```diff
-  <div class="section">Navigation</div>
-  <div class="section">Content</div>
+  <div id="nav" class="section">Navigation</div>
+  <div id="content" class="section">Content</div>
```

```diff
const swup = new Swup({
-  containers: ['.section']
+  containers: ['#nav', '#content']
})
```

## Container attributes

Swup 4 will no longer add `[data-swup]` attributes to containers.

```diff
-  <div id="swup" class="transition-page" data-swup="0"></div>
+  <div id="swup" class="transition-page"></div>
```

## Custom payloads

Going forward, only complete HTML responses are allowed from the server. Previously, swup supported
sending custom payloads by using the Custom Payload Plugin or overloading the `getPageData` method
directly. This change was done to drastically simplify library complexity and allow more flexibility
for other more common use cases like dynamically setting content containers. If you require custom
payloads, we recommend sticking with swup 3.

```diff
const swup = new Swup({
-  plugins: [new SwupCustomPayloadPlugin()]
+  // no longer supported
});
```

```diff
-  swup.getPageData = (req) => JSON.parse(req.textContent);
+  // no longer supported
```

## Browser support

Swup 4 removes support for CSS vendor prefixes on animation and transition properties. In practical
terms, this won't reduce browser support, but it's probably a good idea to check the compatibility
tables for [transitions](https://caniuse.com/?search=transition) and
[animations](https://caniuse.com/?search=animation). In case you need to support Safari 8 or lower,
you might want to stick with swup 3.

```diff
.transition-page {
-  -webkit-transition: opacity 200ms;
+  transition: opacity 200ms;
}
```

## Plugin authors

### Hooks

As mentioned above, switch from events to hooks:

```diff
-  this.swup.on('willReplaceContent', () => {})
+  this.swup.hooks.before('replaceContent', () => {})
```

Creating custom hooks has changed:

```diff
- this.swup._handlers.formSubmit = [];
+ this.swup.hooks.create('formSubmit');
```

As has triggering a hook:

```diff
- this.swup.triggerEvent('formSubmit');
+ this.swup.hooks.trigger('formSubmit');
```

If you need wait for all handlers to finish before continuing, `await` the trigger call:

```diff
- this.swup.triggerEvent('formSubmit');
+ await this.swup.hooks.trigger('formSubmit');
```

If you need to replace swup's internal handler for a custom implementation, don't replace the
instance method. Instead, specify that your hook handler should replace the internal one.

```diff
- this.swup.replaceContent = () => { /* custom implementation */ };
+ this.swup.hooks.replace('replaceContent', () => { /* custom implementation */ });
```
