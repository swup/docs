---
layout: default
title: Defining Animations
eleventyNavigation:
  key: Animations
  parent: Getting Started
  order: 4
description: How to define page animations
permalink: /getting-started/animations/
---

# Defining Animations

Swup can be used with a variety of animation methods. It supports **CSS animations**, custom
**JS animations**, as well as **native animations** using the View Transitions API.

All code examples below assume the page markup from our [example setup](/getting-started/example/).

```html
<main id="swup" class="transition-fade">
  <h1>Welcome</h1>
  <p>Lorem ipsum dolor sit amet.</p>
</main>
```

## CSS animations

Swup's default mode is built around CSS animations. It will wait for any
[transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition) and
[animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) to finish before replacing
page content. To identify animations to wait for, swup will look for a special type of class added
to content containers: `transition-[name]`, where `name` is an arbitrary name you can assign
to allow styling different types of animations. This [animation selector](/options/#animation-selector)
can be freely configured.

Your page transition animations are defined on the special transition class:

```css
html.is-changing .transition-fade {
  transition: opacity 0.25s;
  opacity: 1;
}

html.is-animating .transition-fade {
  opacity: 0;
}
```

### Animation classes {#classes}

Swup applies classes to the `html` element to control the page transition process:

<div class="events-table" data-table-with-anchor-links>

| Class name            | Description                                                                                                                                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `is-changing`         | Added before starting the animation. Removed after the whole animation process. Used for showing the loading state.                                                                                                               |
| `is-animating`        | Added before starting the animation. Removed after the content is replaced. Used for defining styles of unloaded pages.                                                                                                           |
| `is-leaving`          | Added before starting the animation. Removed right before the content is replaced. Used to identify the **leave** phase of the animation. Combine with `is-animating` to create differing **leave** and **enter** animations.     |
| `is-rendering`        | Added right before the content is replaced. Removed after the whole animation process. Used to identify the **enter** phase of the animation. Combine with `is-animating` to create differing **leave** and **enter** animations. |
| `to-[animation-name]` | Added for links with a `[data-swup-animation="{{animation-name}}"]` attribute to change the animation for a specific visit.                                                                                                       |

</div>

You can configure swup to [add animation classes to the containers](/options/#animation-scope)
instead of the html element.

## JS animations

If you'd rather manage your animations in JS using your favorite animation library, you can use
the appropriate hooks to await your custom animations instead. This is enough for most scenarios.
If you need to choose between different animations based on the URL, or if you have other, more
complex requirements, you can look into the official [JS Plugin](/plugins/js-plugin/).

```js
swup.hooks.replace('animation:out:await', async () => {
  await gsap.to('.transition-fade', { opacity: 0, duration: 0.25 });
});

swup.hooks.replace('animation:in:await', async () => {
  await gsap.fromTo('.transition-fade', { opacity: 0 }, { opacity: 1, duration: 0.25 });
});
```

## Native animations

The browser's built-in [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
provides a native mechanism for managing transitions from one state to another. This is great for
page transition animations as it allows better performance than CSS or JS animations on their own.

To enable native animations, set the `native` option:

```js
const swup = new Swup({ native: true });
```

Define the view transitions in CSS, e.g. a simple crossfade:

```css
html.is-changing .transition-fade {
  view-transition-name: main;
}

::view-transition-old(main) {
  animation: fade 0.5s ease-in-out both;
}

::view-transition-new(main) {
  animation: fade 0.5s ease-in-out both reverse;
}

@keyframes fade {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

The above example will only animate in [browsers with support](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API#browser_compatibility)
for the View Transitions API. All other browsers will update the page without animation. If you
require a fallback animation, you can make use of the `swup-native` class added when native mode is
enabled and supported. By checking for its absence, you can target unsupported browsers:

```css
html.is-changing:not(.swup-native) .transition-fade {
  transition: 0.25s opacity;
  opacity: 1;
}

html.is-animating:not(.swup-native) .transition-fade {
  opacity: 0;
}
```

## Usage without animations

Swup works perfectly fine if none of your elements is animated. You might see a console warning
"no CSS animation duration defined", which is safe to ignore. If it bothers you, set the
animation selector to false:

```js
const swup = new Swup({ animationSelector: false });
```
