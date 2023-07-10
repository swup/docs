---
layout: default
title: Announcing swup 4
eleventyNavigation:
  title: Announcing swup 4 🎉
  parent: Announcements
  order: 1
description: Announcing the latest release of swup
permalink: /announcements/swup-4/
---

# Announcing swup 4

The swup team is excited to announce swup 4 🎉

## What is swup?

[Swup](https://swup.js.org/) is a versatile and extensible **page transition library** for server-rendered websites.
It manages the complete page load lifecycle and smoothly animates between the current and next
page. In addition, it offers many other quality-of-life improvements like **caching**, **smart preloading**,
native **browser history** and enhanced **accessibility**.

Make your site feel like a snappy single-page app — without any of the complexity.

## What’s new in this release

- [Official Astro integration](#astro-integration)
- [Built-in scroll support](#scroll-support)
- [Local animation scope](#local-animation-scope)
- [Hook system for easier customization](#hook-system)
- [Global context object in all callbacks](#global-context-object)
- [Cache pruning strategies](#cache-pruning)
- [Fragment Plugin for dynamic container replacement](#fragment-plugin)
- [Parallel Plugin for combined in and out animations](#parallel-plugin)

## Upgrading

Some of these new features are breaking changes and will require modifications to your project.
Please review this [migration guide](/getting-started/upgrading) for details.

## Official Astro integration {#astro-integration}

[Astro](https://astro.build/) and swup are a great fit. Where Astro manages the rendering of your
site, swup takes over on the client side to add animated page transitions, caching and smart
preloading to make everything feel smooth and snappy. This has of course always been available for
you to set up manually.

Now there is an [official Astro integration for swup](https://github.com/swup/astro) for getting
started quickly. It comes with fade animations, sane default options, and the most handy plugins
for performance and accessibility out-of-the-box. Astro's bundling and module loading ensures we're
not hurting performance by only loading swup once the page has finished rendering.

## Features

### Built-in scroll support {#scroll-support}

Swup 4 will correctly reset the scroll position after each navigation, as well as scroll to `#anchor`
links on the same page. The scroll plugin is no longer required for recreating basic browser
behavior. If you need animated scrolling, custom scroll offsets, and other advanced customization,
feel free to keep using the [scroll plugin](/plugins/scroll-plugin/).

### Local animation scope

Swup 4 allows customizing which elements the [animation classes](/getting-started/how-it-works/#animation-classes)
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
  context.animation.animate = false;
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

## Plugins

All official [plugins](/plugins/) have been updated for compatibility with swup 4.

Additionally, we're happy to present two advanced new plugins that were made possible by some of the
architectural changes to swup introduced in the new version.

### Fragment Plugin

The new [Fragment Plugin](/plugins/fragment-plugin/) allows selectively updating dynamic fragments
instead of the main content containers, based on custom rules. Animating only the parts of the page
that have actually changed is a great way of communicating context and improving orientation.
Imagine the two scenarios below:

- a filter UI that live-updates a list of results on every interaction
- a detail overlay that pushes on top of the currently open content

Both of these require updating only a small page fragment instead of doing a full page transition.
Head over to the [plugin readme](/plugins/fragment-plugin/) to learn more about enabling fragment
visits in these scenarios.

<!-- GIF of Fragment Plugin in action -->

### Parallel Plugin

The new [Parallel Plugin](/plugins/parallel-plugin/) enables a feature requested by many users:
running out and in animation at the same time, i.e. in parallel. To do this, the plugin will
keep the previous container around for the duration of the transition. Complex layouts like overlays,
stacks and side-by-side slideshows are now much easier to implement. Head over to the
[plugin readme](/plugins/parallel-plugin/) for more information and example code.

<!-- GIF of Parallel Plugin in action -->
