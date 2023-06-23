---
layout: default
title: Cache
eleventyNavigation:
  key: Cache
  parent: API
  order: 5
description: Swup's cache and its interface
permalink: /api/cache/
---

# Cache

Swup's cache is available as `swup.cache`. See below for the available methods.

## cacheUrl

Create a cache record. Requies `url` and `html` properties.

```javascript
swup.cache.cacheUrl({
  url: '/about',
  html: '<html>...</html>'
});
```

## getPage

Return the page object if the given URL is cached, `undefined` otherwise.

```javascript
const page = swup.cache.getPage('/about');
```

## getCurrentPage

Return the page object of the current page.

```javascript
const page = swup.cache.getCurrentPage();
```

## exists

Check if the given URL has been cached.

```javascript
if (swup.cache.exists('/about')) { /* */ }
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
