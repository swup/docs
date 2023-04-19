---
layout: default
title: Reloading Javascript
description: Since swup removes the page reloads from site, it also removes a standard lifecycle of scripts
parent: Getting Started
nav_order: 5
permalink: /getting-started/reloading-javascript/
---

# Reloading Javascript

Since swup removes the page reloads from site, it also removes a standard lifecycle of scripts, which come with a set of problems that those pjax-like libraries bring.
By default, scripts get enabled when the page is loaded. Often we would find ourselves waiting for whole page to load before executing the script.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // run whatever we need
});
```

After the browser leaves the page, there is no need to "clean up" the scripts, as page reload will simply remove everything, and start with creating the whole window/document again.

Similar approach needs to be used with swup.
Swup [events](/events) are perfect for this purpose.
Let's say we would like to run different set of scripts for each page.
Let's put such scripts in one function we can call to enable everything.
Each script in the function has a condition, so we don't try to run the script when the elements are not there (for example, when the carousel is only placed on the homepage).

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
swup.on('contentReplaced', init);
```

As we mentioned before, unlike native browser reload, the page is not able to cleanup all the instances, listeners and mess we have made when page was loaded.
Swup `willReplaceContent` event can help with that.

```javascript
function unload() {
    if (document.querySelector('#carousel')) {
        // carousel.destroy()
    }
    // ...
}

swup.on('willReplaceContent', unload);
```

This is only an example, but it should give some people an idea of how to approach such situation.

**Note:** There is a [scripts plugin](/plugins/scripts-plugin) which can also help you in situations,
where you're not in control over what scripts are included in a page.
Keep in mind that it's usage is discouraged.

## Component based approach

I would very much recommend using component based approach together with swup, like the one provided by [Gia framework](https://github.com/giantcz/gia).
Gia provides a simple, yet powerful way of managing scripts with `mount`/`unmount` lifecycle methods,
automatic scope for scripts and more cool stuff like lazy loading assets when needed, smart element auto selectors and more.

Oh and [here](/plugins/gia-plugin) is a plugin for that.
