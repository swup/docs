---
layout: default
title: Lifecycle
eleventyNavigation:
  key: Lifecycle
  order: 1
description:
permalink: /lifecycle/
---

# Lifecycle

Swup handles the complete lifecycle of a page visit: it will intercept link clicks, load the new
page in the background, replace the content and animate between the old and the new page.

To change how swup will transition to the new page, you can:

- use lifecycle [hooks](/hooks/) to trigger custom code
- update the [visit object](/visit/) to custimize the current transition

## Lifecycle Diagram

[![Swup Lifecycle Diagram](/assets/images/swup-lifecycle.svg){class="light-only wide-image"}](/assets/images/swup-lifecycle.svg)
[![Swup Lifecycle Diagram](/assets/images/swup-lifecycle-dark.svg){class="dark-only wide-image"}](/assets/images/swup-lifecycle.svg)
