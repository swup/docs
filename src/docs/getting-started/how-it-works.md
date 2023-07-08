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

Instead of letting the browser load the next page, swup intercepts link clicks, loads the new
page in the background and smoothly transitions between the old and new content.

Read on to learn about key concepts of swup.

## Containers

Swup will not replace the whole body on each page load. Instead, it will only replace the actual
[content containers](/options/#containers) on your page. By default, swup will only replace a
container with the id `#swup` but you can configure additional containers like headers or navigation
menus.

## Automatic transition timing {#timing}

Swup is built around CSS transitions. It will wait for any
[transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition) and
[animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) to finish before replacing
page content. To identify transitions to wait for, swup will look for a special type of class added
to content containers: `transition-[name]`, where `name` is an arbitrary name you can assign
to allow styling different types of transitions. This [animation selector](/options/#animation-selector)
can be configured.

It is recommended to only add this class to a **single** element per page. All other elements
can be transitioned independently to allow easier debugging of transitions.

### Transition classes {#classes}

Swup applies classes to the `html` tag to control the page transition process:

<div class="events-table" data-table-with-anchor-links>

| Class name                 | Description                                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `is-changing` | Added before starting the transition. Removed after the whole transition process. Used for showing the loading state. |
| `is-animating` | Added before starting the transition. Removed after the content is replaced. Used for defining styles of unloaded pages. |
| `is-leaving` | Added before starting the transition. Removed right before the content is replaced. Used to identify the **leave** phase of the transition. Combine with `is-animating` to create differing **leave** and **enter** transitions. |
| `is-rendering` | Added right before the content is replaced. Removed after the whole transition process. Used to identify the **enter** phase of the transition. Combine with `is-animating` to create differing **leave** and **enter** transitions. |
| `to-[transition]` | Added for links with a `[data-swup-transition]` attribute to change the animation for a specific visit. |

</div>

You can configure swup to [add transition classes to the containers](/options/#animation-scope) instead of the html element.

## Browser history {#history}

Swup will update and push to the browser history API. The current URL in the browser always reflects
the actual URL of the last requested page. Forward/backward visits will continue to work
as expected. On history visits, the scroll position will be restored as well.

## Scroll behavior {#scrolling}

Swup emulates native browser behavior for scrolling. Between page visits, the scroll position will
be reset to the top. Clicking on an anchor link to the same page will jump to that anchor.

## Hooks

To trigger custom logic or modify swup's behavior, you can register [hook handlers](/hooks/).

## Plugins

Swup was designed to be small but modular. Any extended functionality can be added via one of the
many official or third-party [plugins](/plugins/).
