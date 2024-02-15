---
layout: default
title: Browser Support
eleventyNavigation:
  key: Browser support
  parent: Other
  order: 2
description:
permalink: /other/browser-support/
---

# Browser Support

## Full support

The following browsers are supported when swup is [loaded from a CDN](/getting-started/installation/#cdn).

| Chrome | Edge | Safari | Safari iOS | Firefox |
| -      | -    | -      | -          | -       |
| 80     | 80   | 13.1   | 13.4       | 74      |

## Improved support when transpiling

Transpiling your code with tools like [Babel](https://babeljs.io/) will increase browser support.

| Chrome | Edge | Safari | Safari iOS | Firefox |
| -      | -    | -      | -          | -       |
| 66     | 16   | 13.0   | 13.0       | 60      |

## Improved support with polyfills

Including polyfills for modern browser APIs using a service like [polyfill.io](https://polyfill.io/)
will significantly increase browser support. Since it's a moving target that depends on the browsers
of your visitors, you're encouraged to do some research of your own here.

## Improved support with previous versions

If you absolutely need to support older browsers like IE 11, downgrading to
[swup v3](https://v3.swup.js.org/other/browser-support/) will get you much closer to that goal, at
the sacrifice of some of the newer features introduced in v4.

## Plugins

This support matrix is valid for swup itself — plugins may differ in the list of supported browsers.
