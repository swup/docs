---
layout: default
title: Cache
eleventyNavigation:
  key: Cache
  parent: API
  order: 4
description: Swup's cache and its interface
permalink: /api/cache/
---

# Cache

Swup's cache is available as `swup.cache`. See below for the available methods.

## cacheUrl

Creates a cache record. The `url`, `title`, `blocks` and `originalContent` properties are required.

```javascript
swup.cache.cacheUrl({
  url: '/url-to-page',
  title: 'Page title',
  blocks: ['<div id="swup"></div>'],
  originalContent: '<html>...</html>',
  pageClass: 'body-class',
  responseURL: '/redirected-url'
});
```

## getPage

Returns the page object if the given URL is cached. Returns `undefined` otherwise.

```javascript
const page = swup.cache.getPage('/about');
```

## getCurrentPage

Returns the page object of the current page.

```javascript
const page = swup.cache.getCurrentPage();
```

## exists

Check if the given URL has been cached.

```javascript
const isCached = swup.cache.exists('/about');
```

## remove

Removes a single page from the cache.

```javascript
swup.cache.remove('/about');
```

## empty

Removes all pages from the cache.

```javascript
swup.cache.empty();
```
