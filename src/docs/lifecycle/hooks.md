---
layout: default
title: Hooks
eleventyNavigation:
  key: Hooks
  parent: Lifecycle
  order: 1
description: Hook into swup's lifecycle to trigger custom functionality.
permalink: /hooks/
---

# Hooks

Swup provides a variety of hooks that allow listening to lifecycle events,
customizing the transition process as well as triggering custom logic at specific
points.

## Registering handlers

You can register hooks on swup's `hooks` registry. All handlers receive the
global [context object](/context/) as their first argument.

```javascript
// Log to the console on each page view
swup.hooks.on('pageView', (context) => {
  console.log('New page loaded:', context.to.url);
});
```

### Handler options

Pass in an options object to customize how a handler is invoked.

#### once

```javascript
// Only execute the handler once, then remove the handler
swup.hooks.on('pageView', () => {}, { once: true });
```

#### before

```javascript
// Execute the handler before the internal default handler
swup.hooks.on('pageView', () => {}, { before: true });
```

#### replace

```javascript
// Replace the internal default handler entirely with this handler
swup.hooks.on('pageView', () => {}, { replace: true });
```

#### priority

```javascript
// Execute this handler before other handlers, regardless of order of registration
swup.hooks.on('pageView', () => {}, { priority: 10 });
```

#### Shortcuts

The are shortcuts available for common handler options:

```javascript
swup.hooks.once('pageView', () => {}) // { once: true }
swup.hooks.before('pageView', () => {}) // { before: true }
swup.hooks.replace('pageView', () => {}) // { replace: true }
```

## Pausing execution

Swup will await Promises returned from handlers, allowing you to pause execution.

```javascript
// Delay the start of the page transition by 1 second
swup.hooks.on('transitionStart', () => {
  return new Promise((res) => setTimeout(res, 1000));
});
```

⚠️ **Note**: Some hooks are executed without awaiting Promises if their handler needs
to prevent a DOM event's default action: `clickLink` and `popState`.

## Removing handlers

Remove a previously registered handler by passing in the function to remove.

```javascript
const handler = () => console.log('New page loaded');

// Register a handler
swup.hooks.on('pageView', handler);

// Remove it again later
swup.hooks.off('pageView', handler);
```

Remove all handlers for a specific hook by omitting the function.

```javascript
swup.hooks.off('pageView');
```

Remove all handlers for all hooks by omitting the hook name.

```javascript
swup.hooks.off();
```

## List of hooks

The following hooks are exposed by swup and can be accessed as such:

<div class="events-table" data-table-with-anchor-links>

| Hook name                  | Description                                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **animationInDone**        | triggers when transition of all animated elements is done (after content is replaced)                                  |
| **animationInStart**       | triggers when animation _IN_ starts (class `is-animating` is removed from html tag)                                    |
| **animationOutDone**       | triggers when transition of all animated elements is done (after click of link and before content is replaced)         |
| **animationOutStart**      | triggers when animation _OUT_ starts (class `is-animating` is added to html tag)                                       |
| **animationSkipped**       | triggers when transition is skipped (on back/forward buttons)                                                          |
| **awaitAnimation**         | triggers when swup starts waiting for animations to finish                                                             |
| **clickLink**              | triggers when link is clicked                                                                                          |
| **disabled**               | triggers on `swup.destroy()`                                                                                           |
| **enabled**                | triggers when swup instance is created or re-enabled after call of `destroy()`                                         |
| **hoverLink**              | triggers when link is hovered                                                                                          |
| **openPageInNewTab**       | triggers when page is opened to new tab (link clicked when control key is pressed)                                     |
| **pageLoaded**             | triggers when loading of some page is done                                                                             |
| **pagePreloaded**          | triggers when the preload of some page is done (differs from **pageLoaded** only by the source of event - hover/click) |
| **pageRetrievedFromCache** | triggers when page is retrieved from cache and no request is necessary                                                 |
| **pageView**               | triggers when a new page was loaded and the content was replaced, as well as on first load of swup                     |
| **popState**               | triggers on popstate events (back/forward button)                                                                      |
| **replaceContent**         | triggers right after the content of the page is replaced                                                                   |
| **samePage**               | triggers when link leading to the same page is clicked                                                                 |
| **samePageWithHash**       | triggers when link leading to the same page with `#someElement` in the href attribute is clicked                       |
| **transitionStart**        | triggers when transition start (`loadPage` method is called)                                                           |
| **transitionEnd**          | triggers when transition ends (content is replaced and all animations are done)                                        |
| **urlUpdated**             | triggers when the url was updated (page load or redirect)                                                              |

</div>

## Examples

### Trigger analytics page views

```javascript
swup.hooks.on('pageView', () => {
  dataLayer.push({
    event: 'VirtualPageview',
    virtualPageURL: window.location.pathname,
    virtualPageTitle: document.title
  });
});
```

### Initialize new components on the page

```javascript
swup.hooks.on('pageView', () => {
  if (document.querySelector('#carousel')) {
    const carousel = new Carousel('#carousel');
  }
});
```

## DOM events

All hooks are also triggered on the `document` with a `swup:` prefix.

```javascript
document.addEventListener('swup:pageView', () => {});
```

## Plugin authors

Plugin authors might want to create and trigger new hooks to implement additional functionality.

### Creating new hooks

```javascript
swup.hooks.create('submitForm');
```

### Triggering a hook

```javascript
swup.hooks.trigger('submitForm');
```

Pass in arguments to hand them along to any registered handlers.

```javascript
swup.hooks.trigger('submitForm', { formData: 123 });
```

### Making a hook replaceable

Pass in a default handler function that is executed when the hook is triggered.
Users of swup can then replace this handler with a custom implementation.

```javascript

// Define a default handler that is executed and can be replaced
swup.hooks.trigger('submitForm', { action: url, data: new FormData() }, () => {
  console.log('Submitting form');
  fetch(action, { body: data }).then(/* */);
});

// Replace the default handler with a custom handler
swup.hooks.replace('submitForm', ({ action, data }) => {
  console.log('Custom logic to replace default handler');
});
```
