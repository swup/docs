---
layout: default
title: Helpers
description: Helpers that can be used for developing plugins, themes or anything else around swup
nav_order: 3
parent: API
permalink: /api/helpers
---

# Helpers

Helpers that can be used for developing plugins, themes or anything else around swup.
Helpers can be accessed from npm under `swup/lib/helpers`.

```javascript
import { classify } from 'swup/lib/helpers'; 
```

## classify

Accepts a string and return a url/classname friendly form of the string.

## createHistoryRecord

Creates a history record with all necessary information.
Accepts url and uses it in a `history.pushState`.

## fetch

Accepts options and a callback that gets executed when request is resolved.
Default options:

```javascript
let options = {
    url: window.location.pathname + window.location.search,
    method: 'GET',
    data: null,
    header: {},
};
```

A response object is passed into a callback.

## getCurrentUrl

Return current page url.

## getDataFromHtml

Accepts two arguments - html content and array of container selectors (swup [container option]({{ "/options#containers" | relative_url }})).
Returns object required for cache.

## transitionEnd

Function that returns a correct supported form of `transitionend` event.
