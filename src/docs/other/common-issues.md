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
the current page's `head` will not be loaded. The easiest solution is to use a single stylesheet
for the whole website.

If your site does require modular stylesheets per section or template, use the
[head-plugin](/plugins/head-plugin/) to add the new stylesheets and configure its `awaitAssets`
option to also wait for those stylesheets to finish loading before animating in the new page.

## The current and next page can not be animated at the same time

Out of the box, swup will completely hide the previous page, replace the content and only then
show the next page. The old and new containers are never in the DOM at the same time.

You can however use the official [Parallel Plugin](/plugins/parallel-plugin/) to run both the in
and out animations in parallel. It will keep a copy of the previous content around for the duration
of the whole transition.

## Screen readers are not informed about updated content

We're dynamically updating parts of the page, so it's recommended to add `aria-live="polite"`
to any content containers replaced by swup. This allows screen readers to announce updates to their
content. Note: the attribute [cannot be added dynamically](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) and needs to be added manually in the html.

The official [accessibility plugin](/plugins/a11y-plugin/) makes this very easy to implement: it
reads out the title of the new document to screen readers, requiring no change to your markup. It
will also focus the main content area for improved keyboard accessibility.

## Scroll anchors are too close to the top of the viewport

When jumping to an anchor on the page, the browser will scroll the page so that the targeted
element will appear at the top of the viewport. The top part of the page might however already be
covered with other content like a header. Effectively, we need a way to tell the browser to scroll
to an offset point slightly above the anchor to compensate for the content on top of it.

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

Consider using the [Morph Plugin](https://github.com/daun/swup-morph-plugin) for such
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
for animations on those elements, quite possibly messing up the timing of animations.

Using a stricter [animation selector](/options/#animation-selector) fixes the issue.

```javascript
var swup = new Swup({
  animationSelector: '[class*="swup-transition-"]'
});
```

```html
<main id="swup" class="swup-transition-fade"></main>
```

```css
html.is-changing .swup-transition-fade {
  transition: 0.4s;
  opacity: 1;
}
html.is-animating .swup-transition-fade {
  opacity: 0;
}
```

## Overused `transition-*` classes

Swup will wait for any element with a `transition-*` class to finish animating.
While there is an unlimited number of elements that can have this class, only one is actually
required for swup to get its timing right. Using it on all animated elements is not required and
often leads to bugs.

It is recommended to use one element with a `transition-*` class to set the animation duration and
make any other animations happen independently. As long as all animations share the same duration,
there should be no issues with this approach.

```css
/* Note: no transition-* prefix */
html.is-changing .logo {
  transition: 0.4s;
  opacity: 1;
}
html.is-animating .logo {
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
