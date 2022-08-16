---
layout: default
title: Events
description: Swup emits bunch of events, that we can use to enable JavaScript, trigger analytics, and much more
has_children: true
nav_order: 3
permalink: /events
has_toc: false
---

# Events

As we are replacing the native functionality of the browser,
there is a need for a lifecycle that would replace the standard browser page lifecycle (_load page_ and _leave page_).

Swup emits bunch of events, that we can use to enable JavaScript, trigger analytics, and much more.
Handlers are registered and unregistered with swups `on` and `off` methods.

When possible, swup also passes original event into the handler
(clickLink, hoverLink, and such events get `delegateTarget` property as the referenced element due to the event propagation).

```javascript
// trigger page view for GTM
swup.on('pageView', function() {
  dataLayer.push({
    event: 'VirtualPageview',
    virtualPageURL: window.location.pathname,
    virtualPageTitle: document.title
  });
});

swup.on('contentReplaced', function() {
  swup.options.containers.forEach((selector) => {
    // load scripts for all elements with 'selector'
  });
});
```

```javascript
swup.off('pageView', handler); // removes single handler of 'pageView' event
swup.off('pageView'); // removes all handlers for 'pageView' event
swup.off(); // removes all handlers for all events
```

**Note:** example with enabling scripts above assumes using component based approach, like the one used by [Gia framework](https://github.com/giantcz/gia).

For backward compatibility, all events are also triggered on the `document` with **swup:** prefix.

```javascript
document.addEventListener('swup:contentReplaced', (event) => {
  // do something when content is replaced
});
```

## List of all events

|         EventName          |                                                      Description                                                       |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **animationInDone**        | triggers when transition of all animated elements is done (after content is replaced)                                  |
| **animationInStart**       | triggers when animation _IN_ starts (class `is-animating` is removed from html tag)                                    |
| **animationOutDone**       | triggers when transition of all animated elements is done (after click of link and before content is replaced)         |
| **animationOutStart**      | triggers when animation _OUT_ starts (class `is-animating` is added to html tag)                                       |
| **animationSkipped**       | triggers when transition is skipped (on back/forward buttons)                                                          |
| **clickLink**              | triggers when link is clicked                                                                                          |
| **contentReplaced**        | triggers right after the content of page is replaced                                                                   |
| **disabled**               | triggers on `destroy()`                                                                                                |
| **enabled**                | triggers when swup instance is created or re-enabled after call of `destroy()`                                         |
| **hoverLink**              | triggers when link is hovered                                                                                          |
| **openPageInNewTab**       | triggers when page is opened to new tab (link clicked when control key is pressed)                                     |
| **pageLoaded**             | triggers when loading of some page is done                                                                             |
| **pagePreloaded**          | triggers when the preload of some page is done (differs from **pageLoaded** only by the source of event - hover/click) |
| **pageRetrievedFromCache** | triggers when page is retrieved from cache and no request is necessary                                                 |
| **pageView**               | similar to **contentReplaced**, except it is once triggered on load                                                    |
| **popState**               | triggers on popstate events (back/forward button)                                                                      |
| **samePage**               | triggers when link leading to the same page is clicked                                                                 |
| **samePageWithHash**       | triggers when link leading to the same page with `#someElement` in the href attribute is clicked                       |
| **transitionStart**        | triggers when transition start (`loadPage` method is called)                                                           |
| **transitionEnd**          | triggers when transition ends (content is replaced and all animations are done                                         |
| **willReplaceContent**     | triggers right before the content of page is replaced                                                                  |
