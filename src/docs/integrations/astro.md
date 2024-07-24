---
layout: default
title: Astro Integration
eleventyNavigation:
  key: Astro
  parent: Integrations
  order: 1
description: Official Astro integration
permalink: /integrations/astro/
---

# Astro Integration

Astro and swup are a great fit. Where Astro manages the rendering of your site, swup takes over
and adds smooth page transitions, smart preloading and caching on the client side.

Check out the [official Astro integration for swup](https://github.com/swup/astro)
for getting started quickly.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import swup from '@swup/astro';

export default defineConfig({
  integrations: [swup()]
});
```
