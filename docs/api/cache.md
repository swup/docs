---
layout: default
title: Cache
nav_order: 2
parent: API
permalink: /api/cache
---

# Cache
Swup cache methods.

## cacheUrl
Creates a cache record.
```javascript
swup.cacheUrl({
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
swup.getPage('/docs');
```

## getCurrentPage
Returns page object of current page.
```javascript
swup.getCurrentPage();
```

## getCurrentPage
Returns page object of current page.
```javascript
swup.getCurrentPage();
```

## exists
Returns whether page exist in cache based on passed url.
```javascript
swup.exists('/docs');   // true/false
```

## remove
Removes single record from cache based on passed url. 
```javascript
swup.empty('/docs');
```

## empty
Removes all records from cache. 
```javascript
swup.empty();
```