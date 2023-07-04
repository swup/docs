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

Swup is small by design. Extended features can be added via plugins.

See below for a list of all official plugins.

## Installing plugins

Install and import the plugin via npm and your bundler:

```shell
npm install @swup/scroll-plugin
```

```javascript
import Swup from 'swup';
import SwupScrollPlugin from '@swup/scroll-plugin';
```

Enable the plugin at initialisation of swup by including it in the options:

```javascript
const swup = new Swup({
  plugins: [new SwupScrollPlugin()]
});
```

Alternatively, you can use swup's `use` & `unuse` methods to add or remove plugins after intialization.

```javascript
const swup = new Swup();
swup.use(new SwupScrollPlugin());
```

## Accessing plugin instances

Use swup's `findPlugin` method to find and manipulate plugin instances directly.

```javascript
const pluginInstance = swup.findPlugin('SwupScrollPlugin');
```
