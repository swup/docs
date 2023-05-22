---
layout: default
title: Reloading JavaScript
eleventyNavigation:
  key: Reloading Javascript
  parent: Getting Started
  order: 5
description: Since swup removes the page reloads from site, it also removes a standard lifecycle of scripts
permalink: /getting-started/reloading-javascript/
---

# Reloading Javascript

Swup turns your server-side rendered website into a progressively enhanced [SPA](https://en.wikipedia.org/wiki/Single-page_application). Because of that, some native lifecycle events need to be augmented by you:

1. Usually, scripts are being initialized when the whole page is loaded. Often we would find ourselves waiting for the whole page to load before executing our script:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // run whatever we need
});
```
When working with swup, the `DOMConentLoaded` event won't be triggered except for the first visit.

2. When navigating between pages, usually there is no need to "clean up" our custom scripts, as the browser will tear down everything and start with creating the whole `window`/`document` again from scratch.

There are a few alternative routes that you can take:

## Alpine.js

In our experience, swup works very well together with the framework [Alpine.js](https://alpinejs.dev/). There, every component will be initialized/destroyed automatically, without you having to do any extra work. _It just works_ ™️

## Gia Framework

Another framework that's a good fit for swup is [Gia](https://github.com/giantcz/gia). Gia provides a simple yet powerful way of managing scripts with `mount`/`unmount` lifecycle methods, automatic scope for scripts and more stuff like lazy loading assets when needed, smart element auto selectors and more.

We have an official [Gia plugin](/plugins/gia-plugin/) that will automatically mount/unmount your components.

## Swup's event system

Swup provides a rich set of [events](/events/). Here's how you can use these to re-initialize your scripts:

Let's say we would like to run different set of scripts for each page.

We'll put all these scripts in one `init` function that we can call repeatedly to initialize everything.
Each script in the function has a condition, so we won't try to run the script when the related elements are not in the DOM (for example, when your carousel is only being rendered on your homepage).

```javascript
function init() {
  if (document.querySelector('#carousel')) {
    // something like new Carousel('#carousel')
  }

  if (document.querySelector('#lightbox')) {
    // something like $('#lightbox').lightbox()
  }

  if (document.querySelector('#something-else')) {
    // ...
  }
}
```

When the features are separated in some way, like the example above, we are just one step away from using swup events to run whatever we need, whenever we need.

In this particular example we would probably like to run this on each page view.

```javascript
const swup = new Swup();

// run once when page loads
if (document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', () => init());
}

// run after every additional navigation by swup
swup.on('pageView', init);
```

As we mentioned before, unlike the native browser reload, the page is not able to cleanup all the instances, listeners and mess we have created when the page was loaded 😄

Swup's `willReplaceContent` event can help with that:

```javascript
function unload() {
  if (document.querySelector('#carousel')) {
    // carousel.destroy()
  }
  // ...
}

swup.on('willReplaceContent', unload);
```

This is only an example, but it should give you a rough idea of how to approach these scenarios.

## Conclusion

None of the above options are mutually exclusive. You can mix and match them as you need.

**And a final note:** There is a [scripts plugin](/plugins/scripts-plugin/) which can also help you in edge case situations,
where you're not in control over what scripts are included in a page. **Keep in mind that the scripts plugin should be seen as a last resort if none of the other options are available to you.**
