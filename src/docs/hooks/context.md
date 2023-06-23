---
layout: default
title: Context
eleventyNavigation:
  key: Context
  parent: Hooks
  order: 2
description:
permalink: /hooks/context/
---

# Context

The global context object is a key concept of swup. It contains information about the current page
visit: the current and new URL, the element and event that triggered the visit, as well as details
about whether this visit should be animated.

By manipulating the context object, you can control how swup will transition to the new page.

## Accessing the context object

The context object is available in all hook handlers.

```javascript
swup.hooks.on('pageView', (context) => {
  console.log('New page: ', context.to.url);
});
```

## Shape of the context object

This is an example context object for a visit from `/home` to `/about#footer`.

```javascript
{
  from: { url: '/home' },
  to: { url: '/about' },
  containers: ['#swup'],
  animate: true,
  transition: 'fade',
  trigger: {
    el: /* <a> element */,
    event: /* MouseEvent */
  },
  history: {
    popstate: false,
    action: 'push',
  },
  scroll: {
    reset: true,
    target: '#footer'
  }
}
```

## Use cases

What can we do by manipulating the context object?

### Disable animations for the current visit

```javascript
swup.hooks.before('transitionStart', (context) => {
  context.animate = false;
});
```

### Disable scrolling for the current visit

```javascript
swup.hooks.before('transitionStart', (context) => {
  context.scroll.reset = false;
});
```

### Change the containers about to be replaced

```javascript
swup.hooks.before('transitionStart', (context) => {
  context.containers = ['#sidebar'];
});
```

### Set a custom transition for the current visit

```javascript
swup.hooks.before('transitionStart', (context) => {
  context.transition = 'slide';
});
```

### Access the event that triggered the visit

```javascript
swup.hooks.before('transitionStart', (context) => {
  console.log('Click event', context.trigger.event); // MouseEvent
});
```

### Access the element that triggered the visit

```javascript
swup.hooks.before('transitionStart', (context) => {
  console.log('Clicked link', context.trigger.el); // HTMLAnchorElement
});
```

### Check if the current visit is a browser history visit

```javascript
swup.hooks.before('transitionStart', (context) => {
  console.log('History visit?', context.history.popstate);
});
```
