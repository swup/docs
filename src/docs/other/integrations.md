---
layout: default
title: Integrations
eleventyNavigation:
  key: Integrations
  parent: Other
  order: 1
description: Integrating swup with other tools
permalink: /other/integrations/
---

# Integrations

This is a collection of solutions for integrating swup with other popular tools.

## Astro

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

## Alpine.js

Swup works well with [Alpine.js](https://alpinejs.dev/) for managing component
state and automating page lifecycles. Just initialize both libraries and enjoy
automatic initialization of your components:

```javascript
import Swup from 'swup';
import Alpine from 'alpinejs';

const swup = new Swup();
Alpine.start();
```

```html
<div id="swup">
  <div x-data="{ name : 'My Component' }" x-init="console.log(name + ' initialized!')">
    My Component
  </div>
</div>
```

### Handling swup hooks

To register handlers for swup's hooks inside your Alpine components, you need to
prepend `swup` to all hook names. For example, hooking into `page:view` would look like this:

```html
<div x-data x-on:swup:page:view.camel.document="console.log('page view registered!')">
  My Alpine Component
</div>
```
