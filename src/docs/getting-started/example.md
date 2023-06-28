---
layout: default
title: Example
eleventyNavigation:
  key: Example
  parent: Getting Started
  order: 3
description: A few steps to get swup working on your site
permalink: /getting-started/example/
---

# Example

Swup requires two things to work: a content container with an id and an animation class, as well
as corresponding transition styles it can wait for when loading a page.

We'll tackle these one by one. See below for the [complete example](#complete-example) code.

## 1. Content container

Let's mark our main element as a [content container](/options/#containers) by adding the id `#swup`.

We'll also add a special [animation class](/options/#animationselector) to let swup know that we
want to wait for this element to finish animating whenever a new page is loaded.

```html
<main id="swup" class="transition-fade">
  <h1>Homepage</h1>
  <p>Lorem ipsum dolor sit amet.</p>
</main>
```

Note: these are just the defaults. Both the container selector and the animation selector are adjustable in the
[options](/options/).

## 2. Transition styles

Let's define a CSS transition on the special transition class added before:

```css
.transition-fade {
  transition: opacity 0.4s;
  opacity: 1;
}

html.is-animating .transition-fade {
  opacity: 0;
}
```

## 3. Initialize swup

Finally, we'll initialize swup. And we're good to go!

```javascript
const swup = new Swup();
```

## Complete example

Putting it all together, this is what we get.

```html
<html>
  <head>
    <title>Homepage</title>
    <style>
      .transition-fade {
        transition: opacity 0.4s;
        opacity: 1;
      }
      html.is-animating .transition-fade {
        opacity: 0;
      }
    </style>
  </head>
  <body>
    <main id="swup" class="transition-fade">
      <h1>Homepage</h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </main>
    <script type="module">
      import Swup from 'https://unpkg.com/swup@4?module';
      const swup = new Swup();
    </script>
  </body>
</html>
```

## Demo

Like to try it out yourself? Head to the [demo page](/getting-started/demos/).
