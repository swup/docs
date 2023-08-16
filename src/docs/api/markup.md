---
layout: default
title: Markup
eleventyNavigation:
  key: Markup
  parent: API
  order: 6
description: Influence swup behavior with DOM attributes
permalink: /api/markup/
---

# Markup

Control swup's behavior using specific DOM attributes on links and other elements.

## Ignore links

Swup can be disabled on a per-link basis by annotating a link or any of its
ancestors with `data-no-swup`:

```html
<a href="/" data-no-swup>Ignored</a>

<nav data-no-swup>
  <a href="/">Ignored</a>
</nav>
```

## Set a custom animation

Adding a `data-swup-animation` attribute on a link will change the animation for a
specific visit.

```html
<a href="/" data-swup-animation="slide">
```

This will add a `.to-{animation}` class on the HTML element during the visit you can
use to specify custom transition styles:

```html
<html class="is-changing is-animating to-slide">
```

```css
html.is-changing .transition-page {
  /* normal transition styles */
}
html.is-changing.to-slide .transition-page {
  /* slide transition styles */
}
```

## Persist element state

Some elements need to keep their state between page loads, e.g. autoplaying videos, animations or
countdowns. Swup will transfer an element to the next page — preserving its content, data and
event listeners — if it has a `data-swup-persist` attribute and a matching element is found on the
next page. Elements are matched using the unique value of the persist attribute.

```html
<video src="/video.mp4" autoplay data-swup-persist="unique-key">
```

While this can also be achieved by having persistent elements outside of any
[containers](/options/#containers) replaced by swup, this attribute is meant for
elements inside replaced containers that cannot be moved outside.

## Replace history entry

Swup will replace the current history entry (instead of creating a new one) by
adding a `data-swup-history` attribute with the value `replace` to a link:

```html
<a href="/" data-swup-history="replace">
```
