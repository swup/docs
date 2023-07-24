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

Lifecycle hooks allow triggering custom code at each step of the page transition process. Read on to
learn about [registering handlers](#registering-handlers) or jump straight to the
[list of available hooks](#list).

## Registering handlers

You can register handlers on swup's `hooks` registry. All handlers receive the [visit object](/visit/)
with information about the current visit as their first argument.

```javascript
swup.hooks.on('page:view', (visit) => {
  console.log('New page loaded:', visit.to.url);
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

## List of hooks {#list}

The following hooks are exposed by swup and can be listened to. Refer to the
[lifecycle diagram](/lifecycle/#lifecycle-diagram) for a visual overview of when the most important
hooks are called.

<div class="events-table" data-table-with-anchor-links>

|        Hook name        |                                      Description                                      |
| ----------------------- | ------------------------------------------------------------------------------------- |
| **animation:out:start** | Current content starts animating out. Class `.is-animating` is added.                 |
| **animation:out:await** | Swup waits for CSS animations to finish before replacing the content.                 |
| **animation:out:end**   | Current content finishes animating out. Content is not yet replaced.                  |
| **animation:in:start**  | New content starts animating in. Class `.is-animating` is removed.                    |
| **animation:in:await**  | Swup waits for CSS animations to finish before finishing the visit.                   |
| **animation:in:end**    | New content finishes animating out.                                                   |
| **animation:skip**      | Page will load at once without animations, e.g. on history navigation.                |
| **cache:set**           | Page is saved to the cache.                                                           |
| **cache:clear**         | The cache is cleared completely.                                                      |
| **content:replace**     | The old content of the page is replaced by the new content.                           |
| **content:scroll**      | The scroll position is reset after replacing the content.                             |
| **enable**              | Swup instance is created.                                                             |
| **disable**             | Swup instance is [disabled](/api/methods/#destroy).                                   |
| **fetch:error**         | Fetch request is rejected because of a server error.                                  |
| **fetch:request**       | Fetch request is sent.                                                                |
| **history:popstate**    | History navigation is started: back/forward button was pressed.                       |
| **link:click**          | Link is clicked.                                                                      |
| **link:self**           | Link is clicked that leads to the current page.                                       |
| **link:anchor**         | Link is clicked that jumps to an anchor on the current page.                          |
| **link:newtab**         | Link is clicked that opens to a new tab.                                              |
| **page:request**        | Page is requested to load, either from a fetch request or the cache.                  |
| **page:load**           | Page is completely loaded, via fetch request or cache.                                |
| **page:view**           | New content is visible after replacing the content.                                   |
| **scroll:top**          | Scroll to the top of the page.                                                        |
| **scroll:anchor**       | Scroll to an anchor on the current page.                                              |
| **visit:start**         | Transition to a new page begins.                                                      |
| **visit:end**           | Transition ends. All content is replaced, animations have finished.                   |

</div>

## Examples

### Trigger analytics page views

```javascript
swup.hooks.on('page:view', () => {
  ga('set', 'title', document.title);
  ga('set', 'page', window.location.pathname);
  ga('send', 'pageview');
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

### Display loading indicator during transitions

```javascript
swup.hooks.on('animation:out:start', () => {
  document.querySelector('#loader').hidden = false;
});
swup.hooks.on('animation:in:end', () => {
  document.querySelector('#loader').hidden = true;
});
```

## DOM events

All hooks are also triggered on the `document` with a `swup:` prefix. They receive the hook name
and the visit object inside the detail key of the event.

```javascript
document.addEventListener('swup:page:view', ({ detail: { visit } }) => {
  console.log('Going to', visit.to.url);
});
```
