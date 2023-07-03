---
layout: default
title: Plugins
eleventyNavigation:
  key: Plugins
  order: 4
description: List of available official plugins
permalink: /plugins/
---

# Plugins

Some functionality is only necessary in certain projects.
For this reason, swup has support for plugins that can, but don't have to be used.

## Plugin Installation

```javascript
import Swup from 'swup';
import SwupScrollPlugin from '@swup/scroll-plugin';
```

and enable plugin at initialisation of swup by including it in options:

```javascript
const swup = new Swup({
  plugins: [new SwupScrollPlugin()]
});
```

## Plugin Methods

Alternatively, you can use swup's `use` and `unuse` methods to add and remove plugins.

The `findPlugin` method can be particularly useful for manipulating plugins directly or using its methods.

```javascript
const swup = new Swup();
swup.use(new SwupScrollPlugin());

const pluginInstance = swup.findPlugin('SwupScrollPlugin');
```
