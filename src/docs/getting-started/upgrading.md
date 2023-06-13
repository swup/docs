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

### Browser support

Swup 4 removes support for CSS vendor prefixes on animation and transition properties. All browsers
released in or after 2015 are prefix-free. If you need to support browsers older than that, check
the compatiblity tables for [transition](https://caniuse.com/?search=transition) and
[animation](https://caniuse.com/?search=animation). Depending on the required support matrix, some
projects might want to stick with swup 3.

```diff
.transition-page {
-  -webkit-transition: opacity 200ms;
+  transition: opacity 200ms;
}
```

### Container attributes

Swup 4 will no longer add `[data-swup]` attributes to containers.

```diff
-  <div id="swup" class="transition-page" data-swup="0"></div>
+  <div id="swup" class="transition-page"></div>
```

If you require these attributes e.g. for styling, here's a way of manually adding them back:

```js
// ???
```

### Plugin authors

???
