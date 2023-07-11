---
layout: default
title: Reloading Scripts
eleventyNavigation:
  key: Reloading Scripts
  parent: Getting Started
  order: 8
description: How to trigger custom code when a new page is loaded.
permalink: /getting-started/reloading-javascript/
---

# Reloading Scripts

Swup takes control of the page load lifecycle. Instead of having the browser
recompile scripts between page changes, it keeps the current page instance alive
and only updates the content containers to match the content of the new page.

This means two things:

- You can not rely on standard browser events to trigger your custom code
- You have to pay attention to not leaking memory by undoing any changes

## Triggering custom code

Swup updates pages without a full reload, so you can't rely on `DOMContentLoaded`
or other events to trigger your code as they will only ever run once on initial
load.

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // This only runs once, so we need some other event for triggering code
});
```

Instead, we can trigger code after each page change by registering handlers for swup's
[hooks](/hooks/). Combining the browser event and swup hooks, we end up with
a template for reliably running code to initialize elements on the page:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // This runs on initial load
});

swup.hooks.on('page:view', () => {
  // This runs after every page change
});
```

## Initializing components

We'll collect our scripts in one `init` function that we can call repeatedly to
initialize everything. Each script has a condition to make sure it's only run
when a related element is found on the page.

```javascript
function init() {
  if (document.querySelector('#carousel')) {
    // new Carousel('#carousel')
  }

  if (document.querySelector('#lightbox')) {
    // $('#lightbox').lightbox()
  }

  if (document.querySelector('#something-else')) {
    // and so on
  }
}
```

Then we register the correct event handlers and we're good to go.

```javascript
const swup = new Swup();

// Run once when page loads
if (document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', () => init());
}

// Run after every additional navigation by swup
swup.hooks.on('page:view', () => init());
```

## Using component frameworks

While the above example is a perfectly fine solution to achieve code execution
on page change, we suggest looking into JS frameworks that can help you automate
some of this by mounting and unmounting components automatically and providing
lifecycle hooks.

- [Alpine.js](https://alpinejs.dev)
- [Stimulus](https://stimulus.hotwired.dev)
- [Gia](https://github.com/giantcz/gia) + official [Gia plugin](/plugins/gia-plugin/)

## Avoiding memory leaks

Swup keeps a persistent session in memory, so objects leaking memory will not be
cleaned up automatically as they would be on a full page refresh. While this
should not be a problem on most sites, be aware that in special cases you will
need to clean up after yourself right before swup's `content:replace` hook.

```javascript
function unload() {
  if (document.querySelector('#carousel')) {
    // carousel.destroy()
  }
}

swup.hooks.before('content:replace', () => unload());
```

## Third-party script tags

If you're not in control over the scripts included on the page, there is an
official [scripts plugin](/plugins/scripts-plugin/) to help with reloading
script tags.
**This should be a last resort if none of the other options are available to you.**
