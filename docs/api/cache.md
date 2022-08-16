---
layout: default
title: Cache
description: Swup cache methods
nav_order: 2
parent: API
permalink: /api/cache
---

# Cache

Swup cache methods.

## cacheUrl

Creates a cache record.

```javascript
swup.cache.cacheUrl({
    title: 'Page title',
    pageClass: 'body-class',
    originalContent: 'html content of page',
    blocks: ['<div id="swup"></div>'],
    responseURL: '/redirected-url'
});
```

## getPage

Returns page object from cache based on passed url.

```javascript
swup.cache.getPage('/docs');
```

## getCurrentPage

Returns page object of current page.

```javascript
swup.cache.getCurrentPage();
```

## exists

Returns whether page exist in cache based on passed url.

```javascript
swup.cache.exists('/docs');   // true/false
```

## remove

Removes single record from cache based on passed url.

```javascript
swup.cache.remove('/docs');
```

## empty

Removes all records from cache.

```javascript
swup.cache.empty();
```
