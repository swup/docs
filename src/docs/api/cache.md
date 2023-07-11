---
layout: default
title: Cache
eleventyNavigation:
  key: Cache
  parent: API
  order: 5
description: Swup's cache and how to use it.
permalink: /api/cache/
---

# Cache

Swup provides a caching mechanism that stores previously loaded pages in memory. This allows
skipping additional server requests, resulting in faster navigation and smoother transitions for
the users.

The cache is enabled automatically and needs no further customization. If your site is highly
dynamic or doesn't need a cache for other reasons, you can disable it by modifying swup's
[cache option](/options/#cache).

Swup's cache is available at `swup.cache`. See below for all available methods.

## Options

Disable the cache by setting swup's `cache` option:

```js
const swup = new Swup({
  cache: false
});
```

## Properties

### size

The number of cache entries in memory.

```javascript
swup.cache.size; // 13
```

## Methods

### set

Create a cache record for the specified URL. Pass in a page object with a `url` and `html` property.

```javascript
swup.cache.set('/about', { url: '/about', html: '<html>...</html>' });
```

### get

Return the page object if the given URL is cached, `undefined` otherwise.

```javascript
const page = swup.cache.get('/about');
```

### has

Check if the given URL has been cached.

```javascript
if (swup.cache.has('/about')) {
  /* */
}
```

### update

Update a cache record, overwriting or adding custom data. Gets merged with existing data.

```javascript
swup.cache.update('/about', { ttl: 1000, created: Date.now() });
```

### delete

Delete a cache record .

```javascript
swup.cache.delete('/about');
```

### clear

Empty the cache.

```javascript
swup.cache.clear();
```

### prune

Remove all cache entries that match a given condition. Pass in a predicate function
that receives the URL and the page object and returns either `true` to prune or `false` to
keep the page.

```javascript
swup.cache.prune((url, page) => /* true / false */ );
```

## Cache pruning

Swup will not prune the cache on its own. As it only stores simple objects with strings, it should
work fine even across hundreds of page visits. If you still want to prune the cache, you can do so
manually.

The basic strategy is to append custom data with `cache.update()` whenever a page is cached. Later,
manually prune the cache in regular intervals with `cache.prune()`, comparing the previously added
custom data to determine which pages to prune.
