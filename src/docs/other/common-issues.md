---
layout: default
title: Common Issues
eleventyNavigation:
  key: Common Issues
  parent: Other
  order: 2
description: Description of common issue or caveats people encounter
permalink: /other/common-issues/
---

# Common Issues

## Overusing the `transition-*` class

Swup waits for any element with a `transition-[something]` class to finish the transition. While there is an unlimited number of elements that can have this class, only one is actually required. People tend to use a class with a format of `transition-[something]` on any element that is animating, which is not necessary and often leads to bugs. For example, misspelled class name would lead to styles not being defined for that element (see issue above).

It is recommended to use one element with class with a format `transition-[something]` to set a transition duration for swup and make any other transition happen independently.

```css
.fade {
  transition: 0.4s;
  opacity: 1;
}
html.is-animating .fade {
  opacity: 0;
}
```

The styles in the example above will still animate the element for the transition, but swup won't wait for the elements to finish the transition. If the main transition (the transition of the one element with class `transition-*`) has at least similar timing to all the others, there should be no issue with using this approach.

## Libraries using `transition-*` classes

Some other libraries can use a class in a form of `transition-*` for its own functionality. A great example of such a third party code is the [Foundation framework](https://foundation.zurb.com/).

This can break swup, as swup will wait for all the elements with such class to finish transition before proceeding in the page transition lifecycle and get stuck.

In such a case, making the [animationSelector](/options#animation-selector) option more strict fixes the issue.

```javascript
var swup = new Swup({
  animationSelector: '[class*="swup-transition-"]'
});
```

```css
.swup-transition-fade {
  transition: 0.4s;
  opacity: 1;
}
html.is-animating .swup-transition-fade {
  opacity: 0;
}
```

```html
<main id="swup" class="swup-transition-fade">...</main>
```

## Escaped characters inside `<noscript>`

Some browsers (Safari, older versions of IE) escape characters inside of `noscript` tags when placed into the DOM with `element.innerHTML` as swup does. That is usually not an issue unless the contents of the `noscript` tags are further used in your JavaScript code. If that's the case, the characters need to be unescaped with [regex replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace), a pretty creative way using `textarea` mentioned [in this thread](https://github.com/swup/swup/issues/107) or in any other way.

See [this issue](https://github.com/swup/swup/issues/107) for more information.

## Scroll anchors are too close to the top of the viewport

When jumping to an anchor on the page, the browser will scroll the page so that the targeted
element will appear at the top of the viewport. The top part of the page might however already be
covered with other content like a header. Effectively, we need a way to tell the browser to scroll
to an offset point slightly above the anchor to compensate for the content on top if it.

In modern browsers, this is easily done via CSS:

```css
scroll-margin-top: var(--header-height, 100px);
```

If you need fine-grained control over this, consider installing the
[scroll plugin](/plugins/scroll-plugin/) which has a dedicated `offset` option to handle these
cases.

## Canonical link tag can cause wrong indexing by search engines

Swup does not update the contents of the `head` tag after each visit — it only updates
the document `title`. This can lead to issues with wrong canonical links appearing in search
results since search engines these days simulate actual devices with enabled JS for crawling websites.

The official way to solve this is using the [head-plugin](/plugins/head-plugin/) which will
update the head tag on each visit. To tackle this at the root level, consider using XML sitemaps to index your site.

## Improving accessibility

Since we're dynamically re-rendering parts of the page, it's ideal to add `aria-live="polite"` attribute to the swup containers for screen readers.
Unfortunately, this attribute [cannot be added dynamically](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) after page load to work, so it needs to be added manually.
