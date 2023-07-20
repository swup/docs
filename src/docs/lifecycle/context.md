---
layout: default
title: Visit
eleventyNavigation:
  key: Visit
  parent: Lifecycle
  order: 2
description:
permalink: /visit/
---

# Visit

The visit object contains information about the current page visit: the current and new
URL, the element and event that triggered the visit, as well as details about whether this visit
should be animated and which containers should be replaced.

By manipulating the visit object, you can control how swup will navigate to the new page.

## Accessing the visit object

The visit object is available in all hook handlers.

```javascript
swup.hooks.on('page:view', (visit) => {
  console.log('New page: ', visit.to.url);
});
```

## Shape of the visit object

This is an example visit object for a navigation from `/home` to `/about#footer`.

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
    action: 'push',
    popstate: false,
    direction: undefined
  },
  scroll: {
    reset: true,
    target: '#footer'
  }
}
```

## Use cases

What can we do by manipulating the visit object? A few examples are listed below.

Note that the most convenient place to hook into is on `visit:start` — all the information about the
current visit is already there, but no requests or animations have started yet.

### Disable animations

The new page will load instantaneously without animations.

```javascript
swup.hooks.on('visit:start', (visit) => {
  visit.animation.animate = false;
});
```

### Custom animation

Set a custom `.to-{name}` class on the html element to allow targeting via CSS.

```javascript
swup.hooks.on('visit:start', (visit) => {
  visit.animation.name = 'slide';
});
```

### Disable scroll reset

The current scroll position will be kept after the new page was loaded.

```javascript
swup.hooks.on('visit:start', (visit) => {
  visit.scroll.reset = false;
});
```

### Dynamic containers

Change which [content containers](/options/#containers) will be replaced on the current visit.

```javascript
swup.hooks.on('visit:start', (visit) => {
  visit.containers = ['#sidebar'];
});
```

### Access trigger element

Inspect the DOM element that triggered the current visit. Most probably a link element or undefined
if triggered via the API.

```javascript
swup.hooks.on('visit:start', (visit) => {
  console.log('Clicked link', visit.trigger.el); // HTMLAnchorElement
});
```

### Access trigger event

Inspect the DOM event that triggered the current visit. Most probably a click event or undefined
if triggered via the API.

```javascript
swup.hooks.on('visit:start', (visit) => {
  console.log('Click event', visit.trigger.event); // MouseEvent
});
```

### Identify history visits

Check if the current visit was triggered by the back/forward button of the browser. The
`popstate` key is a boolean indicating a history visit. The `direction` key holds information
about the direction of travel: `forwards`, `backwards`, or `undefined`.

```javascript
swup.hooks.on('visit:start', (visit) => {
  if (visit.history.popstate) {
    console.log('History visit', visit.history.direction);
  }
});
```
