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

We'll tackle these one by one. See below for the [complete code](#complete-example) and an
interactive [demo](#demo).

## 1. Content container

Let's mark our main element as a [content container](/options/#containers) by adding the id `#swup`.

We'll also add a special [animation class](/options/#animationselector) to let swup know that we
want to wait for this element to finish animating whenever a new page is loaded.

```html
<main id="swup" class="transition-fade">
  <h1>Welcome</h1>
  <p>Lorem ipsum dolor sit amet.</p>
</main>
```

> **Note** The container selector and animation selector are defaults and can be adjusted in the [options](/options/).

## 2. Animation styles

Let's define a CSS transition on the special animation class added before:

```css
/* Define a transition duration during page visits */
html.is-changing .transition-fade {
  transition: opacity 0.25s;
  opacity: 1;
}

/* Define the styles for the unloaded pages */
html.is-animating .transition-fade {
  opacity: 0;
}
```

For this example, we're using CSS to animate our page transition. Swup also supports JS animations
and native View Transitions. Learn more about [defining animations](/getting-started/animations/).

## 3. Initialize swup

Finally, we'll load and initialize swup. And we're good to go!

```javascript
import Swup from 'https://unpkg.com/swup@4?module';

const swup = new Swup();
```

## Complete example

Putting it all together, this is the complete code required for a basic swup setup.

```html
<html>
  <head>
    <title>Swup Example</title>
    <style>
      html.is-changing .transition-fade {
        transition: opacity 0.25s;
        opacity: 1;
      }
      html.is-animating .transition-fade {
        opacity: 0;
      }
    </style>
  </head>
  <body>
    <main id="swup" class="transition-fade">
      <h1>Welcome</h1>
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

Here's an interactive demo to try out the fade animation we've just built together.

Head to the [demo page](/getting-started/demos/) for more examples.

```swupdemo
https://swup-demos.onrender.com/basic/
Swup Demo: Basic
```
