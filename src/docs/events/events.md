---
layout: default
title: Events
eleventyNavigation:
  key: Events
  parent: API
  order: 2
description: Swup emits bunch of events, that we can use to enable JavaScript, trigger analytics, and much more
permalink: /events/
---

# Events

As we are replacing the native lifecycle of a browser visit,
we need events that let us imitate that lifecycle in our scripts.

Swup emits a list of events that can be used to implement custom logic, initialize components, trigger analytics, and much more. Listen to events using the `on()` and `off` methods.

```javascript
// Add a new handler
swup.on('pageView', () => {
  console.log('New page loaded');
});

swup.off('pageView', handler); // remove a single handler
swup.off('pageView'); // remove all 'pageView' handlers
swup.off(); // remove all handlers for all events
```

For backward compatibility, all events are also triggered on the `document` with a `swup:` prefix.

```javascript
document.addEventListener('swup:contentReplaced', () => {});
```

## List of all events

#### `animationInDone`

triggers when transition of all animated elements is done (after content is replaced)

#### `animationInStart`

triggers when animation _IN_ starts (class `is-animating` is removed from html tag)

#### `animationOutDone`

triggers when transition of all animated elements is done (after click of link and before content is replaced)

#### `animationOutStart`

triggers when animation _OUT_ starts (class `is-animating` is added to html tag)

#### `animationSkipped`

triggers when transition is skipped (on back/forward buttons)

#### `clickLink`

triggers when link is clicked

#### `contentReplaced`

triggers right after the content of page is replaced

#### `disabled`

triggers on `destroy()`

#### `enabled`

triggers when swup instance is created or re-enabled after call of `destroy()`

#### `hoverLink`

triggers when link is hovered

#### `openPageInNewTab`

triggers when page is opened to new tab (link clicked when control key is pressed)

#### `pageLoaded`

triggers when loading of some page is done

#### `pagePreloaded`

triggers when the preload of some page is done (differs from [pageLoaded](#page-loaded) only by the source of event - hover/click)

#### `pageRetrievedFromCache`

triggers when page is retrieved from cache and no request is necessary

#### `pageView`

similar to [contentReplaced](#content-replaced), except it is once triggered on load

#### `popState`

triggers on popstate events (back/forward button)

#### `samePage`

triggers when link leading to the same page is clicked

#### `samePageWithHash`

triggers when link leading to the same page with `#someElement` in the href attribute is clicked

#### `transitionStart`

triggers when transition start (`loadPage` method is called)

#### `transitionEnd`

triggers when transition ends (content is replaced and all animations are done

#### `willReplaceContent`

triggers right before the content of page is replaced

## Examples

### Trigger analytics page views

```javascript
swup.on('pageView', () => {
  dataLayer.push({
    event: 'VirtualPageview',
    virtualPageURL: window.location.pathname,
    virtualPageTitle: document.title
  });
});
```

### Initialize new components on the page

```javascript
swup.on('contentReplaced', () => {
  swup.options.containers.forEach((selector) => {
    // load scripts for all elements with 'selector'
  });
});
```

### Listening to swup's DOM events

```js
document.addEventListener('swup:contentReplaced', () => {
  // do something
});
```
