---
layout: default
title: Plugins
description: List of available official plugins
has_children: true
nav_order: 4
permalink: /plugins
has_toc: false
---

# Plugins
Some functionality is only necessary in certain projects.
For this reason, swup has support for plugins that can, but don't have to be used.

## Plugin Installation
```javascript
import Swup from 'swup';
import ScrollPlugin from '@swup/scroll-plugin';
```

and enable plugin at initialisation of swup by including it in options:

```javascript
const options = {
  plugins: [new ScrollPlugin()]
};
const swup = new Swup(options);
```

## Plugin Methods
Alternatively, you can use swup `use`, `unuse` methods to run/remove plugins.
Method `findPlugin` can be particularly useful for manipulating the plugin directly or using its methods.

```javascript
const swup = new Swup();
swup.use(new ScrollPlugin());   // start plugin

swup.findPlugin('ScrollPlugin');   // returns instance of plugin 
```
