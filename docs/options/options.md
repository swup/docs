---
layout: default
title: Options
has_children: true
nav_order: 2
permalink: /options
has_toc: false
---

# Options
Swup has a several options that can be passed into a constructor as an object.

```javascript
const options = {};
const swup = new Swup(options);
```

## Link Selector
Link selector defines link elements that will trigger the transition. By default, the selector takes any link with `href` attribute starting with `/`, `#` or current domain.
You can modify this option to include SVG links or exclude some other. 

```javascript
const options = {
    linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])'
}
```

In case you want to exclude links for some routes, lightbox or any other functionality, extend the selector.
By default, you can add `[data-no-swup]` attribute to the link, if you want to exclude just a few.

## Animation Selector
As swup is built on animations, it is required to define the elements that are being animated. Usually, you would like to give the elements some common class or class prefix.
By default option is set to `[class*='transition-']`, which selects all elements with class attribute containing `transition-`.

```javascript
const options = {
    animationSelector: '[class*="transition-"]'
};
```

## Containers
Containers option defines the array of selectors of containers, where the content needs to be replaced.
Containers option usually contains the main element with the content of the page, but can include any element that is present across all pages.
This creates a possibility of animating elements on the page while still replacing it's parts.
Another good example where this is helpful is the *change language* link, which usually appears the same across the site (no animation needed),
but leads to a different URL on each page.
Option defaults to the single container of id `#swup`.

```javascript
const options = {
  containers: ['#swup']
};
```

## Cache
Swup has a built-in cache, meaning that it stores previously loaded contents of the pages in memory in a form of an object.
This drastically improves speed for static sites but should be disabled for dynamic sites. Cache option defaults to `true`.

```javascript
const options = {
    cache: true
};
```

## Skip popState Handling
Swup is built around browser history API, but sometimes some other tools manipulating the browser history can be used as well.
For this reason, swup places a source property into every history state object it creates, so it can be later identified (swup also modifies current history record on start, to include the "swup" source property as well).
On `popState` events, swup only handles the records that were created by swup.
This behavior can be modified by `skipPopStateHandling` option, which is represented by a function returning boolean (false = handle the popstate, true = do nothing).
The function accepts one argument - the popstate event. Option defaults to the following:

```javascript
const options = {
    skipPopStateHandling: function(event){
        if (event.state && event.state.source == "swup") {
            return false;
        }
        return true;
    }
}
```

## Animate History Browsing
Option enables the animation on popstate events. Swup adds `is-popstate` class to html tag for the whole process of animation on back/forward browsing.

Note that when this option is enabled, swup disables browser native scroll control (sets [scrollRestoration](https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration) to `manual`) and takes over this task.
This means that position of scroll on previous page(s) is not preserved (but [can be implemented manually](https://github.com/swup/swup/issues/48#issuecomment-423854819) based on use case).
Otherwise swup scrolls to top/#element on popstate as it does with normal browsing. Default value is `false`.

```javascript
const options = {
    animateHistoryBrowsing: false
};
```

## Default Options
The default option object look like...

```javascript 
const options = {
  animateHistoryBrowsing: false
  animationSelector: '[class*="transition-"]',
  containers: ['#swup'],
  cache: true,
  linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
  skipPopStateHandling: function(event) {
    if (event.state && event.state.source == 'swup') {
      return false;
    }
    return true;
  },
};
```
