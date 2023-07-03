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

Swup 4 introduces new features to become more customizable, and easier to work with.

- [Built-in scroll support](#scroll-support)
- [Hook system for easier customization](#hook-system)
- [Global context object in all callbacks](#global-context-object)
- [Fragment plugin for dynamic container replacement](#fragment-plugin)
- [Sync plugin for combining in and out animations](#sync-plugin)

## Upgrading

Some of these new features are breaking changes and will require modifications to your project.
Please review this [migration guide](/getting-started/upgrading) for details.

## New features

### Built-in scroll support {#scroll-support}

Swup 4 will correctly reset the scroll position after each navigation, as well as scroll to `#anchor`
links on the same page. The scroll plugin is no longer required for recreating basic browser
behavior. If you need animated scrolling, custom scroll offsets and other advanced customisation,
feel free to keep using the [scroll plugin](/plugins/scroll-plugin/).

### Hook system for easier customization {#hook-system}

Swup 4 comes with a new hook system that allows more flexibility and replaces the previous events
implementation. Among other features, handlers can now pause execution by returning a Promise or
replace the internal default handler completely. See [Hooks](/hooks/) for details and examples.

All hook-related functions now live on the `hooks` instance of swup:

```diff
-  swup.on('pageView', () => {})
+  swup.hooks.on('pageView', () => {})
```

```diff
-  swup.off('pageView', handler)
+  swup.hooks.off('pageView', handler)
```

### Global context object

Along with a new hook system, Swup 4 introduces a global context object that holds information
about the current page visit, such as previous and next URL, the containers to replace, the element and
event that triggered the visit, etc. It's available to all hook handlers as their first argument.
Manipulating its properties allows modifying swup's behavior to a considerable degree.
See [Context](/context/) for details and examples.

```javascript
// Get the next URL and the link element that was clicked
swup.hooks.on('pageView', (context) => {
  console.log('New page: ', context.to.url);
  console.log('Triggered by: ', context.trigger.el);
});

// Disable animations on the next visit
swup.hooks.before('transitionStart', (context) => {
  context.transition.animate = false;
});
```

## New plugins

### Fragment Plugin

TO-DO

### Sync Plugin

TO-DO
