---
layout: default
title: Variables
description: A few variables accessible in swup instance that could be helpful
nav_order: 4
parent: API
permalink: /api/variables
---

# Variables
A few variables accessible in swup instance that could be helpful.

## transition
Holds information about latest transition in a form of object. 
Variable is always set right at the beginning of transition (after `loadPage` method call) so it can be used further on. 

```javascript
swup.transition = {
    from: 'homepage',   // route of previous page
    to: 'docs',         // route of next page
    custom: 'slide-in'  // content 'data-swup-transition' attribute or content of customTransition property passed to loadPage method
}
```

## options
Holds currently set options after merging set options.

## scrollToElement
Holds id of element that swup needs to scroll to after content replace (`href="/docs#this_is_scrollToElement"`).

## plugins
Array of all plugin instances currently enabled on swup. 
