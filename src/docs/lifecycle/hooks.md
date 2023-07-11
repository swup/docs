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

Swup provides a variety of hooks that allow listening to lifecycle events, customizing the
transition process as well as triggering custom logic at specific points.

## Registering handlers

You can register hooks on swup's `hooks` registry. All handlers receive the global
[context object](/context/) as their first argument.

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
swup.hooks.once('pageView', () => {}); // { once: true }
swup.hooks.before('pageView', () => {}); // { before: true }
swup.hooks.replace('pageView', () => {}); // { replace: true }
```

## Pausing execution

Swup will await Promises returned from handlers, allowing you to pause execution.

```javascript
// Delay the start of the page transition by 1 second
swup.hooks.on('transitionStart', () => {
  return new Promise((res) => setTimeout(res, 1000));
});
```

This means that `async/await` handlers are supported as well:

```javascript
// Wait for a custom function before starting the transition
swup.hooks.on('transitionStart', async () => {
  await myCustomFunction();
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

## List of hooks

The following hooks are exposed by swup and can be accessed as such:

<div class="events-table" data-table-with-anchor-links>

| Hook name             | Description                                                                            |
| --------------------- | -------------------------------------------------------------------------------------- |
| **animationOutStart** | out-animation of current content begins: `.is-animating` is added to html              |
| **animationOutDone**  | out-animation of current content finished, content is not yet replaced                 |
| **animationInStart**  | in-animation of new content begins: `.is-animating` is removed from html tag           |
| **animationInDone**   | in-animation of new content finished, content was replaced                             |
| **animationSkipped**  | animations were skipped and page will load instantaneously: e.g. on history navigation |
| **awaitAnimation**    | swup checks which CSS animations to wait for, in or out                                |
| **clickLink**         | a link was clicked                                                                     |
| **enabled**           | swup instance was initialized                                                          |
| **disabled**          | swup instance was [disabled](/api/methods/#destroy)                                    |
| **fetchPage**         | a fetch request is sent                                                                |
| **loadPage**          | a page is loaded                                                                       |
| **openPageInNewTab**  | a link was opened to a new tab                                                         |
| **pageLoaded**        | a page was completely loaded, whether from a request or from cache                     |
| **pageCached**        | a page was saved to the cache                                                          |
| **pageView**          | visit to a new page was completed, also triggers when first enabling swup              |
| **popState**          | history navigation was started: back/forward button pressed                            |
| **replaceContent**    | the content of the page is replaced                                                    |
| **samePage**          | a link is clicked that leads to the current page                                       |
| **samePageWithHash**  | a link is clicked that jumps to an `#anchor` on the current page                       |
| **transitionStart**   | begin of the transition to a new page                                                  |
| **transitionEnd**     | end of the transition to a new page: content was replaced and animations have finished |

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

## Custom hooks

Plugin authors might want to create and trigger new hooks to implement additional functionality.

See the [Custom Hooks](/plugins/create-plugin/#custom-hooks) section of the Create a Plugin page
for details.
