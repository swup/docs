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

This is a guide for upgrading from swup 3 to 4.

If you're upgrading from swup 2, see [Upgrading from swup 2 to 3](/getting-started/upgrading-v3/).

## Upgrading from swup 3 to 4

Swup 4 introduces a few major changes that will require some modifications to most websites.
While there is a thin compatibility layer — meaning most projects should keep running fine — it's a
good idea to review the changes and update any calls to newly deprecated functionality.

### Install the latest version

Install the latest version from npm:

```shell
npm install swup@latest
```

If you're loading swup from a CDN, update the version constraint:

```diff
- <script src="https://unpkg.com/swup@3"></script>
+ <script src="https://unpkg.com/swup@4"></script>
```

### New hook system

Swup 4 comes with a new hook system that allows more flexibility and replaces the previous events
implementation. Among other features, handlers can now pause execution by returning a Promise or
replace the internal default handler completely. See [Hooks](/hooks/) for details and updated examples.

All hook-related functions now live on the `hooks` instance of swup:

```diff
-  swup.on('pageView', () => {})
+  swup.hooks.on('pageView', () => {})
```

```diff
-  swup.off('pageView', handler)
+  swup.hooks.off('pageView', handler)
```

#### Removed hooks

The old `willReplaceContent` and `contentReplaced` events are superseded by a single `replaceContent`
hook. Since you can now register handlers to run *before* a specific hook, it serves both use cases:

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

### Container attributes

Swup 4 will no longer add `[data-swup]` attributes to containers.

```diff
-  <div id="swup" class="transition-page" data-swup="0"></div>
+  <div id="swup" class="transition-page"></div>
```

If you require these attributes e.g. for styling, here's a way of manually adding them back:

```javascript
// ???
```

### Custom payloads

Going forward, only pure HTML responses are allowed from the server. Previously, swup supported
sending and parsing custom JSON payloads by using the Custom Payload Plugin or overloading the
`getPageData` method directly. This change was done to drastically simplify library complexity and
allow more flexibility for other more common use cases.

```diff
-  const swup = new Swup({
-    plugins: [new SwupCustomPayloadPlugin()]
-  });
+  // no longer supported
```

```diff
-  swup.getPageData = (req) => JSON.parse(req.textContent);
+  // no longer supported
```

### Browser support

Swup 4 removes support for CSS vendor prefixes on animation and transition properties. In practical
terms, this won't reduce browser support, but it's probably a good idea to check the compatiblity
tables for [transitions](https://caniuse.com/?search=transition) and
[animations](https://caniuse.com/?search=animation). In case you need to support Safari 8 or lower,
you might want to stick with swup 3.

```diff
.transition-page {
-  -webkit-transition: opacity 200ms;
+  transition: opacity 200ms;
}
```

### Plugin authors

???
