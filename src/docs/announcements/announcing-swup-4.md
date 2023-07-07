---
layout: default
title: Announcing swup 4
eleventyNavigation:
  title: Announcing swup 4 🎉
  parent: Announcements
  order: 1
description: Announcing the latest release of swup
permalink: /announcements/announcing-swup-4/
---

# Announcing swup 4

The swup team is excited to announce swup 4 🎉

[Swup](https://swup.js.org/) is a versatile and extensible page transition library for
server-rendered websites. It manages the complete page load lifecycle and smoothly transitions
between the current and next page.

## What’s new in this release

- [Built-in scroll support](#scroll-support)
- [Local animation scope](#local-animation-scope)
- [Hook system for easier customization](#hook-system)
- [Global context object in all callbacks](#global-context-object)
- [Cache pruning strategies](#cache-pruning)
- [Official Astro integration](#astro-integration)
- [Fragment plugin for dynamic container replacement](#fragment-plugin)
- [Sync plugin for combining in and out animations](#sync-plugin)

## Upgrading

Some of these new features are breaking changes and will require modifications to your project.
Please review this [migration guide](/getting-started/upgrading) for details.

## Features

### Built-in scroll support {#scroll-support}

Swup 4 will correctly reset the scroll position after each navigation, as well as scroll to `#anchor`
links on the same page. The scroll plugin is no longer required for recreating basic browser
behavior. If you need animated scrolling, custom scroll offsets, and other advanced customization,
feel free to keep using the [scroll plugin](/plugins/scroll-plugin/).

### Local animation scope

Swup 4 allows customizing which elements the [transition classes](/getting-started/how-it-works/#transition-classes)
are added to. The default and recommended way is still adding them globally on the `html` tag.
However, there is a new [animationScope](/options/#animation-scope) option to add the classes on
the content containers themselves instead.

```js
const swup = new Swup({ animationScope: 'containers' });
```

```html
<main id="swup" class="is-animating is-leaving">
  Content
</main>
```

### Hook system for easier customization {#hook-system}

Swup 4 comes with a new hook system that allows more customization and replaces the previous events
implementation. Among other features, handlers can pause transitions by returning a Promise, they
receive a context object to customize transitions, and they can replace the internal default handler
completely. See [Hooks](/hooks/) for details and examples.

Pausing execution is as easy as returning a `Promise` or `await`ing a custom function:

```javascript
swup.hooks.on('transitionStart', async () => {
  // Delay the start of the transition until the Promise is resolved
  await myCustomFunction();
});
```

Hooks can be run once, before the internal handler, or even replace the internal handler entirely:

```javascript
swup.hooks.once('animationInDone', () => {
  // Only executes once, then removes the handler
});

swup.hooks.before('replaceContent', () => {
  // Executes before the internal default handler
});

swup.hooks.replace('replaceContent', () => {
  // Replaces the internal handler with a custom implementation
});
```

### Global context object

Along with a new hook system, Swup 4 introduces a global context object that holds information
about the current page visit, such as the previous and next URL, the containers to replace, the
element and event that triggered the visit, etc. It's available to all hook handlers as their
first argument. By manipulating the context object, you can control how swup will transition to
the new page. See [Context](/context/) for details and examples.

Access the current and next url from a hook:

```javascript
swup.hooks.on('transitionStart', (context) => {
  console.log('Going from', context.to.url, 'to', context.from.url);
});
```

Access the link element and click event that triggered the current visit:

```javascript
swup.hooks.on('transitionStart', (context) => {
  console.log('Link', context.trigger.el, 'clicked in event', context.trigger.event);
});
```

Disable animations on the current visit:

```js
swup.hooks.on('transitionStart', (context) => {
  context.transition.animate = false;
});
```

Change which containers will be replaced on the current visit:

```javascript
swup.hooks.on('transitionStart', (context) => {
  context.containers = ['#sidebar'];
});
```

Check if the current visit was triggered by the backward/forward button of the browser.

```javascript
swup.hooks.before('transitionStart', (context) => {
  if (context.history.popstate) {
    console.log('History visit');
  }
});
```

### Cache pruning strategies {#cache-pruning}

Swup's built-in cache is simple enough to not require regular cache pruning. For projects that do
have special requirements, we now offer hooks and methods for implementing custom cache pruning
strategies. See [cache pruning](/api/cache/#cache-pruning) for details and examples.

## Integrations

### Official Astro integration {#astro-integration}

[Astro](https://astro.build/) and swup are a great fit. Where Astro manages the rendering of your
site, swup takes over on the client side to add smooth page transitions, smart preloading, and
caching. This has of course always been available for you to set up manually.

Now there is an [official Astro integration for swup](https://github.com/swup/astro) for getting
started quickly. It comes with fade transitions, sane default options, and the most handy plugins
for performance and accessibility out-of-the-box.

## Plugins

All official [plugins](/plugins/) have been updated for compatibility with swup 4.

Additionally, we're happy to present two new plugins that were made possible by the architectural
changes to swup introduced in the new version. They enable rather advanced use cases.

### Fragment Plugin

TO-DO

### Sync Plugin

TO-DO
