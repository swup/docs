---
layout: default
title: Variables
description: A few variables accessible in swup instance that could be helpful
nav_order: 4
parent: API
permalink: /api/variables/
---

# Variables

A few variables accessible in swup instance that could be helpful.

## transition

Holds information about the latest transition. Set at the beginning of the current transition to be used further on (right after the `loadPage` method call).

```javascript
swup.transition === {
    from: '/about',     // route of previous page
    to: '/team',        // route of next page
    custom: 'slide-in'  // content of [data-swup-transition] attribute or customTransition property passed to loadPage()
}
```

## currentPageUrl

The URL of the page last navigated to, after any redirects.

## options

Current options, after merging swup defaults and user options.

## plugins

Array of all plugin instances currently enabled on swup.

## scrollToElement

Holds the hash/id of any element that needs to be scrolled to after navigation. Used by the scroll plugin.

```javascript
// After clicking a link to /about#team
swup.scrollToElement === '#team'
```
