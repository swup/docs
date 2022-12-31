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

## Contents

- [Multiple CSS transitions](#multiple-css-transitions)
- [Link selector](#link-selector)
- [Script import](#script-import)
- [Helper imports](#helper-imports)
- [Plugin authors](#plugin-authors)

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

Swup 3 added a new option for ignoring links via callback function. If you have previously modified the link selector to ignore specific links, you should move those customizations into the new `ignoreVisit` callback and remove the `linkSelector` option.

The `location.origin` check is no longer required as swup will now ensure matching origins itself.

```diff
// Example: ignore links to PDF files
const swup = new Swup({
-  linkSelector: `
-    a[href^="${window.location.origin}"]:not([data-no-swup]):not([href$=".pdf"]),
-    a[href^="/"]:not([data-no-swup]):not([href$=".pdf"]),
-    a[href^="#"]:not([data-no-swup])
-  `
+  ignoreVisit: (href, { el } = {}) => (
+    el?.matches('[data-no-swup], [href$=".pdf"]')
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

#### Removed helpers

Some helpers have been removed entirely, some replaced by new ones.

The `Link` helper, used internally for parsing URL parts from link elements, has been removed in favor of a new `Location` helper.

```diff
- import { Link } from 'swup/lib/helpers';
- const url = new Link(linkEl.href).getAddress();
- const hash = new Link(linkEl.href).getHash();
+ import { Location } from 'swup/helpers';
+ const { url, hash } = Location.fromElement(linkEl);
```

### Plugin authors

#### Update import paths of helpers and utils

- `swup/lib/helpers` → `swup/helpers`
- `swup/lib/utils` → `swup/utils`

#### Switch to `Location` helper

Use the new `Location` helper for parsing URLs instead of the old `Link` class.

```js
import { Location } from 'swup/helpers';
const { url, hash } = Location.fromElement(linkEl);
```

#### Use event delegation helper

Swup now bundles its event delegation library. Plugins will no longer have to install and bundle `delegate-it` or similar packages. Instead, use the `delegateEvent` helper on the swup instance. The delegate parent `document` is assumed.

```diff
- import delegate from 'delegate-it';
- this.swup.delegatedListeners.formSubmit = delegate(
-   document,
-   this.options.formSelector,
-   'submit',
-   this.onFormSubmit.bind(this)
- );
+ this.swup.delegatedListeners.formSubmit = this.swup.delegateEvent(
+   this.options.formSelector,
+   'submit',
+   this.onFormSubmit.bind(this)
+ );
```

Removing delegated listeners on unmount works the same as before:

```js
this.swup.delegatedListeners.formSubmit.destroy();
```
