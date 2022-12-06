---
layout: default
title: Upgrading
description: Instructions on upgrading swup in your projects
nav_order: 7
parent: Getting Started
permalink: /getting-started/upgrading
---

# Upgrading

## Upgrading from swup 2 to 3

Swup 3 is mostly backward-compatible. Most projects should keep running fine after upgrading. However, there's a few situations where you will have to make changes.

### Multiple CSS transitions

Swup 3 will wait for the longest CSS transition to finish before replacing the page content. Previously, swup would only wait for the first transitioned property before continuing. This is a breaking change if you're combining transitions of differing durations in a single container.

```diff
.transition-page {
-  /* completes after 500ms in swup 2 */
+  /* completes after 1000ms in swup 3 */
  transition: opacity 1000ms, color 500ms;
}
```

### Link selector

Swup 3 added a new option for ignoring links via callback function. If you have previously modified the link selector to ignore specific links, you should move those customizations into the new `ignoreLink` callback and remove the `linkSelector` option.

```diff
// Example: ignore links to PDF files
const swup = new Swup({
-  linkSelector: `
-    a[href^="${window.location.origin}"]:not([data-no-swup]):not([href$=".pdf"]),
-    a[href^="/"]:not([data-no-swup]):not([href$=".pdf"]),
-    a[href^="#"]:not([data-no-swup]):not([href$=".pdf"])
-  `
+  ignoreLink: (el) => (
+    el.origin !== window.location.origin ||
+    el.matches('[data-no-swup], [href$=".pdf"]')
+  )
});
```

### Script import

If you're including the UMD version of swup in a script tag, you'll need to update the path.

```diff
- <script src="./dist/swup.js"></script>
+ <script src="./dist/index.umd.js"></script>
```

Same for the CDN version:

```diff
- <script src="https://unpkg.com/swup@2/dist/swup.min.js"></script>
+ <script src="https://unpkg.com/swup@3"></script>
```

### Helper imports

Swup 3 exports ESM modules and defines custom export maps. If you have been importing swup helpers or utils from the `lib` folder directly, you need to update the import paths:

```diff
- import { getPageData } from 'swup/lib/helpers';
+ import { getPageData } from 'swup/helpers';
```
