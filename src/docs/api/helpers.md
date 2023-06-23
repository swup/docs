---
layout: default
title: Helpers
eleventyNavigation:
  key: Helpers
  parent: API
  order: 4
description: Helpers that can be used for developing plugins, themes or anything else around swup
permalink: /api/helpers/
---

# Helpers

Helpers that can be used for developing plugins, themes or anything else around swup.

```javascript
import { getCurrentUrl, updateHistoryRecord } from 'swup';
```

## Location

A class used internally for parsing and passing around URLs. Very thin wrapper around the native `URL` object with an additional `url` getter for the path including query params.

Parse a URL from a string:

```javascript
const href = 'http://example.net/about#anchor';
const { url, hash } = Location.fromUrl(href);
// url = /about
// hash = #anchor
```

Parse a URL from a link element:

```javascript
// const linkEl = <a href="http://example.net/about#anchor">
const { url, hash } = Location.fromElement(linkEl);
```

## classify

Sanitize a string for use in CSS classnames or URL slugs.

`Lorem ipsum` → `lorem-ipsum`

```javascript
const className = classify('Lorem ipsum');
```

## createHistoryRecord

Create a new history record via `history.pushState`, appending custom data as well as internal metadata that swup will recognize as its own.

```javascript
createHistoryRecord('/new-page', { custom: 'data' });
```

## updateHistoryRecord

Update the current history record via `history.replaceState`, adding custom data as well as internal metadata that swup will recognize as its own.

```javascript
updateHistoryRecord(null, { custom: 'data' });
```

## delegateEvent

Install a delegated event listener on the document using `delegate-it`.

```javascript
swup.delegatedListeners.formSubmit = delegateEvent('form', 'submit', (event) =>
  console.log('Form submitted')
);
```

Make sure to remove the listener on unmount of a plugin:

```javascript
swup.delegatedListeners.formSubmit.destroy();
```

## fetch

Wrapper around swup's XHR request implementation. Receives an options object and a callback that resolves with the finished request object.

```javascript
fetch('/about', { method: 'POST', data: {} }, (req) => {
  if (req.status !== 500) {
    /* process response */
  }
});
```

## getCurrentUrl

Return the current page's url.
