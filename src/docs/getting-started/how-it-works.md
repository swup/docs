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

Think of swup as being pjax on steroids. The concepts are similar to those used in barba.js or other transition libraries, but swup pays more attention to ease of use and flexibility.

Apart from loading the contents of the new page and replacing the required parts in the DOM, swup is built around CSS transitions.
The main thing that needs to be done is defining a hidden state in CSS.

When a user navigates your website, swup waits for all elements on the current page that contain the class `transition-[something]` to finish their animation, before switching the container contents and animating your page back in. We recommend that you set the `transition-[something]` class on **only one element** for each page. All other elements you want to animate during page transitions should be animated independently (without using a separate `transition-[something]` class for each of them).

For the animations based on CSS to be possible, swup uses several classes that are assigned to the `html` tag through the process of a page transition:

- `is-animating` — Assigned once a link is clicked. Removed after the page content is replaced. Used for defining styles of unloaded pages.
- `is-changing` — Assigned once a link is clicked. Removed after the whole transition process. Used for showing loading state.
- `is-leaving` — Assigned once a link is clicked. Removed right before the content is replaced. Used to identify the **leave** phase of the transition. Combine with `is-animating` to create differing **leave** and **enter** transitions.
- `is-rendering` — Assigned right before the content is replaced. Removed after the whole transition process. Used to identify the **enter** phase of the transition. Combine with `is-animating` to create differing **leave** and **enter** transitions.
- `to-[custom-transition]` — Assigned if the clicked link has a `[data-swup-transition]` attribute. Can be used to change the animation for a specific URL.
