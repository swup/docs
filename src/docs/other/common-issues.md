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

This is a compilation of challenges and possible solutions when integrating or extending swup.

## The stylesheets of the next page are not loaded

Swup doesn't automatically update the contents of the `head` tag. Any stylesheets not included in
the current page's `head` will not be loaded.

The easiest solution is using a single stylesheet for the whole website.

If your site does require modular stylesheets per section or per template, use the [head-plugin](/plugins/head-plugin/)
to add the new stylesheets and configure its `awaitAssets` option to also wait for those
stylesheets to finish loading before starting the animation to the new page.

## The current and next page aren't visible at the same time

Swup currently doesn't provide an official way of running both the in and out animations in parallel.
The current and the next page's contents are never in the DOM at the same time.

See [this discussion](https://github.com/orgs/swup/discussions/502#discussioncomment-3536642)
for possible pointers using custom hooks.

## Screen readers are not informed about updated content

Since we're dynamically re-rendering parts of the page, it's recommended to add `aria-live="polite"`
to any content containers replaced by swup. This will help screen readers read out aloud any
updates to their content. As that attribute [cannot be added dynamically](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) after page load it needs to be added manually in the html.

The official [accessibility plugin](/plugins/a11y-plugin/) uses an arguably better strategy: it
reads out the title of the new document to screen readers, requiring no change to your markup. It
will also focus the main content area for improved keyboard accessibility.

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

## Overflowing containers get reset on navigation

Replacing a swup container will also reset its scroll position. There might be cases where you
want the content to be updated but the scroll position to be kept, like an overflowing sidebar
navigation that needs to mark the currently active nav item with a class name.

Consider using the semi-official [morph plugin](https://github.com/daun/swup-morph-plugin) for such
cases. It lets you define additional containers that morph their new content into the old element,
without a complete replacement and without resetting the scroll position of the container itself.

## Canonical link tag causes indexing issues

Swup doesn't automatically update the contents of the `head` tag — it only updates the document
`title`. This can lead to issues with wrong canonical links appearing in search results since search
engines these days simulate actual devices with enabled JS for crawling websites.

The official way to solve this is using the [head-plugin](/plugins/head-plugin/) which will
update the head tag on each visit. To tackle this at the root level, consider using XML sitemaps to
index your site.

## A library already uses `transition-*` classes

Some third-party libraries like [Foundation](https://foundation.zurb.com/) might already be using
class names like `transition-*` for their own functionality. In this case, swup will try to wait
for transitions on those elements, quite possibly messing up the timing of transitions.

Using a stricter [animationSelector](/options/#animation-selector) fixes the issue.

```javascript
var swup = new Swup({
  animationSelector: '[class*="swup-transition-"]'
});
```

```html
<main id="swup" class="swup-transition-fade"></main>
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

## Overused `transition-*` classes

Swup will wait for any element with a `transition-*` class to finish transitioning.
While there is an unlimited number of elements that can have this class, only one is actually
required for swup to get its timing right. Using it on all animated elements is not required and
often leads to bugs.

It is recommended to use one element with a `transition-*` class to set the page
transition duration and make any other transition happen independently. As long as all transitions
share the same duration, the should be no issues with this approach.

```css
.fade {
  transition: 0.4s;
  opacity: 1;
}
html.is-animating .fade {
  opacity: 0;
}
```

## Escaped characters inside `<noscript>`

Some browsers (Safari, older versions of IE) escape characters inside of `noscript` tags when placed
into the DOM with `element.innerHTML` as swup does. That is usually not an issue unless the contents
of the `noscript` tags are further used in your JavaScript code. If that's the case, the characters
need to be unescaped with [regex replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace),
a pretty creative way using `textarea` mentioned [in this thread](https://github.com/swup/swup/issues/107)
or in any other way.

See [this issue](https://github.com/swup/swup/issues/107) for more information.
