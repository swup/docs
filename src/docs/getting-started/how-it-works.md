---
layout: default
title: How it works
eleventyNavigation:
  key: How it works
  parent: Getting Started
  order: 1
description: A simple explanation of how swup gets things done
permalink: /getting-started/how-it-works/
---

# How it works

Instead of letting the browser load the next page, swup will intercept link clicks, load the new
page in the background and manage the transition between the old and new content.

## Auto-detected CSS transitions

Swup is built around CSS transitions. It will wait for any
[transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition) and
[animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) to finish before replacing
page content. Transitions are recognized by a special type of class added to
content containers: `transition-[name]`, where `[name]` is an arbitrary name you can assign
to allow styling different types of transitions.

It is recommended to only add this class to a **single** element per page. All other elements
can be transitioned independently to allow easier debugging of transitions.

## Transition classes

Swup applies classes to the `html` tag to control the page transition process:

<div class="events-table" data-table-with-anchor-links>

| Class name                 | Description                                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `is-animating` | Added before starting the transition. Removed after the content is replaced. Used for defining styles of unloaded pages. |
| `is-changing` | Added before starting the transition. Removed after the whole transition process. Used for showing loading state. |
| `is-leaving` | Added before starting the transition. Removed right before the content is replaced. Used to identify the **leave** phase of the transition. Combine with `is-animating` to create differing **leave** and **enter** transitions. |
| `is-rendering` | Added right before the content is replaced. Removed after the whole transition process. Used to identify the **enter** phase of the transition. Combine with `is-animating` to create differing **leave** and **enter** transitions. |
| `to-[transition]` | Added for links with a `[data-swup-transition]` attribute to change the animation for a specific visit. |

</div>
