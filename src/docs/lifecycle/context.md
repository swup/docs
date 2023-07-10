---
layout: default
title: Context
eleventyNavigation:
  key: Context
  parent: Lifecycle
  order: 2
description:
permalink: /context/
---

# Context

The global context object contains information about the current page visit: the current and new
URL, the element and event that triggered the visit, as well as details about whether this visit
should be animated and which containers should be replaced.

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
  animation: {
    animate: true,
    name: 'fade'
  },
  trigger: {
    el: /* <a> element */,
    event: /* MouseEvent */
  },
  history: {
    popstate: false,
    action: 'push'
  },
  scroll: {
    reset: true,
    target: '#footer'
  }
}
```

## Use cases

What can we do by manipulating the context object? A few examples are listed below.

Note that the most convenient place to hook into is right before `transitionStart` — all the
information about the current visit is already there, but no requests or animations have started
yet.

### Disable animations

The new page will load instantaneously without animations.

```javascript
swup.hooks.before('transitionStart', (context) => {
  context.animation.animate = false;
});
```

### Custom animation

Set a custom `.to-{name}` class on the html element to allow targeting via CSS.

```javascript
swup.hooks.before('transitionStart', (context) => {
  context.animation.name = 'slide';
});
```

### Disable scroll reset

The current scroll position will be kept after the new page was loaded.

```javascript
swup.hooks.before('transitionStart', (context) => {
  context.scroll.reset = false;
});
```

### Dynamic containers

Change which [content containers](/options/#containers) will be replaced on the current visit.

```javascript
swup.hooks.before('transitionStart', (context) => {
  context.containers = ['#sidebar'];
});
```

### Access trigger element

Inspect the DOM element that triggered the current visit. Most probably a link element or undefined
if triggered via the API.

```javascript
swup.hooks.before('transitionStart', (context) => {
  console.log('Clicked link', context.trigger.el); // HTMLAnchorElement
});
```

### Access trigger event

Inspect the DOM event that triggered the current visit. Most probably a click event or undefined
if triggered via the API.

```javascript
swup.hooks.before('transitionStart', (context) => {
  console.log('Click event', context.trigger.event); // MouseEvent
});
```

### Identify history visit

Check if the current visit was triggered by the backward/forward button of the browser.

```javascript
swup.hooks.before('transitionStart', (context) => {
  if (context.history.popstate) {
    console.log('History visit');
  }
});
```
