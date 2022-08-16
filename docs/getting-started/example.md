---
layout: default
title: Example
description: A few steps to get swup working on your site
parent: Getting Started
nav_order: 3
permalink: /getting-started/example
---
# Example

First thing we need to do is prepare our HTML content.
Define the elements that are being animated and elements (**containers**) that need to be replaced.
Let's assume we want to fade in/out the content of `main` element and replace it's contents.

Add `swup` [id to tell swup]({{ "/options#containers" | relative_url }}) to replace the content of that element
and your [animation class]({{ "/options#animation-selector" | relative_url }}) to tell swup to wait for that element to animate.
Both are adjustable in options and are not related to each other (you can animate completely different elements than the containers).

```html
<html>
  <head>
    <title>Homepage</title>
  </head>
  <body>
    <main id="swup" class="transition-fade">
      <h1>This is homepage</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </p>
      <a href="/someOtherPage">Go to other page</a>
    </main>
  </body>
</html>
```

Enable swup.

```javascript
import Swup from 'swup';
const swup = new Swup(); // only this line when included with script tag
```

At this point your page is already enhanced as swup will stop page from reloading a replace the content.
This is especially good with a [preload plugin]({{ "/plugins/preload-plugin" | relative_url }}) which can make your page blazing fast.

...but let's continue. Add CSS for the element animation.

```css
.transition-fade {
  transition: 0.4s;
  opacity: 1;
}

html.is-animating .transition-fade {
  opacity: 0;
}
```

**And believe it or not, that's it!**
We're all set, or at least for our simple fade in/fade out example…  
Swup loads the page, handles classes for the css animation, waits for the animation to finish/page to load, replaces content and fades your content back.
Swup also changes the title of your page to the loaded one (more in [options]({{ "/options" | relative_url }}) or [plugins]({{ "/plugins" | relative_url }})).

Would you like to try it out yourself? Head to the [demo page]({{ "/getting-started/demo" | relative_url }}).
