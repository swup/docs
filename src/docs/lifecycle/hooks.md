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
swup.hooks.on('page:view', (context) => {
  console.log('New page loaded:', context.to.url);
});
```

### Handler options

Pass in an options object to customize how a handler is invoked.

#### once

Execute the handler once, then remove it.

```javascript
swup.hooks.on('page:view', () => {}, { once: true });
```

#### before

Execute the handler before the internal default handler.

```javascript
swup.hooks.on('content:replace', () => {}, { before: true });
```

#### replace

Replace the internal default handler entirely with a custom function.

```javascript
swup.hooks.on('fetch:request', () => {}, { replace: true });
```

#### priority

Influence the order in which this handler is run in relation to other handlers for the same hook,
regardless of order of registration. The default priority is `0` — negative values make the handler
execute earlier, positive values make it execute later.

```javascript
// Execute before other handlers
swup.hooks.on('visit:start', () => {}, { priority: -100 });

// Execute after other handlers
swup.hooks.on('visit:start', () => {}, { priority: 100 });
```

#### Shortcuts

There are shortcuts available for common handler options:

```javascript
swup.hooks.once('page:view', () => {}); // once: true
swup.hooks.before('content:replace', () => {}); // before: true
swup.hooks.replace('fetch:request', () => {}); // replace: true
```

## Pausing execution

Swup will await Promises returned from handlers, allowing you to pause execution.

```javascript
// Delay the start of the page transition by 1 second
swup.hooks.on('visit:start', () => {
  return new Promise((res) => setTimeout(res, 1000));
});
```

This means that `async/await` handlers are supported as well:

```javascript
// Wait for a custom function before starting the transition
swup.hooks.on('visit:start', async () => {
  await myCustomFunction();
});
```

> **Note** Some hooks are executed without awaiting Promises if their handler needs
to prevent a DOM event's default action: `link:click` and `history:popstate`.

## Removing handlers

Remove a previously registered handler by passing in the function to remove.

```javascript
const handler = () => console.log('New page loaded');

// Register a handler
swup.hooks.on('page:view', handler);

// Remove it again later
swup.hooks.off('page:view', handler);
```

## List of hooks

The following hooks are exposed by swup and can be accessed as such:

<div class="events-table" data-table-with-anchor-links>

|        Hook name        |                                         Description                                         |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| **animation:out:start** | out-animation of current content begins: `.is-animating` is added to html                   |
| **animation:out:end**   | out-animation of current content finishes, content not yet replaced                         |
| **animation:in:start**  | in-animation of new content begins: `.is-animating` is removed from html tag                |
| **animation:in:end**    | in-animation of new content finishes, content was replaced                                  |
| **animation:await**     | swup waits for CSS animations on the page, either in or out                                 |
| **animation:skip**      | animations are skipped and page will load instantaneously: e.g. on history navigation       |
| **cache:set**           | a page is saved to the cache                                                                |
| **cache:clear**         | the cache is cleared completely                                                             |
| **content:replace**     | the content of the page is replaced                                                         |
| **content:scroll**      | the scroll position is reset after replacing the content                                    |
| **enable**              | swup instance is created                                                                    |
| **disable**             | swup instance is [disabled](/api/methods/#destroy)                                          |
| **fetch:error**         | a fetch request is rejected because of a server error                                       |
| **fetch:request**       | a fetch request is sent                                                                     |
| **history:popstate**    | history navigation is started: back/forward button pressed                                  |
| **link:click**          | a link is clicked                                                                           |
| **link:self**           | a link is clicked that leads to the current page                                            |
| **link:anchor**         | a link is clicked that jumps to an `#anchor` on the current page                            |
| **link:newtab**         | a link is opened to a new tab                                                               |
| **page:request**        | a page is requested, either from a fetch request or the cache                               |
| **page:load**           | a page is completely loaded, via fetch request or cache                                     |
| **page:view**           | the next page is visible after replacing the content, also triggers when instantiating swup |
| **visit:start**         | begin of the transition to a new page                                                       |
| **visit:end**           | end of the transition to a new page: all content was replaced and animations have finished  |

</div>

## Examples

### Trigger analytics page views

```javascript
swup.hooks.on('page:view', () => {
  dataLayer.push({
    event: 'VirtualPageview',
    virtualPageURL: window.location.pathname,
    virtualPageTitle: document.title
  });
});
```

### Initialize new components on the page

```javascript
swup.hooks.on('page:view', () => {
  if (document.querySelector('#carousel')) {
    const carousel = new Carousel('#carousel');
  }
});
```

## DOM events

All hooks are also triggered on the `document` with a `swup:` prefix. They receive the hook name
and the global context object inside the detail key of the event.

```javascript
document.addEventListener('swup:page:view', ({ detail: { context } }) => {
  console.log('Going to', context.to.url);
});
```

## Custom hooks

Plugin authors might want to create and trigger new hooks to implement additional functionality.

See the [Custom Hooks](/plugins/create-plugin/#custom-hooks) section of the Create a Plugin page
for details.
