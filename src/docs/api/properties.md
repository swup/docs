---
layout: default
title: Properties
eleventyNavigation:
  key: Properties
  parent: API
  order: 2
description: Properties available on the swup instance
permalink: /api/properties/
---

# Properties

A few properties available on the swup instance that could be helpful.

## options

Current [options](/options/), after merging swup defaults and user options.

## plugins

Array of all [plugin](/plugins/) instances currently enabled on swup.

## location

The location of the page last navigated to, after any redirects. This object inherits all properties
from a native [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object, with an additional
`url` property that combines path and query param.

```js
swup.location.href     // https://example.net/path?query#hash
swup.location.url      // /path?query
swup.location.pathname // /path
swup.location.search   // ?query
swup.location.hash     // #hash
```

## currentPageUrl

The URL of the page last navigated to, after any redirects.

> [!NOTE] This property is deprecated, use `swup.location.url` instead.
